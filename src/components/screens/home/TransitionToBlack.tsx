import { GridWithMouseEffect } from "@/components/shared/grid-with-mouse-effect/GridWithMouseEffect";
import { SpheresScene } from "@/components/shared/shperes/SpheresScene";

export function TransitionToBlack() {
    return (
        <div className="flex items-center justify-center w-full h-[200dvh] bg-black relative">
            <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">
                <GridWithMouseEffect />
                <SpheresScene>
                    <></>
                </SpheresScene>
            </div>
        </div>
    );
}
