

type DeleteModalProps = {
    isTask?: boolean;
    cancelClick: () => void;
    deleteClick: () => void;
    name: string;
};

export function DeleteModal({ isTask = false, cancelClick, deleteClick, name }: DeleteModalProps) {
    const title = isTask ? 'Delete this task?' : 'Delete this board?';
    const body = isTask
        ? `Are you sure you want to delete the ${name} task and its subtasks? This action cannot be reversed`
        : `Are you sure you want to delete the ${name} board? This action will remove all columns and tasks and cannot be reversed.`;

    return (
        <div
            className="bg-white w-86 sm:w-120 max-w-full dark:bg-dark-gray rounded-lg p-6 sm:p-8"
        >
            <p className="text-lg text-dark-red font-bold mb-6">{title}</p>
            <p className="text-sm mb-6">{body}</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={deleteClick}
                    className="btn-secondary bg-dark-red hover:bg-light-red text-white"
                >
                    Delete
                </button>
                <button onClick={cancelClick} className="btn-secondary bg-light-blue dark:hover:bg-dark-white hover:bg-light-violet/35 text-dark-violet">
                    Cancel
                </button>
            </div>
        </div>
    );
}
