import { useState } from 'react';
import InputField from '../webform/InputField';
import MultipleInputFields from '../webform/MultipleInputFields';
import { useBoardContext } from '../../hooks/useBoardContext';
import type { RawColumn } from '../../utils/DashboardHandler';

type EditBoardModalProps = {
    closeEditBoardModal: () => void,
}

export default function EditBoardModal({ closeEditBoardModal }: EditBoardModalProps) {
    const { updateBoard, getCurrentBoardColumns, getCurrentBoardName } = useBoardContext();
    const [boardName, setBoardName] = useState(getCurrentBoardName());
    const [columnNames, setColumnNames] = useState<RawColumn[]>(getCurrentBoardColumns());
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        <form onSubmit={(e) => handleSumbit(e)} className="bg-white pop-in dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-full xs:w-86 theme-transition sm:w-120">
            <p className="font-bold text-lg sm:text-xl text-dark-black dark:text-white theme-transition">
                Edit Board
            </p>
            <InputField
                label="Board Name"
                placeholder='e.g. Web Design'
                setter={(setBoardName)}
                input={boardName}
                isSubmitted={isSubmitted}
                resetError={resetError}
            />
            <MultipleInputFields
                inputArray={columnNames}
                setInputArray={setColumnNames}
                label='Board Columns'
                placeholders={["e.g. Todo", "e.g. Doing"]}
                isSubmitted={isSubmitted}
                resetError={resetError}
                btnLabel="+ Add New Column"
            />
            <button className="btn-secondary bg-dark-violet sm:text-base text-white text-sm hover:bg-light-violet">
                Update Board
            </button>
        </form>
    );
}
