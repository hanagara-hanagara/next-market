'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/app/utils/useAuth';
import { ItemData } from '@/app/api/item/create/route';
import { Context } from '@/app/api/item/readsingle/[id]/route';

const UpdateItem = (context: Context) => {
    const [item, setItem] = useState({
        title: '',
        price: '',
        image: '',
        description: '',
    });
    const [email, setEmail] = useState('');

    const loginUserEmail = useAuth();

    useEffect(() => {
        const getSingleItem = async (id: string) => {
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, { cache: 'no-store' });
            const jsonData = await response.json();
            const singleItem: ItemData = jsonData.singleItem;
            setItem({
                ...singleItem,
            });
            setEmail(singleItem.email);
        };
        getSingleItem(context.params.id);
    }, [context]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('name =', name, 'value =', value);
        setItem({
            ...item,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/item/update/${context.params.id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    ...item,
                    email: loginUserEmail,
                }),
            });

            const jsonData: { message: string } = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
        } catch (err) {
            alert('アイテム編集失敗');
        }
    };

    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={item.title}
                        onChange={e => handleChange(e)}
                        type="text"
                        name="title"
                        placeholder="アイテム名"
                        required
                    />
                    <input
                        value={item.price}
                        onChange={e => handleChange(e)}
                        type="text"
                        name="price"
                        placeholder="価格"
                        required
                    />
                    <input
                        value={item.image}
                        onChange={e => handleChange(e)}
                        type="text"
                        name="image"
                        placeholder="画像"
                        required
                    />
                    <textarea
                        value={item.description}
                        onChange={e => handleChange(e)}
                        name="description"
                        rows={15}
                        placeholder="商品説明"
                        required></textarea>
                    <button>編集</button>
                </form>
            </div>
        );
    } else {
        return <h1>権限がありません</h1>;
    }
};

export default UpdateItem;
