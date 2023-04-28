import { NavLink, useMatches } from 'react-router-dom'
import { CSSProperties, Key } from 'react'
import './Breadcrumb.scss'

export default function Breadcrumb({ style }: { style: CSSProperties }) {

    const matches = useMatches()
    let crumbs = matches
        .filter((match: any) => Boolean(match.handle?.crumb));

    return (

        <div className="breadcrumb" style={style}>
            {crumbs.map((match: any, index: Key) => (
                <NavLink
                    key={index}
                    to={match.pathname}
                    className="breadcrumb__item"
                >
                    {match.handle.crumb}
                </NavLink>
            ))}
        </div>
    )
}
