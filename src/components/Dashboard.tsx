import type { Column, Task } from '../types/taskTypes';
import { useScreenResize } from '../hooks/useScreenResize';
import { cc } from '../utils/cc';
import { useSidebarContext } from '../hooks/useSidebarContext';
import { useBoardContext } from '../hooks/useBoardContext';
import ModalOverlay from './modals/ModalOverlay';
import ShowTaskModal from './modals/ShowTaskModal';

const headerColors = [
    '#49C4E5',
    '#8471F2',
    '#67E2AE',
    '#EA5555',
    '#b6a12c',
    '#ca109c',
    '#03b197',
];

export default function Dashboard() {
    const { boards, currentBoardIndex } = useBoardContext();
    const isLarge = useScreenResize();
    const { showSidebar } = useSidebarContext();
    const { currentTaskIndices, deselectCurrentTask } = useBoardContext();

    return (
        <>
            <div
                className={cc(
                    'h-full grid grid-flow-col justify-start gap-6 p-6 transition-transform duration-500 ease-in-out',
                    isLarge &&
                        showSidebar &&
                        'sm:translate-x-65 md:translate-x-75'
                )}
            >
                {boards.length > 0 &&
                    boards[currentBoardIndex].columns.map((column, idx) => (
                        <Column key={column.id} column={column} idx={idx} />
                    ))}
            </div>
            <ModalOverlay
                showModal={currentTaskIndices != null}
                closeModal={deselectCurrentTask}
            >
                <ShowTaskModal />
            </ModalOverlay>
        </>
    );
}

type ColumnType = {
    column: Column;
    idx: number;
};

function Column({ column, idx }: ColumnType) {
    return (
        <div
            className="w-70 column-animation"
            style={{ '--index': idx + 1 } as React.CSSProperties}
        >
            <header className="mb-6 font-bold flex items-center gap-3 uppercase tracking-[0.2em] text-sm">
                <span
                    className="w-4 h-4 shrink-0 rounded-full"
                    style={{
                        backgroundColor:
                            headerColors[idx % headerColors.length],
                    }}
                ></span>
                {column.name} {`(${column.tasks.length})`}
            </header>
            <div className="space-y-6">
                {column.tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        taskIndex={index}
                        columnIndex={idx}
                    />
                ))}
            </div>
        </div>
    );
}

type TaskProps = {
    task: Task;
    taskIndex: number;
    columnIndex: number;
};

function Task({ task, taskIndex, columnIndex }: TaskProps) {
    const { selectCurrentTask } = useBoardContext();

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                selectCurrentTask(taskIndex, columnIndex);
            }}
            className="bg-white z-10 card-animation theme-transition dark:bg-dark-gray rounded-lg shadow-md px-4 py-6 group cursor-pointer"
            style={{ '--index': taskIndex + 1 } as React.CSSProperties}
        >
            <p className="mb-2 font-bold text-dark-black theme-transition dark:text-white text-balance group-hover:text-dark-violet transition-colors duration-200">
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
