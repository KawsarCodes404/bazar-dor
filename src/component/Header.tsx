import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";

const Header = () => {

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full"
  })

  return (
    <header>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between">
          {/* Left Logo and Date Part */}
          <Link href={'/'}>
            <div className="flex gap-2">
              <Image className="w-10 h-10" height={10} width={10} src={'/logo-icon.png'} alt=""></Image>

              <div>
                <h2>বাজার দর</h2>
                <p>{date}</p>
              </div>
            </div>
          </Link>


          {/* right sign in and sign up button */}
          <div className="flex gap-1">
            <button
              className="btn"
            >
              সাইন ইন
            </button>

            <button
              className="btn btn-error"
            >
              সাইন আপ
            </button>
          </div>
        </div>

        <NavLinks />
      </div>
    </header>
  );
};

export default Header;