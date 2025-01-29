import { useScroll } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const timings = [0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];
const words = Array.from({ length: 32 }, () => ({
    word: "CHIPS",
    timing: timings[Math.floor(Math.random() * timings.length)],
}));


export function Chips() {

    const chipsSectionRef = useRef<HTMLElement | null>(null)

    const [scrollProgressOpen, setScrollProgressOpen] = useState(0);
    const [scrollProgressClose, setScrollProgressClose] = useState(1);

    const { scrollYProgress: scrollYProgressOpen } = useScroll({
        target: chipsSectionRef,
        offset: ["start start", "end 1.5"],
    });

    const { scrollYProgress: scrollYProgressClose } = useScroll({
        target: chipsSectionRef,
        offset: ["end 0.79", "start -1.9"],
    });

    useEffect(() => {

        const handleScrollChangeOpen = (currentScroll: number) => {
            setScrollProgressOpen(currentScroll)
        }
        const handleScrollChangeClose = (currentScroll: number) => {
            setScrollProgressClose(currentScroll)
        }

        const unsubscribeOpen = scrollYProgressOpen.on("change", handleScrollChangeOpen);
        const unsubscribeClose = scrollYProgressClose.on("change", handleScrollChangeClose);

        return () => {
            unsubscribeOpen();
            unsubscribeClose();
        };
    }, [])

    useEffect(() => {
        words.forEach((_, index) => {
            const element = document.getElementById(`word-${index}`);
            if (element && scrollProgressOpen < 1) {
                gsap.to(element, {
                    opacity: scrollProgressOpen >= words[index].timing ? 1 : 0,
                    y: scrollProgressOpen >= words[index].timing
                        ? `${Math.min(0, (scrollProgressOpen - words[index].timing) * 400)}%`
                        : "-100%",
                    ease: "easeOut",
                    duration: 0.5,
                });
            } else if (element && scrollProgressOpen == 1) {
                gsap.to(element, {
                    opacity: scrollProgressClose >= words[index].timing ? 1 : 0,
                    y: scrollProgressClose >= words[index].timing
                        ? `${Math.min(0, (scrollProgressClose - words[index].timing) * 400)}%`
                        : "-100%",
                    ease: "easeOut",
                    duration: 0.5,
                });
            }
        });
    }, [scrollProgressOpen, scrollProgressClose]);

    return (
        <section
            ref={chipsSectionRef}
            style={{
                opacity: scrollProgressOpen < 1 ? scrollProgressOpen * 2 : scrollProgressClose * 2
            }}
            className="bg-black w-full h-[300dvh] absolute left-0 top-[100dvh] pointer-events-none z-20"
        >
            <div className="grid w-full h-screen sticky top-0 overflow-hidden">
                <div className="grid max-w-[2560px] w-[2560px] grid-cols-4 grid-rows-8">
                    {words.map((value, index) => (
                        <div className="w-full overflow-hidden">
                            <h1
                                key={index}
                                id={`word-${index}`}
                                style={{
                                    width: "clamp(200px, 40vw, 400px)",
                                    fontSize: "clamp(7rem, 30vw, 13rem)",
                                    lineHeight: "clamp(100px, 30vw, 200px)"
                                }}
                                className=" text-white font-poppins text-center leading-[200px] font-semibold"
                            >
                                {value.word}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
