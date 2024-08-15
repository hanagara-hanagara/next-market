import { NextResponse } from 'next/server';
import connectDB from '../../../../api/utils/database';
import { ItemModel } from '../../../../api/utils/schemaModels';
import type { Context } from '../../readsingle/[id]/route';

export async function DELETE(request: Request, context: Context) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        if (singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({ _id: context.params.id });
            return NextResponse.json({ message: 'アイテム削除成功' });
        } else {
            return NextResponse.json({ message: '他の人が作成したアイテムです' });
        }
    } catch (err) {
        return NextResponse.json({ message: 'アイテム削除失敗' });
    }
}
