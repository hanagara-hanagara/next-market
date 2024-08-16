import { NextResponse } from 'next/server';
import connectDB from '../../../utils/database';
import { ItemModel } from '../../../utils/schemaModels';

export interface ItemData {
    title: string;
    image: string;
    price: string;
    description: string;
    email: string;
    _id?: string;
}

export async function POST(request: Request) {
    const reqBody: ItemData = await request.json();

    try {
        await connectDB();
        await ItemModel.create(reqBody);
        return NextResponse.json({ message: 'アイテム作成成功' });
    } catch (err) {
        return NextResponse.json({ message: 'アイテム作成失敗' });
    }
}
