import { useState } from 'react';
import InputField from '../webform/InputField';
import MultipleInputFields from '../webform/MultipleInputFields';

type AddBoardModalProps = {
    ref: React.RefObject<HTMLDivElement | null>;
}

export default function AddBoardModal({ ref }: AddBoardModalProps) {
    const [boardName, setBoardName] = useState('');
    const [columnNames, setColumnNames] = useState<string[]>([]);
    

    return (
        <div ref={ref} className="bg-white dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-86 theme-transition sm:w-120">
            <p className="font-bold text-lg text-dark-black dark:text-white theme-transition">
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
            <button className="btn-secondary bg-dark-violet text-white text-sm hover:bg-light-violet">
                Create New Board
            </button>
        </div>
    );
}
