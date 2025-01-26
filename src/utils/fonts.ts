import { Chonburi, Poppins } from "next/font/google"

const chonburi_init = Chonburi({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-chonburi",
    display: "swap"
})

const poppins_init = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
    display: "swap"
})

export const poppins = poppins_init.variable
export const chonburi = chonburi_init.variable