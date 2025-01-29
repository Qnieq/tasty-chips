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
                    <Titling ref={(el) => { elementsRef.current.testyChips = el }} text="Tasty Chips" color="white" align="center" />
                </div>
                <div style={{ padding: "0 clamp(20px, 5vw, 80px)" }} className="flex w-full h-full items-start justify-between pt-8">
                    <div style={{ gap: "clamp(12px, 3vw, 30px)" }} className="flex flex-col overflow-hidden">
                        <div ref={(el) => { elementsRef.current.review = el }} className="flex items-center gap-2">
                            <div className="flex space-x-[-12px]">
                                {avatars.map((avatar, index) => (
                                    <div
                                        style={{
                                            width: "clamp(30px, 5vw, 44px)",
                                            height: "clamp(30px, 5vw, 44px)"
                                        }}
                                        key={index}
                                        className="rounded-full overflow-hidden border-[#b1464a] border"
                                    >
                                        <Image alt={`avatar ${index + 1}`} src={avatar} width={44} height={44} className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: "clamp(12px, 1vw, 20px)" }} className="text-white">5K+ Review</p>
                        </div>
                        <ButtonTransparent
                            ref={(el) => { elementsRef.current.seeAllItemsBtn = el }}
                            width="clamp(150px, 20vw, 200px)"
                            borderColor="#fff"
                            paddingX="clamp(13px, 2vw, 28px)"
                            paddingY="clamp(7px, 2vw, 14px)"
                            textColor="#fff"
                        >
                            See All Item
                            <ArrowRight color="#fff" />
                        </ButtonTransparent>
                    </div>
                    <div className=" flex h-full items-center">
                        <div className="col-start-2 row-start-2 overflow-hidden">
                            <div className="flex items-center gap-4" ref={(el) => { elementsRef.current.exploreBtn = el }}>
                                <ButtonTransparent width="clamp(40px, 10vw, 80px)" height="clamp(40px, 10vw, 80px)" borderColor="#fff" textColor="#fff">
                                    <MoveRight color="#fff" />
                                </ButtonTransparent>
                                <p style={{ fontSize: "clamp(12px, 1vw, 20px)" }} className="text-white font-poppins">Explore</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}