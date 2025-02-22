import { Checkbox } from '@headlessui/react';
import { Subtask } from '../types/taskTypes';
import { cc } from '../utils/cc';
import { useBoardContext } from '../hooks/useBoardContext';

type SubtaskItemProps = {
    subtask: Subtask,
    index: number,
}

export default function SubtaskItem({ subtask, index }: SubtaskItemProps) {
    const { changeSubtaskStatus } = useBoardContext();
    function onClick() {
        changeSubtaskStatus(index);
    }

    return (
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-sm cursor-pointer theme-transition hover:bg-light-violet/30 bg-dark-white dark:bg-light-black" onClick={onClick} >
            <Checkbox
                checked={subtask.isCompleted}
                onChange={onClick}
                className="group size-4 sm:size-5 shrink-0 rounded-sm bg-white data-[checked]:bg-dark-violet flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <svg
                    className="stroke-white opacity-0 size-3 sm:size-4 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Checkbox>

            <p className={cc("font-bold text-xs sm:text-sm block theme-transition", subtask.isCompleted ? "dark:text-white text-dark-black" : "line-through")}>{subtask.title}</p>
        </div>
    );
}
