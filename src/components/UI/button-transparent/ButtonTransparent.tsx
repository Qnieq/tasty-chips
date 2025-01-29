import { forwardRef } from "react"
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

export const ButtonTransparent = forwardRef<HTMLButtonElement, IButtonTransparent>(
    ({ borderColor, children, paddingX, paddingY, textColor, width, height }, ref) => {

        const notification = () => {
            toast.error(
                "STOOP CLICKING!! You stupid potato, this pet project, what did you expect?"
            )
        }

        return (
            <button
                ref={ref}
                style={{
                    borderColor: borderColor,
                    padding: `${paddingY} ${paddingX}`,
                    color: textColor,
                    width: width,
                    height: height,
                    fontSize: "clamp(12px, 2vw, 16px)"
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
    })
