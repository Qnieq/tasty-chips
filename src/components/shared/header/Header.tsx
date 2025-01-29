import gsap from "gsap";
import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const [scrollY, setScrollY] = useState(0);

    const notification = () => {
        toast.error("STOOP CLICKING!! You stupid potato, this is a pet project, what did you expect?");
    };

    useEffect(() => {
        // Анимация появления при загрузке
        gsap.fromTo(headerRef.current,
            { y: "-150px" },
            { y: "0px", duration: 1, ease: "circ.out", delay: 5.9 }
        );

        gsap.fromTo(logoRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "back.out", delay: 6.2 }
        );

        gsap.fromTo(buttonsRef.current,
            { y: "-100px", opacity: 0 },
            { y: "0px", opacity: 1, duration: 0.8, ease: "circ.out", delay: 6.2 }
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Анимация заголовка при скролле
        gsap.to(headerRef.current, {
            scale: scrollY > 30 ? 0.9 : 1,
            opacity: scrollY > 30 ? 0.8 : 1,
            duration: 0.3,
            ease: "power1.out",
        });
    }, [scrollY]);

    return (
        <header
            ref={headerRef}
            className="flex items-center justify-center w-full h-[100px] sticky top-0 border-b-[1px] border-b-white z-20 overflow-hidden"
        >
            <div style={{padding: "clamp(20px, 5vw, 80px)"}} className="flex items-center justify-between w-[1440px] h-[56px]">
                <Image ref={logoRef} src={"logo.svg"} width={200} height={56} alt="logo" />
                <div ref={buttonsRef} className="flex gap-[20px]">
                    <button
                        onClick={notification}
                        className="flex items-center justify-center p-[16px] bg-[#fff] rounded-[6px] transition-transform hover:scale-110 active:scale-95"
                    >
                        <Search color="rgba(30, 36, 56, 1)" width={24} height={24} />
                    </button>
                    <button
                        onClick={notification}
                        className="flex items-center justify-center p-[16px] bg-[#fff] rounded-[6px] transition-transform hover:scale-110 active:scale-95"
                    >
                        <ShoppingBag color="rgba(30, 36, 56, 1)" width={24} height={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}