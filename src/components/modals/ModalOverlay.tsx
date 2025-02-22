import { createPortal } from 'react-dom';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useState } from 'react';
import { cc } from '../../utils/cc';

type ModalOverlayProps = {
    children: React.ReactNode;
    showModal: boolean;
    closeModal: () => void;
};
export default function ModalOverlay({
    children,
    showModal,
    closeModal
}: ModalOverlayProps) {
    const [isClosing, setIsClosing] = useState(false);

    return createPortal(
        <AnimateWrapper
            isVisible={showModal}
            isAbove={false}
            classes="fixed z-30 inset-0 bg-black/50 flex items-center justify-center"
            onClick={() => {
                setIsClosing(true);
                setTimeout(() => {
                    closeModal();
                    setIsClosing(false);
                }, 500);
            }}
        >
            <div onClick={(e) => e.stopPropagation()} className={cc(isClosing && 'pop-out scale-0')}>
            {children}
            </div>
        </AnimateWrapper>,
        document.getElementById('modal-container')! 
    );
}
