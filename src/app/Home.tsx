'use client'

import { Header } from "@/components/shared/header/Header"
import Image from "next/image";
import { ChipsPacketScene } from "@/components/shared/chips-packet/ChipsPacketScene";
import { HomeHeroSection } from "@/components/screens/home/HomeHeroSection";
import { SmoothScrolling } from "./SmoothScrolling";
import { Statistic } from "@/components/screens/home/Statistic";

export function Home() {
    return (
        <>
            <SmoothScrolling />
            <section className="flex flex-col items-center w-full h-[867px] bg-[#B1464A] overflow-hidden relative">
                <Header />
                <HomeHeroSection />
                <Image
                    alt=""
                    src={"/herosection-lines.svg"}
                    width={1300}
                    height={0}
                    className="absolute right-0 top-0 pointer-events-none"
                />
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
            <div className="absolute top-5 w-full h-full z-1 pointer-events-none">
                <ChipsPacketScene />
            </div>
            <Statistic />
        </>

    );
}