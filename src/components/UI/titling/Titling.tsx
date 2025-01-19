import cn from "clsx"
import styles from "./Titling.module.scss"
import { forwardRef } from "react";

interface ITitling {
    text: string;
    color: string;
}

export const Titling = forwardRef<HTMLHeadingElement, ITitling>(
    ({ text, color }, ref) => {
        return (
            <h1
                ref={ref}
                style={{
                    color: color,
                }}
                className={cn("font-chonburi", styles.title)}
            >
                {text}
            </h1>
        );
    }
);
