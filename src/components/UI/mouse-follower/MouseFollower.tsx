'use client'

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function MouseFollower() {
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (circleRef.current) {
                gsap.to(circleRef.current, {
                    x: event.clientX - 15,
                    y: event.clientY - 15,
                    duration: 0.7, // Скорость анимации
                    ease: "power2.out", // Плавность
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={circleRef}
            className="fixed top-0 left-0 w-[30px] h-[30px] border-2 border-[#505050] rounded-full bg-transparent pointer-events-none z-50"
        />
    );
}
