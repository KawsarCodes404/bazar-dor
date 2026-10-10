interface IHeadlines {
    id: number,
    slug: string,
    nameBn: "স্বর্ণমাছি চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 148,
    yesterday: 145,
    lastWeek: 142,
    lastMonth: 138,
    change: { dir: string, pct: number }
    markets: {
        market: string,
        division: string,
        min: number,
        max: number
    }
}

const InfoDetailsPage = async ({ params }: { params: { infoId: string } }) => {
    const { infoId } = await params;

    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${infoId}`);

    const productInfo: IHeadlines = await res.json();

    // console.log(productInfo)

    return (
        <div>
            <p>{productInfo.image}</p>

            <h2>গতকালের তুলনায় আজ দাম বেড়েছে · ২ টাকা</h2>

            <h2>প্রতি কেজি · {productInfo.categoryNameBn}</h2>
        </div>
    );
};

export default InfoDetailsPage;


// {
// "id": 1,
// "slug": "sorno-machi-chal",
// "nameBn": "স্বর্ণমাছি চাল",
// "category": "chal",
// "categoryNameBn": "চাল",
// "categoryIcon": "🍚",
// "unit": "kg",
// "image": "🍚",
// "today": 148,
// "yesterday": 145,
// "lastWeek": 142,
// "lastMonth": 138,
// "change": {},
// "markets": [
// {
// "market": "কারওয়ান বাজার",
// "division": "ঢাকা",
// "min": 146,
// "max": 165
// },
// {
// "market": "গ্রীন মার্কেট, মিরপুর",
// "division": "ঢাকা",
// "min": 143,
// "max": 159
// },
// {
// "market": "চৌদগ্রাম বাজার",
// "division": "চট্টগ্রাম",
// "min": 142,
// "max": 163
// },
// {
// "market": "আমতলী বাজার",
// "division": "চট্টগ্রাম",
// "min": 138,
// "max": 155
// },