import { GridWithMouseEffect } from "@/components/screens/home/grid-with-mouse-effect/GridWithMouseEffect";
import { SpheresScene } from "@/components/shared/spheres/SpheresScene";
import { Titling } from "@/components/UI/titling/Titling";

const texts = [
    {
        title: "See our review",
        desc: "Potatoes were introduced to Europe from the Americas by the Spanish in the second half of the 16th century. "
    },
    {
        title: "Our product awesome overview",
        desc: "Today they are a staple food in many parts of the world and an integral part of much of the world's food supply. As of 2014, potatoes were the world's fourth-largest food crop."
    },
    {
        title: "The Potato",
        desc: "When potato plants bloom, they send up five-lobed flowers that spangle fields like fat purple stars. By some accounts, Marie Antoinette liked the blossoms so much that she put ."
    },
]

export function About() {



    return (
        <div className="flex items-start justify-center w-full h-[300dvh] bg-black relative">
            <div className="flex items-center justify-center sticky top-0 w-screen h-[100dvh] overflow-hidden mt-[50dvh]">
                <GridWithMouseEffect>
                    <div className="flex items-center justify-between h-[inherit] p-[100px] z-20">
                        <div className="flex items-start w-[600px] h-full">
                            <Titling font_family="poppins" weight="semibold" color="#fff" text="Let’s grow your health with our product" />
                        </div>
                        <div className="flex flex-col items-start justify-end gap-[50px] w-[700px] h-full">
                            {texts.map((value, index) => (
                                <div key={index}>
                                    <h4 className="text-white font-poppins font-semibold text-[2.5rem] text-left">
                                        {value.title}
                                    </h4>
                                    <p className="text-[#afafaf] text-[1.3rem] text-left">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </GridWithMouseEffect>
                <SpheresScene />
            </div>
        </div>
    );
}
