import { useRef, useState } from 'react';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useBoardContext } from '../../hooks/useBoardContext';
import ModalOverlay from './ModalOverlay';
import useClickOutside from '../../hooks/useClickOutside';
import { DeleteModal } from './DeleteModal';
import EditBoardModal from './EditBoardModal';

type TaskDialogProps = {
    showModal: boolean;
    closeModal: () => void;
};

export default function TaskDialog({
    showModal,
    closeModal,
}: TaskDialogProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const { deleteBoard, currentBoardIndex, getCurrentBoardName } =
        useBoardContext();
    const deleteModalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(deleteModalRef, () => {
        if (showDeleteModal) setShowDeleteModal(false);
    });

    function handleDeleteModalClick() {
        deleteBoard(currentBoardIndex);
        setShowDeleteModal(false);
        closeModal();
    }

    function closeDeleteModal() {
        setShowDeleteModal(false);
    }

    function closeEditModal() {
        setShowEditModal(false);
    }

    return (
        <>
            <AnimateWrapper
                isVisible={showModal}
                isAbove={false}
                classes="absolute z-20 right-0 sm:translate-x-1/2 top-10"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="shadow-md w-40 z-20 rounded-xl overflow-clip p-2 bg-white dark:bg-light-black font-normal"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowEditModal(true);
                            closeModal();
                        }}
                        className="text-sm p-2 w-full text-start cursor-pointer text-dark-blue transition-colors duration-300 hover:bg-dark-blue/10 rounded-md dark:hover:bg-dark-blue/30"
                    >
                        Edit Task
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteModal(true);
                        }}
                        className="text-dark-red text-sm p-2 w-full text-start cursor-pointer transition-colors duration-300 hover:bg-dark-blue/10 rounded-md dark:hover:bg-dark-blue/30"
                    >
                        Delete Task
                    </button>
                </div>
            </AnimateWrapper>

            <ModalOverlay key="DeleteBoardModalOverlay" showModal={showDeleteModal} closeModal={closeDeleteModal}>
                <DeleteModal
                    cancelClick={() => setShowDeleteModal(false)}
                    deleteClick={handleDeleteModalClick}
                    name={getCurrentBoardName()}
                />
            </ModalOverlay>

            <ModalOverlay key="EditBoardModalOverlay" showModal={showEditModal} closeModal={closeEditModal}>
                <EditBoardModal
                    closeEditBoardModal={closeEditModal}
                />
            </ModalOverlay>
        </>
    );
}
