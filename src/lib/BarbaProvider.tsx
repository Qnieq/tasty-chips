'use client'

import React, { useEffect, useState } from "react";
import barba from "@barba/core";
import { MainLoader } from "@/components/shared/loaders/MainLoader";
import { PageTransitionLoader } from "@/components/shared/loaders/PageTransitionLoader";
import { AnimatePresence, motion } from "framer-motion";

export const BarbaProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        barba.init({
            transitions: [
                {
                    name: "default",
                    leave() {
                        return new Promise((resolve) => {
                            const wrapper = document.querySelector("#barba-wrapper");

                            if (wrapper) wrapper.classList.add("fade-out");
                            setTimeout(resolve, 500);
                        });
                    },
                    enter() {
                        return new Promise((resolve) => {
                            const wrapper = document.querySelector("#barba-wrapper");

                            if (wrapper) wrapper.classList.remove("fade-out");
                            setTimeout(resolve, 500);
                        });
                    },
                },
            ],
        });

        return () => {
            barba.destroy();
        };
    }, []);


    useEffect(() => {
        if (isFirstVisit) {
            const timer = setTimeout(() => setIsFirstVisit(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isFirstVisit]);

    return (
        <div id="barba-wrapper" data-barba="wrapper">
            <div data-barba="container">
                <AnimatePresence>
                    {isFirstVisit && (
                        <motion.div
                            key="main-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <MainLoader />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isFirstVisit && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="page-wrapper"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                )}
                <PageTransitionLoader />
            </div>
        </div>
    );
};
