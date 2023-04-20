import { Dispatch, createContext, useState } from "react";

export interface IMobile {
    iconOpen: boolean
    setIconOpen: Dispatch<React.SetStateAction<boolean>>
    mobileOpen: { [key: string]: boolean }
    setMobileOpen: Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
    toggleMobileOpen: Function
    toggleMobileClose: Function
}

export const MobileContext = createContext<IMobile>(null!);

export function MobileProvider({ children }: { children: JSX.Element }) {

    const [iconOpen, setIconOpen] = useState<boolean>(false)
    const [mobileOpen, setMobileOpen] = useState<{ [key: string]: boolean }>({
        menu: false,
        challengeSearch: false
    });

    const update = (key: string) => {
        let replace = mobileOpen
        replace[key] = !mobileOpen[key]
        setMobileOpen({ ...replace })
        setIconOpen(!iconOpen)
    }

    const toggleMobileOpen = (key: string) => {
        if (!mobileOpen[key]) {
            update(key)
        }
    }

    const toggleMobileClose = () => {
        for (const [key, value] of Object.entries(mobileOpen)) {
            if (value) {
                update(key)
            }
        }
    }

    return (
        <MobileContext.Provider value={{ iconOpen, setIconOpen, mobileOpen, setMobileOpen, toggleMobileOpen, toggleMobileClose }}>
            {children}
        </MobileContext.Provider>
    )
}
