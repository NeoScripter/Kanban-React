import { useState } from 'react';
import InputField from '../webform/InputField';
import MultipleInputFields from '../webform/MultipleInputFields';
import { useBoardContext } from '../../hooks/useBoardContext';
import { Subtask } from '../../types/taskTypes';
import TextareaField from '../webform/TextareaField';
import { SelectMenu } from '../webform/SelectMenu';
import { SelectColumnType } from './ShowTaskModal';

type AddTaskModalProps = {
    closeAddTaskModal: () => void;
};

export default function AddTaskModal({ closeAddTaskModal }: AddTaskModalProps) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [subtasks, setSubtasks] = useState<Subtask[]>([
        { id: crypto.randomUUID(), title: '', isCompleted: false },
    ]);
    const { addNewTask, getCurrentBoardColumns } = useBoardContext();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const columns = getCurrentBoardColumns().map((column, index) => {
        return { 
            id: column.id, 
            columnIndex: index, 
            columnName: column.name
        };
    });
    
    const [selectedColumn, setSelectedColumn] = useState(columns[0]); 

    function selectColumn(column: SelectColumnType) {
        setSelectedColumn(column);
    }

    function resetError() {
        setIsSubmitted(false);
    }

    function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitted(true);

        if (
            taskTitle === '' ||
            subtasks.some((subtask) => subtask.title === '')
        )
            return;

        const subtaskNames = subtasks.map((obj) => obj.title);
        addNewTask(selectedColumn.columnIndex, taskTitle, taskDescription, subtaskNames);
        closeAddTaskModal();
    }

    const descriptionPlaceholder =
        'e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little.';

    return (
        <form
            onSubmit={(e) => handleSumbit(e)}
            className="bg-white overflow-y-auto max-h-200 pop-in dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-full xs:w-86 sm:w-120 theme-transition"
        >
            <p className="font-bold text-lg sm:text-xl text-dark-black dark:text-white theme-transition">
                Add New Task
            </p>
            <InputField
                label="Title"
                placeholder="e.g. Take coffee break"
                setter={setTaskTitle}
                input={taskTitle}
                isSubmitted={isSubmitted}
                resetError={resetError}
            />
            <TextareaField
                label="Description"
                placeholder={descriptionPlaceholder}
                setter={setTaskDescription}
                input={taskDescription}
            />
            <MultipleInputFields
                inputArray={subtasks}
                setInputArray={setSubtasks}
                label="Subtasks"
                placeholders={['e.g. Make coffee', 'e.g. Drink coffee & smile']}
                isSubmitted={isSubmitted}
                resetError={resetError}
                btnLabel="+ Add New Subtask"
            />

            <SelectMenu items={columns} selected={selectedColumn} setSelected={selectColumn} />
            <button className="btn-secondary bg-dark-violet sm:text-base text-white text-sm hover:bg-light-violet">
                Create Task
            </button>
        </form>
    );
}
