import { Titling } from "@/components/UI/titling/Titling";
import { scroll, useScroll } from "framer-motion";
import { forwardRef, MutableRefObject, Suspense, useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss"
import cn from "clsx"
import Image from "next/image";
import gsap from "gsap";
import { ChipsPacketBarbecueScene } from "@/components/shared/chips-packet-barbecue/ChipsPacketBarbecueScene";

const models = ["/chips/1.png", "/chips/2.png", "/chips/4.png", "/chips/3.png", "/chips/5.png"]

export function Overview() {
    const imgGroupContainerRef = useRef<HTMLDivElement | null>(null);
    const imgGroupRef = useRef<HTMLDivElement | null>(null);
    const imgContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const imgGroup = imgGroupRef.current;
        const imgGroupContainer = imgGroupContainerRef.current;
        const imgContainer = imgContainerRef.current

        if (imgGroup && imgGroupContainer && imgContainer) {

            scroll(
                (progress: number) => {
                    const imgContainerWidth = imgContainer.offsetWidth;
                    const imgGroupWidth = imgGroup.offsetWidth
                    imgGroup.style.transform = `translateX(-${progress * (((imgGroupWidth / 2) + (imgContainerWidth / 2)) + 80)}px)`;
                },
                { target: imgGroupContainer, offset: ["start -0.1", "end 1.3"] }
            );

        }
    }, []);

    return (
        <section ref={imgGroupContainerRef} className="w-full h-[300dvh] relative bg-[#b1464a]">
            <div className="pl-[80px]">
                <Titling text="Our Product" color="#fff" />
            </div>
            <div className="w-auto h-[100dvh] sticky top-[25dvh] overflow-x-hidden">
                <div ref={imgGroupRef} className="flex flex-shrink-0 w-fit h-[100dvh] gap-[80px] pl-[80px] relative">
                    {models.map((modelData, index) => (
                        <ImgContainer modelData={modelData} ref={imgContainerRef} imgGroupContainerRef={imgGroupContainerRef} />
                    ))}
                    <Suspense fallback={<div>Loading</div>}>
                        <div className={cn("flex flex-shrink-0 items-center justify-center border-[#ffffff] border-2  rounded-[60px] pointer-events-none relative", styles.models)}>
                            <ChipsPacketBarbecueScene position="absolute" url="/models/chips-packet-Barbecue.glb" />
                        </div>
                    </Suspense>
                </div>
            </div>
        </section>
    );
}



interface IImgContainer {
    modelData: string
    imgGroupContainerRef: MutableRefObject<HTMLDivElement | null>
}

export const ImgContainer = forwardRef<HTMLDivElement, IImgContainer>(({ modelData, imgGroupContainerRef }, ref) => {

    const imgContainerRef = useRef<HTMLDivElement | null>(null);
    const [lastScrollProgress, setLastScrollProgress] = useState(0);
    const { scrollYProgress } = useScroll({
        target: imgGroupContainerRef,
        offset: ["start -0.1", "end 1.3"],
    });

    useEffect(() => {
        const handleScrollChange = (currentScroll: number) => {
            if (imgContainerRef.current) {
                const delta = currentScroll - lastScrollProgress;
                const skewAngle = delta * 150;
                if (delta == 0 || delta == currentScroll) {
                    imgContainerRef.current.style.transform = `skewX(0deg)`;
                } else {
                    imgContainerRef.current.style.transform = `skewX(${skewAngle}deg)`;
                }
                setLastScrollProgress(currentScroll);
            }
        };

        scrollYProgress.on("change", handleScrollChange);

        return () => {
            scrollYProgress.stop();
        };
    }, [lastScrollProgress, scrollYProgress]);

    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-shrink-0 rounded-[60px] relative",
                styles.models
            )}
        >
            <div
                ref={imgContainerRef}
                className={cn(
                    "flex flex-shrink-0 border-[#ffffff] border-2 overflow-hidden rounded-[60px] relative transition-transform duration-200 ease-out",
                    styles.models
                )}
            >
                <Image
                    alt=""
                    src={modelData}
                    width={1000}
                    height={1000}
                    className={cn("object-cover", styles.img)}
                />
            </div>
        </div>
    )
})