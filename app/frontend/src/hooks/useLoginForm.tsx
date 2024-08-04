import { useState } from 'react';

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: any; // Change `any` to the appropriate type based on your backend response
}

const useLoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<LoginResponse | null>(null);

    const sendFormData = async (formData: LoginFormData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const data: LoginResponse = await res.json();
            setResponse(data);
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { sendFormData, loading, error, response };
};

export default useLoginForm;
