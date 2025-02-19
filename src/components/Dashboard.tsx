import type { Column, Task } from '../types/taskTypes';
import { useScreenResize } from '../hooks/useScreenResize';
import { cc } from '../utils/cc';
import { useSidebarContext } from '../hooks/useSidebarContext';
import { useBoardContext } from '../hooks/useBoardContext';

const headerColors = [
    '#49C4E5',
    '#8471F2',
    '#67E2AE',
    '#EA5555',
    '#b6a12c',
    '#ca109c',
    '#03b197'
];

export default function Dashboard() {
    const { boards, currentBoardIndex } = useBoardContext();
    const isLarge = useScreenResize();
    const { showSidebar } = useSidebarContext();

    return (
        <div
            className={cc(
                'h-full grid grid-flow-col justify-start gap-6 p-6 transition-transform duration-500 ease-in-out',
                isLarge && showSidebar && 'sm:translate-x-65 md:translate-x-75'
            )}
        >
            {boards.length > 0 && boards[currentBoardIndex].columns.map((column, idx) => (
                <Column key={column.id} column={column} idx={idx} />
            ))}
        </div>
    );
}

type ColumnType = {
    column: Column;
    idx: number;
};

function Column({ column, idx }: ColumnType) {
    return (
        <div className="w-70">
            <header className="mb-6 font-bold flex items-center gap-3 uppercase tracking-[0.2em] text-sm">
                <span
                    className="w-4 h-4 shrink-0 rounded-full"
                    style={{
                        backgroundColor: headerColors[idx % headerColors.length]
                    }}
                ></span>
                {column.name} {`(${column.tasks.length})`}
            </header>
            <div className="space-y-6">
                {column.tasks.map((task) => (
                    <Task key={task.id} task={task} />
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
            <p className="text-xs font-bold">
                {task.subtasks.reduce(
                    (acc, subtask) => (subtask.isCompleted ? acc + 1 : acc),
                    0
                )}{' '}
                of {task.subtasks.length} subtasks
            </p>
        </div>
    );
}
