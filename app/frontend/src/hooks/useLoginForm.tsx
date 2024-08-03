import { useState } from 'react';

const useLoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);

    const sendFormData = async (formData: { email: string; password: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://backend/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setResponse(result);
        } catch (error: any) {
            setError(error.message || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return { sendFormData, loading, error, response };
};

export default useLoginForm;
