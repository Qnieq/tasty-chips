'use client'

import Lenis from "lenis";
import { useEffect, useState } from "react";

interface ISmoothScrolling {
    delay?: number
}

export function SmoothScrolling({ delay }: ISmoothScrolling) {
    const [lenisRef, setLenis] = useState<any>(null);
    const [rafState, setRaf] = useState<number>();

    useEffect(() => {
        setTimeout(() => {
            const scroller = new Lenis();
            let rf;

            function raf(time: number) {
                scroller.raf(time);
                requestAnimationFrame(raf);
            }

            rf = requestAnimationFrame(raf);
            setRaf(rf);
            setLenis(scroller);

            return () => {
                if (lenisRef) {
                    cancelAnimationFrame(rafState as number);
                    lenisRef.destroy();
                }
            };
        }, delay! * 1000)
    }, []);

    return null;
}

export function ScrollToTop() {
    useEffect(() => {
        window.scrollTo({
            behavior: "instant",
            top: 0
        })
    })
    return null
}
