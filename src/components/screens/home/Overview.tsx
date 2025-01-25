import { Titling } from "@/components/UI/titling/Titling";
import { scroll, useScroll } from "framer-motion";
import { Dispatch, forwardRef, MutableRefObject, SetStateAction, Suspense, useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss"
import cn from "clsx"
import Image from "next/image";
import gsap from "gsap";
import { ChipsPacketBarbecueScene } from "@/components/shared/chips-packet-barbecue/ChipsPacketBarbecueScene";

const models = ["/chips/1.png", "/chips/2.png", "/chips/4.png", "/chips/3.png", "/chips/5.png"]

export function Overview() {
    const imgGroupContainerRef = useRef<HTMLDivElement | null>(null);
    const imgGroupRef = useRef<HTMLDivElement | null>(null);
    const modelRef = useRef<HTMLDivElement | null>(null);

    const [modelWidth, setModelWidth] = useState<number>(0)

    const [scrollProgress, setScrollProgress] = useState<number>(0)

    useEffect(() => {
        const model = modelRef.current

        if (model) {
            setModelWidth((v) => (v - v) + model.offsetWidth)
            console.log(modelWidth)
        }
    }, [modelRef])


    return (
        <>
            <section
                ref={imgGroupContainerRef}
                className={cn(`w-full bg-[#b1464a] h-[500dvh] relative`, styles.img_group_container)}
            >
                <div className="absolute bottom-0 left-0 w-full h-[500dvh] bg-black opacity-0 z-10" id="dark"></div>
                <div className="flex items-center h-[100dvh] sticky top-0  overflow-hidden">
                    <div ref={imgGroupRef} className="flex items-center h-full w-fit">
                        <div className="pl-[80px] absolute top-0">
                            <Titling text="Our Product" color="#fff" />
                        </div>
                        {models.map((modelData, index) => (
                            <ImgContainer
                                key={index}
                                modelRef={modelRef}
                                modelData={modelData}
                                imgGroupContainerRef={imgGroupContainerRef}
                                imgGroupRef={imgGroupRef}
                                setScrollProgress={setScrollProgress}
                            />
                        ))}
                        <div className="absolute flex items-center w-full h-full">
                            <div
                                style={{
                                    marginLeft: `${(modelWidth * models.length) + (80 * models.length) + 80}px`,
                                }}
                                ref={modelRef}
                                className={cn("flex flex-shrink-0 items-center  justify-center rounded-[60px] border-[#ffffff] border-2", styles.models)}
                            >
                                <Suspense fallback={<div>Loading</div>}>
                                    <ChipsPacketBarbecueScene scrollProgress={scrollProgress} url="/models/chips-packet-Barbecue.glb" />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}



interface IImgContainer {
    modelData: string
    imgGroupContainerRef: MutableRefObject<HTMLDivElement | null>
    setScrollProgress: Dispatch<SetStateAction<number>>
    imgGroupRef: MutableRefObject<HTMLDivElement | null>
    modelRef: MutableRefObject<HTMLDivElement | null>
}

export const ImgContainer = forwardRef<HTMLDivElement, IImgContainer>(({
    modelData,
    imgGroupContainerRef,
    imgGroupRef,
    modelRef,
    setScrollProgress
}, ref) => {

    const imgContainerRef = useRef<HTMLDivElement | null>(null);
    const [lastScrollProgress, setLastScrollProgress] = useState(0);
    const { scrollYProgress } = useScroll({
        target: imgGroupContainerRef,
        offset: ["start -0.1", "end 2.3"],
    });

    useEffect(() => {
        const handleScrollChange = (currentScroll: number) => {
            const imgGroup = imgGroupRef.current;
            const imgContainer = imgContainerRef.current;
            const model = modelRef.current;

            if (!imgContainer || !imgGroup) return;

            const imgContainerWidth = imgContainer.offsetWidth;
            const imgGroupWidth = imgGroup.offsetWidth;

            const delta = currentScroll - lastScrollProgress;

            const skewAngle = delta * 300;

            const translateXValue = -(currentScroll * (((imgGroupWidth / 2) + (imgContainerWidth)) + 240));

            const animRefs = [model, imgContainer]

            setScrollProgress(currentScroll)

            for (let index = 0; index < animRefs.length; index++) {
                gsap.fromTo(
                    animRefs[index],
                    {
                        skewX: skewAngle,
                        translateX: translateXValue,
                    },
                    {
                        skewX: 0,
                        translateX: translateXValue,
                        duration: delta === 0 || delta === currentScroll ? 0.5 : 0.1,
                        ease: "power1.out",
                    }
                );
            }


            setLastScrollProgress(currentScroll);
        };

        const unsubscribe = scrollYProgress.on("change", handleScrollChange);

        return () => {
            unsubscribe();
        };
    }, [lastScrollProgress, scrollYProgress]);

    return (
        <div
            ref={imgContainerRef}
            className={cn(
                "flex flex-shrink-0 rounded-[60px] border-[#ffffff] border-2 overflow-hidden ml-[80px]",
                styles.images
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
    )
})