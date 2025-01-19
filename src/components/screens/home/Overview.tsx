import { Titling } from "@/components/UI/titling/Titling";
import { scroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss"
import cn from "clsx"
import Image from "next/image";
import gsap from "gsap";

const models = ["/chips/1.png", "/chips/2.png", "/chips/3.png", "/chips/4.png", "/chips/5.png"]

export function Overview() {
    const imgGroupContainerRef = useRef<HTMLDivElement | null>(null);
    const imgGroupRef = useRef<HTMLDivElement | null>(null);
    const imgContainerRef = useRef<HTMLDivElement | null>(null);

    const imageRefs = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const imgGroup = imgGroupRef.current;
        const imgGroupContainer = imgGroupContainerRef.current;
        const imgContainer = imgContainerRef.current

        if (imgGroup && imgGroupContainer && imgContainer) {

            scroll(
                (progress: number) => {
                    const imgContainerWidth = imgContainer.offsetWidth;

                    imgGroup.style.transform = `translateX(-${progress * (models.length - 1) * imgContainerWidth}px)`;
                },
                { target: imgGroupContainer, offset: ["start -0.1", "end 0.99"] }
            );

        }
    }, []);

    useEffect(() => {
        if (imageRefs.current) {
            imageRefs.current.forEach((img, index) => {
                if (!img) return;

                const streak = document.createElement("div");
                streak.className = styles.streak;
                img.parentElement?.appendChild(streak);

                const tl = gsap.timeline({ paused: true });

                tl.to(img, {
                    scale: 1.1,
                    duration: 0.4,
                    ease: "power2.out",
                })
                    .fromTo(
                        streak,
                        { opacity: 0, x: "-150%", y: "-150%", rotate: 45 },
                        { opacity: 1, x: "150%", y: "150%", duration: 1, ease: "power2.out" },
                        "<"
                    )
                    .to(
                        streak,
                        { opacity: 0, duration: 0.4, ease: "power2.out" },
                        "-=0.2"
                    );

                img.addEventListener("mouseenter", () => tl.play());
                img.addEventListener("mouseleave", () => tl.reverse());

                return () => {
                    streak.remove();
                };
            });
        }
    }, []);


    return (
        <section ref={imgGroupContainerRef} className="w-full h-[200dvh] relative">
            <div className="pl-[80px]">
                <Titling text="Our Product" color="#b1464a" />
            </div>
            <div className="w-full h-[100dvh] sticky top-[15dvh] overflow-x-hidden">
                <div ref={imgGroupRef} className="flex w-full h-[100dvh] gap-[80px] pl-[80px]">
                    {models.map((modelData, index) => (
                        <div
                            key={index}
                            ref={imgContainerRef}
                            className={cn(
                                "flex flex-shrink-0 overflow-hidden border-[#646464] border-2 rounded-[60px] relative",
                                styles.models
                            )}
                        >
                            <Image
                                alt=""
                                src={modelData}
                                width={1000}
                                height={1000}
                                className={cn("object-cover", styles.img)}
                                ref={(el) => {
                                    if (el) {
                                        imageRefs.current[index] = el;
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
