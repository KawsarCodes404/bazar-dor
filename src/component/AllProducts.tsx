import Link from "next/link";

interface IHeadlines {
    id: string;
    image: string;
    nameBn: string;
    today: string;
    change: { pct: string, dir: string };
    unit: string;
}

const AllProducts = async () => {

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

    const allProducts: IHeadlines[] = await res.json();;

    // console.log(increasedTopProducts)

    return (
        <div className="mx-auto w-full max-w-7xl mt-5">

            <h1 className="text-5xl font-bold">
                সব পণ্য
            </h1>
            <p>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>

            <div className="grid grid-cols-3 gap-3">
                {
                    allProducts.map(i => <Link
                        key={i.id}
                        href={`/infos/${i.id}`}
                    >
                        <div
                            key={i.id}
                            className="flex justify-between space-y-6 border"
                        >
                            <div>
                                <span>{i.image}</span>
                                <h1>{i.nameBn}</h1>
                                <p>প্রতি {i.unit}</p>
                            </div>

                            <div>
                                <p>আজকের দাম</p>
                                <h1>
                                    {i.today} টাকা
                                </h1>
                            </div>

                            <div>

                                <div>
                                    {i.change.dir === "up" ? (
                                        <div>
                                            ▲ {i.change.pct}%
                                        </div>
                                    ) : (
                                        <div>
                                            {Number(i.change.pct) === 0 ? (
                                                <span>— ০.০%</span>
                                            ) : (
                                                <span>▼ {Math.abs(Number(i.change.pct))}%</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default AllProducts;