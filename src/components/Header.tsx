import logoMobile from '../assets/svgs/logo-mobile.svg';
import chevronDown from '../assets/svgs/icon-chevron-down.svg';
import addTask from '../assets/svgs/icon-add-task-mobile.svg';
import logoDark from '../assets/svgs/logo-dark.svg';
import logoLight from '../assets/svgs/logo-light.svg';
import { useThemeContext } from '../hooks/useThemeContext';
import { THEMES } from '../utils/theme';
import { cc } from '../utils/cc';
import { useSidebarContext } from '../hooks/useSidebarContext';
import { useBoardContext } from '../hooks/useBoardContext';
import BoardDialog from './modals/BoardDialog.tsx';
import EllipsisBtn from './EllipsisBtn.tsx';
import { useModalContext } from '../hooks/useModalContext.tsx';

export default function Header() {
    const { theme } = useThemeContext();
    const { showSidebar, toggleSidebar } = useSidebarContext();
    const { getCurrentBoardName, boardLength } = useBoardContext();
    const { openAddTaskModal, toggleBoardDialog, showBoardDialog, closeBoardDialog, boardDialogRef } = useModalContext();

    const isDark = theme === THEMES.DARK;

    return (
        <header className="flex items-center bg-white dark:bg-dark-gray justify-between gap-2 shadow-sm border-b border-dark-white dark:border-light-gray theme-transition z-30">
            <div className="flex items-center">
                <div className="p-5 sm:p-7 md:p-8 sm:border-r-1 sm:border-dark-white dark:sm:border-light-gray theme-transition">
                    <img src={logoMobile} alt="Kanban" className="sm:hidden" />
                    <img
                        src={isDark ? logoLight : logoDark}
                        alt="Kanban"
                        className="hidden sm:block"
                    />
                </div>
                <div className="py-5 sm:p-7 md:p-8">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center gap-2 cursor-pointer sm:hidden"
                    >
                        <span className="xs:text-lg font-bold text-dark-black dark:text-white">
                            {getCurrentBoardName()}{' '}
                        </span>
                        <img
                            src={chevronDown}
                            alt="arrow down"
                            className={cc(
                                'mt-1 hidden xs:block transition-transform duration-300',
                                showSidebar && '-rotate-180'
                            )}
                        />
                    </button>
                    <span
                        className={cc(
                            'text-xl md:text-2xl hidden sm:block transition-transform duration-400 font-bold text-dark-black dark:text-white',
                            showSidebar &&
                                'translate-x-[3rem] md:translate-x-[5rem]'
                        )}
                    >
                        {getCurrentBoardName()}{' '}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4 cursor-pointer p-5 sm:pr-10 sm:gap-6 relative">
                <button
                    disabled={boardLength === 0}
                    onClick={openAddTaskModal}
                    className={cc("flex items-center shrink-0 justify-center gap-2 px-4 py-2 btn-primary sm:py-4 sm:px-6", boardLength === 0 && '!bg-light-violet !cursor-default')}
                >
                    <img src={addTask} alt="Plus sign" />
                    <span className="text-white font-semibold hidden sm:inline">
                        Add New Task
                    </span>
                </button>
                <EllipsisBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBoardDialog();
                    }}
                />
            </div>

            <BoardDialog
                ref={boardDialogRef}
                showModal={showBoardDialog}
                closeModal={closeBoardDialog}
            />
        </header>
    );
}
