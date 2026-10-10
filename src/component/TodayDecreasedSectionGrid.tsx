import Link from "next/link";

interface IHeadlines {
    id: string;
    image: string;
    nameBn: string;
    today: string;
    change: { pct: string, dir: string };
    unit: string;
}

const TodayDecreasedSectionGrid = async () => {

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

    const data: IHeadlines[] = await res.json();

    const DecreasedTopProducts = data.filter(p => p.change.dir === "down").sort((a, b) => Number(a.change.pct) - Number(b.change.pct)).slice(0, 6);

    // console.log(DecreasedTopProducts)

    return (
        <div className="mt-5">
            <p className="text-5xl font-bold">
                ▼ আজ দাম কমেছে
            </p>

            <div className="grid grid-cols-3 gap-3">
                {
                    DecreasedTopProducts.map(i => <Link
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
                                <span>▲ {Number(i.change.pct)} * -1 % </span>
                            </div>
                        </div> </Link>)
                }
            </div>
        </div>
    );
};

export default TodayDecreasedSectionGrid;