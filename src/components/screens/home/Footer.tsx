import { Suspense, useEffect, useState } from "react";
import { ChipsPacketBarbecueSceneOpen } from "./chips-packet-barbecue-open/ChipsPacketBarbecueSceneOpen";
import gsap from "gsap";

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
        console.log(newCalculatedScrollY)
        gsap.to("#darkOpen", {
            opacity: newCalculatedScrollY <= 1 ? 1 : (250 / newCalculatedScrollY) - 0.1
        })
    }, [scrollY]);

    return (
        <footer className="flex items-start justify-start w-full h-[300dvh] relative">
            <div className="absolute bottom-0 left-0 w-full h-[300dvh] bg-black opacity-0 z-10" id="darkOpen"></div>
            <div className="w-full h-[100dvh] sticky top-0">
                <div className="w-full h-[100dvh] relative">
                    <Suspense fallback={<div>loading...</div>}>
                        <ChipsPacketBarbecueSceneOpen url="/models/chips-packet-Barbecue-open.glb" calculatedScrollY={calculatedScrollY} />
                    </Suspense>
                </div>
            </div>
        </footer>
    );
}
