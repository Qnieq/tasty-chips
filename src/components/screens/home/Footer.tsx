import { Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { Titling } from "@/components/UI/titling/Titling";
import { ButtonTransparent } from "@/components/UI/button-transparent/ButtonTransparent";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ChipsPacketBarbecueSceneOpen = dynamic(
  () => import("./chips-packet-barbecue-open/ChipsPacketBarbecueSceneOpen").then((mod) => mod.ChipsPacketBarbecueSceneOpen),
  { ssr: false }
);

export function Footer() {
    const [scrollY, setScrollY] = useState(0);
    const [calculatedScrollY, setCalculatedScrollY] = useState(0);
    // Обработчик прокрутки
    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => setScrollY(window.scrollY));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Анимация при изменении прокрутки
    useEffect(() => {
        const body = document.body

        const windowHeight = window.innerHeight;
        const pageHeight = body.offsetHeight
        const newCalculatedScrollY = scrollY - (pageHeight - (windowHeight * 3)) - windowHeight / 4

        setCalculatedScrollY(newCalculatedScrollY);

        gsap.to("#darkOpen", {
            opacity: newCalculatedScrollY <= 1 ? 1 : (250 / newCalculatedScrollY) - 0.1
        })
    }, [scrollY]);

    return (
        <footer className="flex items-start justify-start w-full h-[300dvh] relative">
            <div className="absolute bottom-0 left-0 w-full h-[300dvh] bg-black opacity-0 z-10 pointer-events-none" id="darkOpen"></div>
            <div className="flex w-full h-[100dvh] sticky top-0">
                <div className="flex items-center justify-around gap-[100px] h-[inherit] w-full">
                    <div style={{ width: 'clamp(400px, 30vw, 800px)' }}>
                        <Titling text="World Class Awesome Chips" color="#b1464a" />
                    </div>
                    <Suspense fallback={<div>loading...</div>}>
                        <ChipsPacketBarbecueSceneOpen url="/models/chips-packet-Barbecue-open.glb" calculatedScrollY={calculatedScrollY} />
                    </Suspense>
                    <div style={{ width: 'clamp(200px, 20vw, 400px)' }} className="flex flex-col gap-[30px]">
                        <div className="flex flex-col gap-[12px]">
                            <h5 className="text-[#1E2438] text-[2rem] font-chonburi">
                                Overview
                            </h5>
                            <p style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }} className="text-[#1E2438] font-poppins font-semibold">
                                the blossoms so much that she put them in her hair. Her husband, Louis XVI, put one in his buttonhole, inspiring a brief vogue in which the French.
                            </p>
                        </div>
                        <ButtonTransparent borderColor="#B1464A" textColor="#B1464A" width="197px" height="55px">
                            Learn More
                            <ArrowRight color="#B1464A" />
                        </ButtonTransparent>
                    </div>
                </div>
            </div>
        </footer>
    );
}
