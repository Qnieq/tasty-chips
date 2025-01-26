import cn from "clsx"
import styles from "./Titling.module.scss"
import { forwardRef } from "react";

interface ITitling {
    text: string;
    color: string;
    font_family?: string
    weight?: string
}

export const Titling = forwardRef<HTMLHeadingElement, ITitling>(
    ({ text, color, font_family, weight }, ref) => {
        return (
            <h1
                ref={ref}
                style={{
                    color: color,
                }}
                className={cn(`font-${font_family ? font_family : "chonburi"} font-${weight}`, styles.title)}
            >
                {text}
            </h1>
        );
    }
);
