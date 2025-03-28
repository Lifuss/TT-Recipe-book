import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-blue-500 hover:text-blue-700 active:text-blue-700 focus:text-blue-700 text-2xl text-nowrap hover:scale-110 transition-transform"
    >
      <Image src={"/Logo.png"} alt="recipe book logo" width={32} height={32} />
      <h2 className="">Recipe Book</h2>
    </Link>
  );
};

export default Logo;
