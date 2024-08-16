import Image from 'next/image';
import Link from 'next/link';

type item = {
    title: string;
    image: string;
    price: string;
    description: string;
    email: string;
    _id?: string;
};

type AllItems = {
    allItems: [item];
};

const getAllItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, { cache: 'no-store' });
    const jsonData: AllItems = await response.json();
    const allItems = jsonData.allItems;
    return allItems;
};

const ReadAllItems = async () => {
    const allItems = await getAllItems();

    return (
        <div className="grid-container-in">
            {allItems.map(item => (
                <Link
                    key={item._id}
                    href={`/item/readsingle/${item._id}`}>
                    <div>
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={750}
                            height={500}
                        />
                        <h2>¥{item.price}</h2>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ReadAllItems;
