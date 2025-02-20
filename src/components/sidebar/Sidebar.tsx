import { useThemeContext } from '../../hooks/useThemeContext';
import { BOARD_STATUS } from '../../consts/boardStatus';
import SidebarButton from './SidebarButton';
import sun from '../../assets/svgs/icon-light-theme.svg';
import moon from '../../assets/svgs/icon-dark-theme.svg';
import { THEMES } from '../../utils/theme';
import logoDark from '../../assets/svgs/logo-dark.svg';
import logoLight from '../../assets/svgs/logo-light.svg';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useScreenResize } from '../../hooks/useScreenResize';
import { getSidebarAnimationOptions } from '../../consts/sidebarAnimationOptions';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useRef, useState } from 'react';
import ModalOverlay from '../modals/ModalOverlay';
import AddBoardModal from '../modals/AddBoardModal';
import useClickOutside from '../../hooks/useClickOutside';

export default function Sidebar() {
    const { theme, toggleTheme } = useThemeContext();
    const { showSidebar, hideSidebar } = useSidebarContext();
    const isLarge = useScreenResize();
    const { displayBoardNames, currentBoardIndex, selectBoard, boardLength } =
        useBoardContext();
    const [showBoardModal, setShowBoardModal] = useState(false);
    const modalRef = useRef<HTMLFormElement | null>(null);

    function closeAddBoardModal() {
        setShowBoardModal(false);
    }

    useClickOutside(modalRef, () => {
        if (showBoardModal) closeAddBoardModal();
    });

    const isDark = THEMES.DARK === theme;

    return (
        <>
            <ModalOverlay showModal={showBoardModal}>
                <AddBoardModal ref={modalRef} closeAddBoardModal={closeAddBoardModal} />
            </ModalOverlay>
            <AnimateWrapper
                isVisible={showSidebar}
                options={getSidebarAnimationOptions(isLarge)}
                isAbove={isLarge ? false : true}
                classes="sm:h-full sm:absolute"
            >
                <nav className="z-10 absolute min-h-screen h-full inset-0 bg-black/50 pt-8 sm:top-0 sm:fixed sm:w-65 md:w-75 sm:pt-0 sm:border-r sm:border-dark-white dark:border-light-gray theme-transition">
                    <div className="bg-white dark:bg-dark-gray rounded-lg sm:rounded-none theme-transition mx-auto py-4 w-66 sm:w-full sm:h-full">
                        <div className="py-4 px-6 hidden sm:block mb-6">
                            <img
                                src={isDark ? logoLight : logoDark}
                                alt="Kanban logo"
                            />
                        </div>
                        <span className="px-6 block font-bold uppercase tracking-[0.2em] text-sm mb-5">
                            All boards ({boardLength})
                        </span>

                        <div>
                            <ul>
                                {displayBoardNames().map((boardName, index) => {
                                    return (
                                        <SidebarButton
                                            key={index + 'boardButton'}
                                            status={
                                                currentBoardIndex === index
                                                    ? BOARD_STATUS.CURRENT
                                                    : BOARD_STATUS.INACTIVE
                                            }
                                            content={boardName}
                                            onClick={() => selectBoard(index)}
                                        />
                                    );
                                })}
                            </ul>
                            <SidebarButton
                                key={'#japn39boardButton'}
                                status={BOARD_STATUS.CREATE}
                                content="+ Create New Board"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowBoardModal(true);
                                }}
                            />
                        </div>

                        <div className="mx-3 mt-3 sm:mt-20 md:mt-30 rounded-sm bg-dark-white dark:bg-light-black theme-transition py-3 flex items-center justify-center gap-6">
                            <img src={sun} alt="Sun icon" className="w-4 h-4" />

                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isDark}
                                    className="sr-only peer"
                                    onChange={toggleTheme}
                                />
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-light-violet rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-dark-violet"></div>
                            </label>

                            <img
                                src={moon}
                                alt="Moon icon"
                                className="w-4 h-4"
                            />
                        </div>

                        {isLarge && (
                            <button
                                onClick={hideSidebar}
                                className="flex group cursor-pointer items-center font-semibold pl-6 py-4 mt-8 mr-6 w-11/12 gap-4 tracking-wide rounded-r-full capitalize transition-colors duration-300 ease-in-out hover:bg-dark-white dark:hover:bg-dark-white hover:text-dark-violet"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 18 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="group-hover:fill-[#635FC7] transition-colors duration-300 ease-in-out"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z"
                                        fill="#828FA3"
                                    />
                                </svg>
                                <span>hide sidebar</span>
                            </button>
                        )}
                    </div>
                </nav>
            </AnimateWrapper>
        </>
    );
}
