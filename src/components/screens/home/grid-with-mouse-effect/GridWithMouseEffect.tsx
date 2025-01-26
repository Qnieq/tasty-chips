import { useEffect, useRef, useState } from "react";

export function GridWithMouseEffect({ children }: { children: React.ReactNode }) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [gradient, setGradient] = useState<string>(`linear-gradient(rgba(255, 255, 255, 0.4) 0.05rem, transparent 0.05rem), 
                                                        linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0.05rem, transparent 0.05rem), 
                                                        radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 20%)`);

    useEffect(() => {
        const grid = gridRef.current;

        if (!grid) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = grid.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            const xPercentage = (x / width) * 100;
            const yPercentage = (y / height) * 100;

            const newGradient = `linear-gradient(rgba(255, 255, 255, 0.4) 0.05rem, transparent 0.05rem), 
                                linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0.05rem, transparent 0.05rem), 
                                radial-gradient(circle at ${xPercentage}% ${yPercentage}%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 20%)`;

            setGradient(newGradient);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={gridRef}
            className="absolute top-50 left-0 z-10 w-full h-[100dvh] bg-transparent overflow-hidden pointer-events-none"
            style={{
                backgroundImage: gradient,
                backgroundSize: "2rem 2rem, 2rem 2rem, 100% 100%",
                backgroundPosition: "center, center, 0% 0%",
                backgroundBlendMode: "color-dodge",
            }}
        >
            {children}
        </div>
    );
}
