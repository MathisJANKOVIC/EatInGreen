import { useState } from 'react';

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    token: string;
    user: any; // Change `any` to the appropriate type based on your backend response
}

const useRegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<RegisterResponse | null>(null);

    const sendFormData = async (formData: RegisterFormData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const data: RegisterResponse = await res.json();
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

export default useRegisterForm;
