import React, { CSSProperties, ReactNode } from 'react'
import "./Label.scss"

export interface ILabel {
    name: string
    children: ReactNode
    classes?: string
    required?: boolean
    styles?: CSSProperties
    tooltip?: ReactNode
}

export default function Label({
    name,
    children,
    classes = '',
    required = false,
    styles,
    tooltip
}: ILabel) {

    return (
        <div
            className="labelContainer"
            style={styles}
        >

            <label
                className={`labelContainer__label ${classes}`}
                htmlFor={name}
            >
                {children}

                {required && <span className="labelContainer__label__span">*</span>}
            </label>

            {tooltip}
        </ div>
    )
}
