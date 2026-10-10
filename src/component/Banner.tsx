import Image from "next/image";

const Banner = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })

    return (
        <div className="flex justify-between px-4 items-center border">
            {/* left text and banner heading */}
            <div>
                <h2>{date}</h2>
                <h1 className="text-5xl">আজকের বাজারের দাম এক নজরে</h1>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className="btn btn-success">সব পণ্য দেখুন</button>
            </div>


            {/* Right banner Logo */}
            <div>
                <Image alt="" width={300} height={300} src={'/bazar-hero.png'} />
            </div>
        </div>
    );
};

export default Banner;