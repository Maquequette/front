import { ReactNode, useState } from "react"
import useClickOutside from "@/hooks/useClickOutside"
import clsx from "clsx"

import './Tooltip.scss'


export interface ITooltip {
    interrogative?: boolean
    children: ReactNode
    id?: string,
    theme?: string
}

export default function Tooltip({
    interrogative = true,
    children,
    id,
    theme = "light",
}: ITooltip) {

    const [visible, setVisibility] = useState<boolean>(false)
    const ref = useClickOutside(() => setVisibility(false))

    return (

        <div
            className="tooltip"
            id={id}
            ref={ref}
        >
            <button
                type="button"
                className={`tooltip__btn tooltip__btn--${theme}`}
                onClick={() => setVisibility(!visible)}
            >
                {interrogative ? '?' : '!'}
            </button>

            <div
                role="tooltip"
                className={clsx('tooltip__popup', visible && 'active')}
            >
                {children}
            </div >
        </div >

    )
}
