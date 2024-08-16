import connectDB from '@/app/utils/database';
import { NextResponse } from 'next/server';
import { ItemModel } from '@/app/utils/schemaModels';
import type { Context } from '../../readsingle/[id]/route';

export async function PUT(request: Request, context: Context) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        if (singleItem) {
            await ItemModel.updateOne({ _id: context.params.id }, reqBody);
            return NextResponse.json({ message: 'アイテム編集成功' });
        } else {
            return NextResponse.json({ message: '他の人が作成したアイテムです' });
        }
    } catch (err) {
        return NextResponse.json({ message: 'アイテム編集失敗' });
    }
}
