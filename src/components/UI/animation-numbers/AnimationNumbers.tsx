import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./AnimationNumbers.module.scss"
import cn from "clsx"

interface IAnimationNumbers {
    numbers: number
    condition: boolean
    mark: string
}

export function AnimationNumbers({ numbers, condition, mark }: IAnimationNumbers) {

    const count = useMotionValue(0)
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (condition) {
            const animation = animate(count, numbers, { duration: 3 });

            return animation.stop
        } else {
            const animation = animate(count, 0, { duration: 3 });

            return animation.stop
        }
    }, [condition])

    return (
        <div className="flex">
            <motion.h3 className={cn("font-chonburi text-[#1E2438]", styles.title)}>
                {rounded}
            </motion.h3>
            <h3 className={cn("font-chonburi text-[#1E2438]", styles.mark)}>
                {mark}
            </h3>
        </div>
    );
}
