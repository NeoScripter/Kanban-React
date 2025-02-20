import { RefObject, useRef, useState } from 'react';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useBoardContext } from '../../hooks/useBoardContext';
import ModalOverlay from './ModalOverlay';
import useClickOutside from '../../hooks/useClickOutside';
import { DeleteModal } from './DeleteModal';

type BoardModalProps = {
    showModal: boolean;
    closeModal: () => void;
    ref: RefObject<HTMLDivElement | null>;
};

export default function BoardModal({
    ref,
    showModal,
    closeModal,
}: BoardModalProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { deleteBoard, currentBoardIndex, getCurrentBoardName } = useBoardContext();
    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => {
        if (showDeleteModal) setShowDeleteModal(false);
    });
    function handleDeleteModalClick() {
        deleteBoard(currentBoardIndex);
        setShowDeleteModal(false);
        closeModal();
    }

    return (
        <>
            <AnimateWrapper
                isVisible={showModal}
                isAbove={false}
                classes="absolute z-20 right-5 top-22"
            >
                <div
                    ref={ref}
                    className="shadow-md w-40 z-20 rounded-xl p-4 bg-white dark:bg-light-black"
                >
                    <button className="text-sm mb-4">Edit Board</button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteModal(true);
                        }}
                        className="text-sm text-dark-red cursor-pointer"
                    >
                        Delete Board
                    </button>
                </div>
            </AnimateWrapper>

            <ModalOverlay showModal={showDeleteModal}>
                <DeleteModal cancelClick={() => setShowDeleteModal(false)} deleteClick={handleDeleteModalClick} name={getCurrentBoardName()} ref={modalRef} />
            </ModalOverlay>
        </>
    );
}
