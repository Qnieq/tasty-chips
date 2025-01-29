'use client'

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function MouseFollower() {
    const circleRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleMouseMove = (event: MouseEvent) => {
            if (circleRef.current) {
                gsap.to(circleRef.current, {
                    x: event.clientX - 15,
                    y: event.clientY - 15,
                    duration: 0.7,
                    ease: "power2.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    if (!isClient || typeof window === "undefined" || window.innerWidth < 1000) return null;

    return (
        <div
            ref={circleRef}
            className="fixed top-0 left-0 w-[35px] h-[35px] border-2 border-[#505050] rounded-full bg-transparent pointer-events-none z-50"
        />
    );
}

