import { useScroll } from "framer-motion"
import Image from "next/image"
import { Dispatch, forwardRef, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react"
import cn from "clsx"
import styles from "./ImgContainer.module.scss"
import gsap from "gsap"

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