import { motion } from "framer-motion";

export function MainLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
            <motion.h1
                className="text-4xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99],
                }}
            >
                Welcome to My Website
            </motion.h1>
        </div>
    );
}
