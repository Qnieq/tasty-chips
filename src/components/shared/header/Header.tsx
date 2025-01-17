import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <section className="flex items-center justify-center w-full h-[100px] sticky top-0 border-b-[1px] border-b-white z-10">
            <div className="flex items-center justify-between w-[1440px] h-[56px] pr-[80px] pl-[80px]">
                <Image src={"logo.svg"} width={200} height={56} alt="logo" />
                <ul className="flex gap-[47px] font-poppins">
                    <li>
                        <Link className="font-semibold text-white" href="/">Home</Link>
                    </li>
                    <li>
                        <Link className="font-semibold text-white" href="/shop">Shop</Link>
                    </li>
                </ul>
                <div className="flex gap-[20px]">
                    <button className="flex items-center justify-center p-[16px] bg-[#fff] rounded-[6px]">
                        <Search color="rgba(30, 36, 56, 1)" width={24} height={24} />
                    </button>
                    <button className="flex items-center justify-center p-[16px] bg-[#fff] rounded-[6px]">
                        <ShoppingBag color="rgba(30, 36, 56, 1)" width={24} height={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
