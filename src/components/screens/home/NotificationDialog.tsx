import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface NotificationDialogProps {
    message: string;
}

export function NotificationDialog({ message }: NotificationDialogProps) {
    const [showText, setShowText] = useState(false);

    const iconRef = useRef<HTMLDivElement | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            iconRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
        );


        tl.to(dialogRef.current, {
            scaleY: 1,
            scaleX: 0.1,
            transformOrigin: "right",
            duration: 0.7,
            ease: "power3.out",
            delay: 0.3,
        });

        tl.to(dialogRef.current, {
            scaleX: 1,
            transformOrigin: "right",
            duration: 1,
            ease: "power3.out",
            delay: 1,
        });

        gsap.fromTo(textRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 3 }
        )


        setShowText(true)

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="relative flex items-center justify-center h-screen bg-gray-100">

            <div
                ref={iconRef}
                className="notification-icon flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 21.828a4 4 0 005.656-5.656M16 3.828a4 4 0 10-5.656 5.656M21 10.828a4 4 0 00-5.656-5.656M3 16.828a4 4 0 115.656 5.656"
                    />
                </svg>
            </div>


            <div
                ref={dialogRef}
                className="absolute mt-16 w-80 p-4 bg-white rounded-lg shadow-lg scale-y-0 scale-x-0"
            >
                <p
                    ref={textRef}
                    className="text-gray-800 text-lg font-medium"
                >
                    {message}
                </p>
            </div>
        </div>
    );
};