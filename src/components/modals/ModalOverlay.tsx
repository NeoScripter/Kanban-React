import { createPortal } from 'react-dom';
import { AnimateWrapper } from '../../providers/AnimateWrapper';

type ModalOverlayProps = {
    children: React.ReactNode;
    showModal: boolean;
};
export default function ModalOverlay({
    children,
    showModal,
}: ModalOverlayProps) {
    return createPortal(
        <AnimateWrapper
            isVisible={showModal}
            isAbove={false}
            classes="fixed z-30 inset-0 bg-black/50 flex items-center justify-center"
        >
            {children}
        </AnimateWrapper>,
        document.getElementById('modal-container')! 
    );
}
