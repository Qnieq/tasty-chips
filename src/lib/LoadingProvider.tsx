'use client'

import { ScrollToTop, SmoothScrolling } from "@/components/shared/Scrolling";
import { Loader } from "@/components/UI/loader/Loader";
import { Titling } from "@/components/UI/titling/Titling";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const middleDivRef = useRef<HTMLDivElement>(null);
    const middleWindowRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const { progress } = useProgress();
    const body = document.body;
    body.style.overflow = 'hidden';
    useEffect(() => {
        if (!isLoading) {
            gsap.to(loaderRef.current, {
                scale: 0.9,
                filter: 'brightness(0.3)',
                ease: 'back.out',
                duration: 1,
            });

            gsap.fromTo(middleDivRef.current, {
                top: '100%',
            }, {
                top: 0,
                duration: 1,
                ease: 'circ.out',
                delay: 0.9,
            });

            gsap.to(loaderRef.current, {
                display: 'none',
                ease: 'back.out',
                delay: 1.9,
                duration: 0.1,
            });

            gsap.to(containerRef.current, {
                opacity: 1,
                duration: 0.1,
                delay: 1.9,
            });

            gsap.to(middleDivRef.current, {
                backgroundColor: 'rgba(255,255,255,0)',
                delay: 2,
                duration: 0.1,
            });

            gsap.to(middleWindowRef.current, {
                opacity: 1,
                delay: 1.97,
                duration: 0.01,
            });

            gsap.fromTo(middleWindowRef.current, {
                scale: 0.5,
            }, {
                scale: 1,
                delay: 2,
                duration: 1,
                ease: 'back.inOut',
            });

            gsap.to(middleWindowRef.current, {
                scale: 2,
                delay: 3.1,
                duration: 1,
                ease: 'back.inOut',
            });

            gsap.to(body, {
                overflowY: 'scroll',
                delay: 4.1,
                duration: 0.1,
            });

            gsap.to(middleWindowRef.current, {
                display: 'none',
                delay: 4.1,
                duration: 0.01,
            });

            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 4101);
            return () => clearTimeout(timer);

        }
    }, [isLoading]);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    return (
        <>
            {isLoaded && <SmoothScrolling />}
            <ScrollToTop />
            <div
                ref={loaderRef}
                style={{ background: 'var(--background)' }}
                className="w-full h-[100dvh] flex flex-col items-center justify-center absolute z-20 top-0 left-0"
            >
                <Loader />
                <Titling font_family="poppins" weight="semibold" color="black" text={`${Math.round(progress)}%`} />
            </div>
            <div ref={middleDivRef} style={{ top: '100%', background: 'white' }} className="w-full h-full absolute z-20">
                <div
                    ref={middleWindowRef}
                    style={{
                        opacity: 0,
                        position: 'absolute',
                        width: '50%',
                        height: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'transparent',
                        pointerEvents: 'none',
                        boxShadow: '0 0 0 100vw white',
                    }}
                />
            </div>
            <div ref={containerRef} style={{ opacity: 0 }}>
                {children}
            </div>
        </>
    );
}
