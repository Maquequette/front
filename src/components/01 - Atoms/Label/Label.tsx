import React, { CSSProperties, ReactNode } from 'react'
import "./Label.scss"

export interface ILabel {
    name: string
    children: ReactNode
    className?: string
    classes?: string
    required?: boolean
    styles?: CSSProperties
    tooltip?: ReactNode
    error?: ReactNode
}

export default function Label({
    name,
    children,
    className = '',
    classes = '',
    required = false,
    styles,
    tooltip,
    error
}: ILabel) {

    return (
        <div
            className={`labelContainer ${className}`}
            style={styles}
        >

            <label
                className={`labelContainer__label ${classes}`}
                htmlFor={name}
            >
                {children}

                {required && <span className="labelContainer__label__span">*</span>}

                {error && <><br />{error}</>}
            </label>

            {tooltip}
        </ div>
    )
}
