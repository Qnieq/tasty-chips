import { toast } from "sonner"

interface IButtonTransparent {
    borderColor: string
    paddingY?: string
    paddingX?: string
    textColor: string
    width: string
    height?: string
    children: React.ReactNode
}

export function ButtonTransparent({ borderColor, children, paddingX, paddingY, textColor, width, height }: IButtonTransparent) {

    const notification = () => {
        toast.error(
            "STOOP CLICKING!! You stupid potato, this pet project, what did you expect?"
        )
    }

    return (
        <button
            style={{
                borderColor: borderColor,
                padding: `${paddingY} ${paddingX}`,
                color: textColor,
                width: width,
                height: height
            }}
            className="
                flex items-center justify-center gap-[16px] 
                font-poppins font-semibold border-2 
                rounded-[10px]"
            onClick={() => notification()}
        >
            {children}
        </button>
    );
}
