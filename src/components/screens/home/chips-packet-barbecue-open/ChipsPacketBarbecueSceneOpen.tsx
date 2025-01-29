import { Canvas } from "@react-three/fiber";
import { ChipsPacketBarbecueLightOpen } from "./ChipsPacketBarbecueLightOpen";
import { ChipsPacketBarbecueModelOpen } from "./ChipsPacketBarbecueModelOpen";

interface IChipsPacketBarbecueScene {
    url: string
    calculatedScrollY: number
}

export function ChipsPacketBarbecueSceneOpen({ url, calculatedScrollY }: IChipsPacketBarbecueScene) {
    return (
        <Canvas camera={{ position: [0, 0, 10] }} id="chipsPacketBarbecueOpenCanvas"
            style={{
                position: 'absolute',
                pointerEvents: 'none'
            }}>
            <ChipsPacketBarbecueLightOpen />
            <ChipsPacketBarbecueModelOpen url={url} scrollY={calculatedScrollY} />
        </Canvas >
    );
}
