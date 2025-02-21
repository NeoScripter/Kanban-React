import { useState } from 'react';
import InputField from '../webform/InputField';
import MultipleInputFields from '../webform/MultipleInputFields';
import { useBoardContext } from '../../hooks/useBoardContext';
import type { RawColumn } from '../../utils/DashboardHandler';

type AddBoardModalProps = {
    ref: React.RefObject<HTMLFormElement | null>;
    closeAddBoardModal: () => void,
}

export default function AddBoardModal({ ref, closeAddBoardModal }: AddBoardModalProps) {
    const [boardName, setBoardName] = useState('');
    const [columnNames, setColumnNames] = useState<RawColumn[]>([]);
    const { addBoard } = useBoardContext();
    const [isSubmitted, setIsSubmitted] = useState(false);

    function resetError() {
        setIsSubmitted(false);
    }

    function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const names = columnNames.map((obj) => obj.name);
        addBoard(boardName, names);
        closeAddBoardModal();
    }

    return (
        <form onSubmit={(e) => handleSumbit(e)} ref={ref} className="bg-white dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-86 theme-transition sm:w-120">
            <p className="font-bold text-lg sm:text-xl text-dark-black dark:text-white theme-transition">
                Add New Board
            </p>
            <InputField
                label="Board Name"
                setter={setBoardName}
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
                Create New Board
            </button>
        </form>
    );
}
