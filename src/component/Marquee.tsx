import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface IHeadlines {
    id: string,
    categoryIcon: string,
    nameBn: string,
    today: string,
    change: {pct: string, dir: string}
}

const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");

    const headlines: IHeadlines[] = await res.json();

    console.log(headlines)

    return (
        <div className="border border-b-gray-200 border-t-gray-100 pt-2 pb-2">
            <MarqueeText direction="right" duration={10}>
                {
                    headlines.map(h => <span
                        key={h.id}
                        className="mx-5"
                    >
                        <span>{h.categoryIcon} </span>
                        <span>{h.nameBn} </span>
                        <span>{h.today} </span>
                        <span>টাকা/কেজি</span>
                        <span>{h.change.dir === "up" ? " ▲" : " ▼"} </span>
                        <span>{h.change.pct}% </span>
                    </span>)
                }
            </MarqueeText>
        </div>
    );
};

export default Marquee;