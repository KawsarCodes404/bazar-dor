import Link from "next/link";

interface Inavs {
    id: string | null,
    slug: string,
    nameBn: string,
    icon: string
}

const NavLinks = async () => {

    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');

    const navs: Inavs[] = await res.json();

    // console.log(navs)

    return (
        <div className="flex gap-5 mt-3 border border-b-gray-200 border-t-gray-100 pt-4 pb-4 pl-6">
            {
                navs.map(n => <Link
                    href={`/${n.slug}`}
                    key={n.id}
                ><span>{n.icon}</span>{n.nameBn}</Link>)
            }
        </div>
    );
};

export default NavLinks;