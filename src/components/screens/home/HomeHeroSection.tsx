import { ButtonTransparent } from "@/components/UI/button-transparent/ButtonTransparent";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";

const avatars = ["/avatars/ava1.svg", "/avatars/ava2.svg", "/avatars/ava3.svg"]

export function HomeHeroSection() {
    return (
        <div className="max-w-[1440px] min-w-[320px] w-full z-10">
            <div className="flex flex-col items-center justify-start w-full h-full pt-[20px]">
                <h1 className="text-[6em] text-white font-chonburi">
                    Testy Chips
                </h1>
                <div className="flex w-full h-full items-start justify-between pl-[80px] pr-[80px]  pt-8">
                    <div className="flex flex-col gap-10 ">
                        <div className="flex items-center justify-start gap-2">
                            <div className="flex items-center justify-start space-x-[-12px]">
                                {avatars.map((avatar, index) => (
                                    <div key={index} className="w-[44px] h-[44px] rounded-full overflow-hidden  border-solid border-[#b1464a]">
                                        <Image
                                            alt={`avatar ${index + 1}`}
                                            src={avatar}
                                            width={44}
                                            height={44}
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white text-[20px]">
                                5K+ Review
                            </p>
                        </div>
                        <ButtonTransparent width="200px" borderColor="#fff" paddingX="28px" paddingY="14px" textColor="#fff">
                            See All Item
                            <ArrowRight color="#fff" />
                        </ButtonTransparent>
                        <div className="flex items-center gap-2">
                            <div className="flex w-[48px] h-2 bg-white rounded-[2px]"></div>

                            <div className="w-2 h-2 bg-white rounded-[2px]"></div>
                            <div className="w-2 h-2 bg-white rounded-[2px]"></div>
                            <div className="w-2 h-2 bg-white rounded-[2px]"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 items-end">
                        <svg className="col-start-1 row-start-1" width="125" height="113" viewBox="0 0 125 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M122 15.0002C116.5 8.99976 103.846 -0.938259 98.4246 4.04317C86.4996 15.0003 116.495 28.9059 110 39.5C103.504 50.0942 72.1193 10.9059 63.9996 21.5C55.88 32.0942 103.256 57.8362 91.8883 71.6901C78.5148 87.9888 33.57 13.8799 19.5636 32.6234C5.55715 51.3669 85.3328 82.1705 64.2217 105.804C48.9343 122.917 30.0678 82.9316 2.56783 67.4316" stroke="white" stroke-width="5" stroke-linecap="round" />
                        </svg>
                        <div className="flex items-center gap-4 col-start-2 row-start-2">
                            <ButtonTransparent width="80px" height="80px" borderColor="#fff" textColor="#fff">
                                <MoveRight color="#fff" />
                            </ButtonTransparent>
                            <p className="text-white text-[20px] font-poppins">
                                Explore
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
