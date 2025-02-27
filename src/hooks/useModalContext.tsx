import { useContext } from "react";
import { ModalContext } from "../providers/ModalProvider";

export function useModalContext() {
    const modalContext = useContext(ModalContext);

    if (modalContext == null) {
        throw new Error('Must be within provider');
    }

    return modalContext;
}