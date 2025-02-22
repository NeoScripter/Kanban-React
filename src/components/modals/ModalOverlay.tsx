import { createPortal } from 'react-dom';
import { AnimateWrapper } from '../../providers/AnimateWrapper';

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
    return createPortal(
        <AnimateWrapper
            isVisible={showModal}
            isAbove={false}
            classes="fixed z-30 inset-0 bg-black/50 flex items-center justify-center"
            onClick={closeModal}
        >
            <div onClick={(e) => e.stopPropagation()}>
            {children}
            </div>
        </AnimateWrapper>,
        document.getElementById('modal-container')! 
    );
}
