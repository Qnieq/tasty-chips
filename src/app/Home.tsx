'use client'

import { Header } from "@/components/header/Header"
import cn from "clsx"
import Image from "next/image";
import { Chonburi } from 'next/font/google';
import { ArrowRight } from "lucide-react";

const chonburi = Chonburi({ subsets: ['latin'], weight: ['400'] });
export function Home() {
    return (
        <section className={cn("w-full h-[867px] bg-[#B1464A] overflow-hidden relative")}>
            <Header />
            <Image
                alt=""
                src={"/herosection-lines.svg"}
                width={1300}
                height={0}
                className="absolute right-0 top-0 pointer-events-none"
            />
            <div className="flex flex-col items-center justify-start w-full h-full">
                <h1 className={cn(chonburi.className, "text-[7em] text-white")}>
                    Testy Chips
                </h1>
                <div className="flex w-full h-full items-start justify-between pl-[80px] pr-[80px]">
                    <div className="border-[0.1px] border-black">
                        <button className="font-poppins font-semibold">
                            See all item
                            <ArrowRight color="#fff" />
                        </button>
                    </div>
                    <div className="border-[0.1px] border-black flex">
                        <button className="font-poppins font-semibold">
                            See all ite
                            <ArrowRight color="#fff" />
                        </button>
                    </div>
                </div>
            </div>
            <svg
                className="absolute bottom-0 left-0 w-full h-[320px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
            >
                <path
                    fill="#fefefb"
                    d="M0,10 C25,0 75,0 100,10 L100,20 L0,20 Z"
                />
            </svg>
        </section>
    );
}
