import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import API from '../api';

export default function ChallengeDetail() {
    const { id } = useParams();
    const [chal, setChal] = useState(null);
    const [code, setCode] = useState('# write your solution here');
    const [runOut, setRunOut] = useState({});
    const [submitMsg, setSubmitMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const load = async () => {
        const res = await API.get(`/api/challenges/${id}`);
        setChal(res.data);
    };

    useEffect(() => { load(); }, [id]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitMsg('Checking…');
        try {
            // run code
            const runRes = await API.post('/api/run-challenge', { challenge_id: +id, code });
            setRunOut(runRes.data);

            // submit & decay XP
            const sub = await API.post('/api/submit-challenge', {
                challenge_id: +id,
                user_output: runRes.data.stdout.trim(),
                code
            });

            setSubmitMsg(sub.data.message + ` (Attempts: ${sub.data.new_run_count})`);
            setChal(ch => ({ ...ch, run_count: sub.data.new_run_count }));
        } catch (e) {
            setSubmitMsg(e.response?.data?.message || 'Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!chal) return <p>Loading challenge…</p>;

    return (
        <div className="challenge-detail-page">
            <div className="challenge-detail-card">
                <h1>{chal.title}</h1>
                <p><strong>Input:</strong> {chal.sample_input}</p>
                <p><strong>Expected:</strong> {chal.expected_output}</p>
                <p><strong>Attempts so far:</strong> {chal.run_count}</p>

                {/* no fixed height here—CSS flex will size it */}
                <Editor
                    defaultLanguage="python"
                    value={code}
                    onChange={setCode}
                    theme={document.body.classList.contains('light-mode') ? 'light' : 'vs-dark'}
                />

                {/* controls pinned below editor */}
                <div className="controls">
                    <button
                        className="enter-btn"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Running…' : 'Practice & Earn'}
                    </button>
                </div>

                {runOut.stdout != null && (
                    <>
                        <h3>Output:</h3>
                        <pre className="output-pre">{runOut.stdout}</pre>
                        {runOut.stderr && (
                            <>
                                <h3 style={{ color: 'red' }}>Errors:</h3>
                                <pre className="error-pre">{runOut.stderr}</pre>
                            </>
                        )}
                    </>
                )}

                {submitMsg && (
                    <p className={submitMsg.startsWith('Correct') ? 'success-message' : 'error-message'}>
                        {submitMsg}
                    </p>
                )}
            </div>
        </div>
    );
}
