'use client';
import type { NextPage } from 'next';
import { useState } from 'react';

const Login: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const jsonData = await response.json();
            localStorage.setItem('token', jsonData.token);
        } catch (err) {
            alert('ログイン失敗');
        }
    };

    return (
        <div>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    name="email"
                    placeholder="メールアドレス"
                    required
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="text"
                    name="password"
                    placeholder="パスワード"
                    required
                />
                <button>ログイン</button>
            </form>
        </div>
    );
};

export default Login;
