import { RefObject, useRef, useState } from 'react';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useBoardContext } from '../../hooks/useBoardContext';
import ModalOverlay from './ModalOverlay';
import useClickOutside from '../../hooks/useClickOutside';
import { DeleteModal } from './DeleteModal';
import EditBoardModal from './EditBoardModal';

type BoardDialogProps = {
    showModal: boolean;
    closeModal: () => void;
    ref: RefObject<HTMLDivElement | null>;
};

export default function BoardDialog({
    ref,
    showModal,
    closeModal,
}: BoardDialogProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const { deleteBoard, currentBoardIndex, getCurrentBoardName } =
        useBoardContext();
    const deleteModalRef = useRef<HTMLDivElement | null>(null);
    const editModalRef = useRef<HTMLFormElement | null>(null);

    useClickOutside(deleteModalRef, () => {
        if (showDeleteModal) setShowDeleteModal(false);
    });

    useClickOutside(editModalRef, () => {
        if (showEditModal) setShowEditModal(false);
    });

    function handleDeleteModalClick() {
        deleteBoard(currentBoardIndex);
        setShowDeleteModal(false);
        closeModal();
    }

    function handleEditModalClick() {
        setShowEditModal(false);
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowEditModal(true);
                            closeModal();
                        }}
                        className="text-sm mb-4 cursor-pointer"
                    >
                        Edit Board
                    </button>
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

            <ModalOverlay key="DeleteModalOverlay" showModal={showDeleteModal}>
                <DeleteModal
                    cancelClick={() => setShowDeleteModal(false)}
                    deleteClick={handleDeleteModalClick}
                    name={getCurrentBoardName()}
                    ref={deleteModalRef}
                />
            </ModalOverlay>

            <ModalOverlay key="EditModalOverlay" showModal={showEditModal}>
                <EditBoardModal
                    closeEditBoardModal={handleEditModalClick}
                    ref={editModalRef}
                />
            </ModalOverlay>
        </>
    );
}
