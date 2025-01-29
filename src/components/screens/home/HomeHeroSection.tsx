import { ButtonTransparent } from "@/components/UI/button-transparent/ButtonTransparent";
import { Titling } from "@/components/UI/titling/Titling";
import gsap from "gsap";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const avatars = ["/avatars/ava1.svg", "/avatars/ava2.svg", "/avatars/ava3.svg"]

export function HomeHeroSection() {
    const elementsRef = useRef({
        testyChips: null as HTMLHeadingElement | null,
        review: null as HTMLDivElement | null,
        seeAllItemsBtn: null as HTMLButtonElement | null,
        exploreBtn: null as HTMLDivElement | null,
    });

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const { testyChips, review, seeAllItemsBtn, exploreBtn } = elementsRef.current;

        if (testyChips && review && seeAllItemsBtn && exploreBtn) {
            const tl = gsap.timeline();

            tl.to(testyChips, { y: 300, duration: 0.8, ease: "circ.out", delay: 1.2 })
                .to(review, { y: 200, duration: 0.5, ease: "circ.out" }, "-=0.3")
                .to([seeAllItemsBtn, exploreBtn], { y: 200, duration: 0.5, ease: "circ.out" }, "-=0.2");

            tl.fromTo(testyChips, { y: 300 }, { y: 0, duration: 0.8, ease: "circ.out", delay: 3 })
                .fromTo(review, { y: 200 }, { y: 0, duration: 0.5, ease: "circ.out" }, "-=0.2")
                .fromTo([seeAllItemsBtn, exploreBtn], { y: 200 }, { y: 0, duration: 0.5, ease: "circ.out" }, "-=0.2");
        }
    }, []);

    useEffect(() => {
        const { testyChips, review, seeAllItemsBtn, exploreBtn } = elementsRef.current;
        const isScrolled = scrollY >= 150;

        gsap.to([testyChips, review, seeAllItemsBtn, exploreBtn].filter(Boolean), {
            y: isScrolled ? -200 : 0,
            duration: 1.5,
            ease: "back.out",
            delay: 0.1
        });
    }, [scrollY]);

    return (
        <div className="max-w-[1440px] min-w-[320px] w-full z-20">
            <div className="flex flex-col items-center justify-start w-full h-full pt-[20px]">
                <div className="flex items-center justify-center p-2 overflow-hidden">
                    <Titling ref={(el) => { elementsRef.current.testyChips = el }} text="Testy Chips" color="white" />
                </div>
                <div className="flex w-full h-full items-start justify-between px-[80px] pt-8">
                    <div className="flex flex-col gap-10 overflow-hidden">
                        <div ref={(el) => { elementsRef.current.review = el }} className="flex items-center gap-2">
                            <div className="flex space-x-[-12px]">
                                {avatars.map((avatar, index) => (
                                    <div key={index} className="w-[44px] h-[44px] rounded-full overflow-hidden border-[#b1464a] border">
                                        <Image alt={`avatar ${index + 1}`} src={avatar} width={44} height={44} className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white text-[20px]">5K+ Review</p>
                        </div>
                        <ButtonTransparent
                            ref={(el) => { elementsRef.current.seeAllItemsBtn = el }}
                            width="200px"
                            borderColor="#fff"
                            paddingX="28px"
                            paddingY="14px"
                            textColor="#fff"
                        >
                            See All Item
                            <ArrowRight color="#fff" />
                        </ButtonTransparent>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 items-end">
                        <div className="col-start-2 row-start-2 overflow-hidden">
                            <div className="flex items-center gap-4" ref={(el) => { elementsRef.current.exploreBtn = el }}>
                                <ButtonTransparent width="80px" height="80px" borderColor="#fff" textColor="#fff">
                                    <MoveRight color="#fff" />
                                </ButtonTransparent>
                                <p className="text-white text-[20px] font-poppins">Explore</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}