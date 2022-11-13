import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";


const Modal = ({ children }) => {
    const elRef = useRef(null)

    if(!elRef.current) {
        elRef.current = document.createElement("div")
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")
        modalRoot.appendChild(elRef.current)
        return () => modalRoot.remove(elRef.current)
    }, [])

    return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;
