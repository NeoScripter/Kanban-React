import { createPortal } from 'react-dom';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { createContext, useState } from 'react';
import { cc } from '../../utils/cc';

type ModalOverlayProps = {
    children: React.ReactNode;
    showModal: boolean;
    closeModal: () => void;
};

type ModalContextOverlayType = {
    closeParentModal: (callback?: () => void) => void;
};

export const ModalOverlayContext =
    createContext<ModalContextOverlayType | null>(null);

export default function ModalOverlay({
    children,
    showModal,
    closeModal,
}: ModalOverlayProps) {
    const [isClosing, setIsClosing] = useState(false);

    function closeParentModal(callback?: () => void): void {
        setIsClosing(true);
        setTimeout(() => {
            if (callback) callback();
            closeModal();
            setIsClosing(false);
        }, 500);
    }

    return createPortal(
        <AnimateWrapper
            isVisible={showModal}
            isAbove={false}
            classes="fixed z-30 inset-0 bg-black/50 flex items-center justify-center overflow-y-auto"
            onClick={closeParentModal}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={cc(isClosing && 'pop-out scale-0')}
            >
                <ModalOverlayContext.Provider value={{ closeParentModal }}>
                    {children}
                </ModalOverlayContext.Provider>
            </div>
        </AnimateWrapper>,
        document.getElementById('modal-container')!
    );
}
