import { useRef, useEffect } from "react";

export default function useClickOutside(callback: Function) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (ref.current && !ref.current.contains(e?.target)) {
                callback()
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [ref])

    return ref
}