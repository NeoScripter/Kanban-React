import { useState } from 'react';
import InputField from '../webform/InputField';
import MultipleInputFields from '../webform/MultipleInputFields';
import { useBoardContext } from '../../hooks/useBoardContext';
import type { RawColumn } from '../../utils/DashboardHandler';

type EditBoardModalProps = {
    ref: React.RefObject<HTMLFormElement | null>;
    closeEditBoardModal: () => void,
}

export default function EditBoardModal({ closeEditBoardModal, ref }: EditBoardModalProps) {
    const { updateBoard, getCurrentBoardColumns, getCurrentBoardName } = useBoardContext();
    const [boardName, setBoardName] = useState(getCurrentBoardName());
    const [columnNames, setColumnNames] = useState<RawColumn[]>(getCurrentBoardColumns());

    function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateBoard(boardName, columnNames);
        closeEditBoardModal();
    }

    return (
        <form ref={ref} onSubmit={(e) => handleSumbit(e)} className="bg-white dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-86 theme-transition sm:w-120">
            <p className="font-bold text-lg sm:text-xl text-dark-black dark:text-white theme-transition">
                Add New Board
            </p>
            <InputField
                label="Board Name"
                setter={setBoardName}
                input={boardName}
            />
            <MultipleInputFields
                inputArray={columnNames}
                setInputArray={setColumnNames}
                label='Board Columns'
            />
            <button className="btn-secondary bg-dark-violet sm:text-base text-white text-sm hover:bg-light-violet">
                Update Board
            </button>
        </form>
    );
}
