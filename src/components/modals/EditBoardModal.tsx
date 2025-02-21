import { useRef, useState } from 'react';
import InputField from '../webform/InputField';
import MultipleInputFields from '../webform/MultipleInputFields';
import { useBoardContext } from '../../hooks/useBoardContext';
import type { RawColumn } from '../../utils/DashboardHandler';
import useClickOutside from '../../hooks/useClickOutside';

type EditBoardModalProps = {
    showEditModal: boolean,
    closeEditBoardModal: () => void,
}

export default function EditBoardModal({ closeEditBoardModal, showEditModal }: EditBoardModalProps) {
    const { updateBoard, getCurrentBoardColumns, getCurrentBoardName } = useBoardContext();
    const [boardName, setBoardName] = useState(getCurrentBoardName());
    const [columnNames, setColumnNames] = useState<RawColumn[]>(getCurrentBoardColumns());
    const [isSubmitted, setIsSubmitted] = useState(false);
    const editModalRef = useRef<HTMLFormElement | null>(null);

    useClickOutside(editModalRef, () => {
        if (showEditModal) {
            closeEditBoardModal();
            
        }
    });

    function resetError() {
        setIsSubmitted(false);
    }

    function resetColumns() {
        setColumnNames(getCurrentBoardColumns());
        setBoardName(getCurrentBoardName());
    }

    function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitted(true);

        if (boardName === '' || columnNames.some(column => column.name === '')) return;

        updateBoard(boardName, columnNames);
        closeEditBoardModal();
        resetColumns();
    }

    return (
        <form ref={editModalRef} onSubmit={(e) => handleSumbit(e)} className="bg-white dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-86 theme-transition sm:w-120">
            <p className="font-bold text-lg sm:text-xl text-dark-black dark:text-white theme-transition">
                Edit Board
            </p>
            <InputField
                label="Board Name"
                setter={(setBoardName)}
                input={boardName}
                isSubmitted={isSubmitted}
                resetError={resetError}
            />
            <MultipleInputFields
                inputArray={columnNames}
                setInputArray={setColumnNames}
                label='Board Columns'
                isSubmitted={isSubmitted}
                resetError={resetError}
            />
            <button className="btn-secondary bg-dark-violet sm:text-base text-white text-sm hover:bg-light-violet">
                Update Board
            </button>
        </form>
    );
}
