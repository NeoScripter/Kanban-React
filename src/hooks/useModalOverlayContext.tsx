import { useContext } from "react";
import { ModalOverlayContext } from "../components/modals/ModalOverlay";

export function useModalOverlayContext() {
    const modalOverlayContext = useContext(ModalOverlayContext);

    if (modalOverlayContext == null) {
        throw new Error('Must be within provider');
    }

    return modalOverlayContext;
}