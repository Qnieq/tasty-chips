import { useScroll } from "framer-motion";
import { useRef, useState } from "react";
import cn from "clsx"
import { AnimationNumbers } from "@/components/UI/animation-numbers/AnimationNumbers";
import styles from "./Home.module.scss"

const statistic_data = [
    {
        amount: 20,
        desc: "Product",
        mark: "K",
        side: "start"
    },
    {
        amount: 40,
        desc: `Upcoming\nProduct`,
        mark: "K",
        side: "end"
    },
    {
        amount: 25,
        desc: `Awesome\nProduct`,
        mark: "K",
        side: "start"
    },
]
export function Statistic() {
    return (
        <div className="relative h-full w-full">
            {statistic_data.map((data, index) => (
                <AnimatedBlock
                    amount={data.amount}
                    desc={data.desc}
                    mark={data.mark}
                    side={data.side}
                />
            ))}
        </div>
    );
}


type AnimatedBlockProps = {
    amount: number;
    desc: string;
    mark: string
    side: string
};

function AnimatedBlock({ amount, desc, mark, side }: AnimatedBlockProps) {

    const [scrollingValue, setScrollingValue] = useState<number>(0)
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "end 0.5"],
    })

    scrollYProgress.on("change", (e) => { setScrollingValue(e) })

    return (
        <div
            ref={container}
            className={cn(
                `h-[50dvh] w-full flex items-center justify-center transition-opacity duration-500`,
                scrollingValue >= 0.5 ? "opacity-100" : "opacity-0"
            )}
        >
            <div
                style={{
                    alignItems: `flex-${side}`
                }}
                className={`flex max-w-[1440px] min-w-[320px] w-full flex-col justify-start gap-[5px]`}
            >
                <div className="flex flex-col items-start px-[40px]">
                    <AnimationNumbers
                        numbers={amount}
                        condition={scrollingValue >= 0.5}
                        mark={mark}
                    />
                    <span className={cn("font-poppins whitespace-pre", styles.description)}>{desc}</span>
                </div>
            </div>
        </div>
    );
}