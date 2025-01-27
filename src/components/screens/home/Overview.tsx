import { Titling } from "@/components/UI/titling/Titling";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss"
import cn from "clsx"
import { ImgContainer } from "./img-container/ImgContainer";
import { ChipsPacketBarbecueSceneClose } from "./chips-packet-barbecue-close/ChipsPacketBarbecueSceneClose";

const models = ["/chips/1.png", "/chips/2.png", "/chips/4.png", "/chips/3.png", "/chips/5.png"]

export function Overview() {
    const imgGroupContainerRef = useRef<HTMLDivElement | null>(null);
    const imgGroupRef = useRef<HTMLDivElement | null>(null);
    const modelRef = useRef<HTMLDivElement | null>(null);

    const [modelWidth, setModelWidth] = useState<number>(0)

    useEffect(() => {
        const model = modelRef.current

        if (model) {
            setModelWidth((v) => (v - v) + model.offsetWidth)
        }
    }, [modelRef])


    return (
        <>
            <section
                ref={imgGroupContainerRef}
                className={cn(`w-full bg-[#b1464a] h-[500dvh] relative`, styles.img_group_container)}
            >
                <div className="absolute bottom-0 left-0 w-full h-[500dvh] bg-black opacity-0 z-10" id="dark"></div>
                <div className="flex items-center h-[100dvh] sticky top-0  overflow-hidden">
                    <div ref={imgGroupRef} className="flex items-center h-full w-fit">
                        <div className="pl-[80px] absolute top-0">
                            <Titling text="Our Product" color="#fff" />
                        </div>
                        {models.map((modelData, index) => (
                            <ImgContainer
                                key={index}
                                modelRef={modelRef}
                                modelData={modelData}
                                imgGroupContainerRef={imgGroupContainerRef}
                                imgGroupRef={imgGroupRef}
                            />
                        ))}
                        <div className="absolute flex items-center w-full h-full">
                            <div
                                style={{
                                    marginLeft: `${(modelWidth * models.length) + (80 * models.length) + 80}px`,
                                }}
                                ref={modelRef}
                                className={cn("flex flex-shrink-0 items-center  justify-center rounded-[60px] border-[#ffffff] border-2", styles.models)}
                            >
                                <Suspense fallback={<div>Loading</div>}>
                                    <ChipsPacketBarbecueSceneClose url="/models/chips-packet-Barbecue-close.glb" />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


