import { createContext, useRef, useState } from 'react';
import { useBoardContext } from '../hooks/useBoardContext';
import useClickOutside from '../hooks/useClickOutside';

type ModalContextType = {
    showAddTaskModal: boolean;
    closeAddTaskModal: () => void;
    openAddTaskModal: () => void;
    toggleBoardDialog: () => void;
    showBoardDialog: boolean;
    closeBoardDialog: () => void;
    boardDialogRef: React.RefObject<HTMLDivElement | null>;
    showEditBoardModal: boolean;
    closeEditBoardModal: () => void;
    openEditBoardModal: () => void;
    openDeleteBoardModal: () => void;
    closeDeleteBoardModal: () => void;
    handleDeleteBoardModalClick: () => void;
    showDeleteBoardModal: boolean;
    openDeleteTaskModal: () => void;
    closeDeleteTaskModal: () => void;
    handleDeleteTaskModalClick: () => void;
    showDeleteTaskModal: boolean;
    closeEditTaskModal: () => void;
    openEditTaskModal: () => void;
    showEditTaskModal: boolean;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const {
        boardLength,
        deleteBoard,
        currentBoardIndex,
        deselectCurrentTask,
        deleteCurrentTask,
    } = useBoardContext();

    // Add Task modal
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    // Board Dialog
    const [showBoardDialog, setShowBoardDialog] = useState(false);
    const boardDialogRef = useRef<HTMLDivElement | null>(null);

    // Edit Board Modal
    const [showEditBoardModal, setShowEditBoardModal] = useState(false);

    // Delete Board Modal
    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

    // Edit Task Modal
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);

    // Delete Task Modal
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

    // Add Task modal

    function closeAddTaskModal() {
        setShowAddTaskModal(false);
    }

    function openAddTaskModal() {
        if (boardLength === 0) return;

        setShowAddTaskModal(true);
    }

    // Board Dialog

    useClickOutside(boardDialogRef, () => {
        if (showBoardDialog) closeBoardDialog();
    });

    function closeBoardDialog() {
        setShowBoardDialog(false);
    }

    function toggleBoardDialog() {
        if (boardLength === 0) return;
        setShowBoardDialog((o) => !o);
    }

    // Edit Board Modal

    function closeEditBoardModal() {
        setShowEditBoardModal(false);
    }

    function openEditBoardModal() {
        setShowEditBoardModal(true);
    }

    // Delete Board Modal

    function handleDeleteBoardModalClick() {
        deleteBoard(currentBoardIndex);
        closeDeleteBoardModal();
        closeBoardDialog();
    }

    function closeDeleteBoardModal() {
        setShowDeleteBoardModal(false);
    }

    function openDeleteBoardModal() {
        setShowDeleteBoardModal(true);
    }

    // Edit Task Modal

    function closeEditTaskModal() {
        setShowEditTaskModal(false);
    }

    function openEditTaskModal() {
        setShowEditTaskModal(true);
    }

    // Delete Task Modal

    function closeDeleteTaskModal() {
        setShowDeleteTaskModal(false);
    }

    function openDeleteTaskModal() {
        setShowDeleteTaskModal(true);
    }

    function handleDeleteTaskModalClick() {
        deleteCurrentTask();
        deselectCurrentTask();
        closeDeleteTaskModal();
    }

    return (
        <ModalContext.Provider
            value={{
                showAddTaskModal,
                closeAddTaskModal,
                openAddTaskModal,
                toggleBoardDialog,
                showBoardDialog,
                closeBoardDialog,
                boardDialogRef,
                showEditBoardModal,
                closeEditBoardModal,
                openEditBoardModal,
                openDeleteBoardModal,
                closeDeleteBoardModal,
                handleDeleteBoardModalClick,
                showDeleteBoardModal,
                closeDeleteTaskModal,
                showDeleteTaskModal,
                openDeleteTaskModal,
                handleDeleteTaskModalClick,
                closeEditTaskModal,
                openEditTaskModal,
                showEditTaskModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
