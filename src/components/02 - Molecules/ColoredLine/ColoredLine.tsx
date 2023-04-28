import { ReactNode, useContext, useEffect, useState } from "react"
import { MobileContext } from "@/contexts/MobileContext";
import useDisableScroll from "@/hooks/useDisableScroll";
import { Theme } from "@/types/Theme"
import Breadcrumb from "@/components/01 - Atoms/Breadcrumb/Breadcrumb"
import './ColoredLine.scss'
import Button from "@/components/01 - Atoms/Button/Button"
import Svg from "@/components/01 - Atoms/Svg/Svg"
import clsx from "clsx"
import Container from "@/components/01 - Atoms/Container/Container";

export interface IColoredLine {
    children: ReactNode
    theme: Theme
    headContent?: ReactNode
}

export default function ColoredLine({
    children,
    theme,
    headContent
}: IColoredLine) {

    const { mobileOpen, toggleMobileOpen } = useContext(MobileContext)
    const { enable, disable } = useDisableScroll();


    useEffect(() => {
        mobileOpen.challengeSearch ? disable() : enable()
    }, [mobileOpen.challengeSearch])

    return (
        <div className={`coloredLine coloredLine--${theme}`}>

            <div className="coloredLine__head">
                <div className="coloredLine__head__mobile">
                    <Container>
                        <>
                            <Breadcrumb style={{ paddingLeft: 0 }} />
                            <Button
                                theme={"dark"}
                                handleClick={() => toggleMobileOpen("challengeSearch")}
                            >
                                search & more
                                <Svg id="search" styles={{ width: '2.5rem', height: '2.5rem', stroke: 'none' }} />
                            </Button>
                        </>
                    </Container>
                </div>
                <div className={clsx("coloredLine__head__desktop", { 'active': mobileOpen.challengeSearch })}>
                    <Container>
                        {headContent}
                    </Container>
                </div>
            </div>
            <div className="coloredLine__content">
                <Container>
                    {children}
                </Container>
            </div>

        </div>
    )
}

