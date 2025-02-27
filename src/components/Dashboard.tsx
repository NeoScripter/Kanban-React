import type { Column, Task } from '../types/taskTypes';
import { useScreenResize } from '../hooks/useScreenResize';
import { cc } from '../utils/cc';
import { useSidebarContext } from '../hooks/useSidebarContext';
import { useBoardContext } from '../hooks/useBoardContext';
import ModalOverlay from './modals/ModalOverlay';
import ShowTaskModal from './modals/ShowTaskModal';
import { useThemeContext } from '../hooks/useThemeContext';
import { THEMES } from '../utils/theme';
import { useModalContext } from '../hooks/useModalContext';

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
    const { boards, currentBoardIndex, getCurrentBoardColumns, boardLength } = useBoardContext();
    const isLarge = useScreenResize();
    const { showSidebar } = useSidebarContext();
    const { currentTaskIndices, deselectCurrentTask } = useBoardContext();
    const { openEditBoardModal } = useModalContext();

    const isBoardEmpty = getCurrentBoardColumns().length === 0;

    return (
        <>
            <div
                className={cc(
                    'min-h-screen grid grid-flow-col gap-6 p-6 transition-transform duration-500 ease-in-out',
                    isLarge && showSidebar && 'sm:ml-65 md:ml-75',
                    isBoardEmpty ? 'place-content-center' : 'justify-start'
                )}
            >
                {boardLength > 0 && (!isBoardEmpty ? (
                    <>
                        {boards[currentBoardIndex].columns.map(
                            (column, idx) => (
                                <Column
                                    key={column.id}
                                    column={column}
                                    idx={idx}
                                />
                            )
                        )}
                        <NewColumnBtn onClick={openEditBoardModal} />
                    </>
                ) : (
                    <EmptyBoardMessage onClick={openEditBoardModal} />
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

type EmptyBoardMessagePropTypes = {
    onClick: () => void;
};

function EmptyBoardMessage({ onClick }: EmptyBoardMessagePropTypes) {
    return (
        <div className="flex items-center justify-center flex-col gap-6 mx-auto mb-17 sm:mb-25">
            <p className="font-bold text-lg sm:text-xl md:text-2xl text-center text-balance">
                This board is empty. Create a new column to get started.
            </p>

            <button
                onClick={onClick}
                className=" text-white font-semibold btn-primary py-4 px-6"
            >
                + Add New Column
            </button>
        </div>
    );
}

type NewColumnBtnPropTypes = {
    onClick: () => void;
};

function NewColumnBtn({ onClick }: NewColumnBtnPropTypes) {
    const { theme } = useThemeContext();

    const isDark = theme === THEMES.DARK;

    return (
        <button
            onClick={onClick}
            className={cc(
                'h-full w-70 mt-11 theme-transition flex items-center justify-center font-semibold text-2xl cursor-pointer rounded-md',
                isDark
                    ? 'dark-gradient hover:bg-gray-700!'
                    : 'light-gradient hover:bg-blue-100!'
            )}
        >
            + New Column
        </button>
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
            <header className="mb-6 font-bold flex items-center gap-3 uppercase tracking-[0.2em] text-xs">
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
