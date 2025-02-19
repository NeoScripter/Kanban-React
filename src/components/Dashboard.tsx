import type { Column, Task } from '../types/taskTypes';
import { useScreenResize } from '../hooks/useScreenResize';
import { cc } from '../utils/cc';
import { useSidebarContext } from '../hooks/useSidebarContext';
import { useBoardContext } from '../hooks/useBoardContext';

export default function Dashboard() {
    const { boards } = useBoardContext();
    const isLarge = useScreenResize();
    const { showSidebar } = useSidebarContext();

    return (
        <div
            className={cc(
                'h-full grid grid-flow-col justify-start gap-6 p-6 transition-transform duration-500 ease-in-out',
                isLarge && showSidebar && 'sm:translate-x-65 md:translate-x-75'
            )}
        >
            {boards[0].columns.map((column) => (
                <Column column={column} />
            ))}
        </div>
    );
}

type ColumnType = {
    column: Column;
};

function Column({ column }: ColumnType) {
    return (
        <div className="w-70">
            <header className="mb-6">{column.name}</header>
            <div className="space-y-6">
                {column.tasks.map((task) => (
                    <Task task={task} />
                ))}
            </div>
        </div>
    );
}

type TaskProps = {
    task: Task;
};

function Task({ task }: TaskProps) {
    return (
        <div className="bg-white dark:bg-dark-gray rounded-lg shadow-md px-4 py-6">
            <p className="mb-2 font-bold text-dark-black theme-transition dark:text-white text-balance">
                {task.title}
            </p>
            <p className="text-xs">{task.subtasks.length} subtasks</p>
        </div>
    );
}
