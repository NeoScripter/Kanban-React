import { useThemeContext } from '../hooks/useThemeContext';
import { BOARD_STATUS } from '../utils/boardStatus';
import BoardList from './BoardList';
import sun from '../assets/svgs/icon-light-theme.svg';
import moon from '../assets/svgs/icon-dark-theme.svg';
import { THEMES } from '../utils/theme';
import logoDark from '../assets/svgs/logo-dark.svg';
import logoLight from '../assets/svgs/logo-light.svg';
import hideSidebarIcon from '../assets/svgs/icon-hide-sidebar.svg';
import { AnimateWrapper } from '../providers/AnimateWrapper';
import { useRef, useState } from 'react';
import useEventListener from '../hooks/useEventListener';

type SidebarProps = {
    showSidebar: boolean;
    hideSidebar: () => void;
};

export default function Sidebar({ showSidebar, hideSidebar }: SidebarProps) {
    const { theme, toggleTheme } = useThemeContext();
    const [isLarge, setIsLarge] = useState(() => window.innerWidth > 768);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEventListener('resize', () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsLarge(window.innerWidth > 768);
        }, 100);
    });

    const isDark = THEMES.DARK === theme;

    const options = {
        initial: isLarge
            ? { x: -260, y: -100, transition: { duration: 0, ease: 'easeOut' } }
            : { opacity: 0, y: 0 },
        animate: isLarge
            ? { x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
            : { opacity: 1, y: 0 },
        exit: isLarge
            ? { x: -260, transition: { duration: 0.4, ease: 'easeOut' } }
            : { opacity: 0, y: 0 }
    };

    return (
        <AnimateWrapper isVisible={showSidebar} options={options}>
            <nav className="z-10 absolute min-h-screen inset-0 top-17 bg-black/50 pt-8 sm:top-0 sm:fixed sm:w-65 sm:pt-0 sm:border-r sm:border-dark-white dark:border-light-gray theme-transition">
                <div className="bg-white dark:bg-dark-gray rounded-lg sm:rounded-none theme-transition mx-auto py-4 w-66 sm:w-full sm:h-full">
                    <div className="py-4 px-6 hidden sm:block mb-6">
                        <img
                            src={isDark ? logoLight : logoDark}
                            alt=""
                            className=""
                        />
                    </div>
                    <span className="px-6 block font-bold uppercase tracking-[0.2em] text-sm mb-5">
                        All boards (3)
                    </span>

                    <div>
                        <ul>
                            <BoardList
                                status={BOARD_STATUS.CURRENT}
                                content="Platform Launch"
                            />
                            <BoardList
                                status={BOARD_STATUS.INACTIVE}
                                content="Marketing Plan"
                            />
                            <BoardList
                                status={BOARD_STATUS.INACTIVE}
                                content="Roadmap"
                            />
                        </ul>
                        <BoardList
                            status={BOARD_STATUS.CREATE}
                            isButton={true}
                        />
                    </div>

                    <div className="mx-3 mt-3 sm:mt-20 rounded-sm bg-dark-white dark:bg-light-black theme-transition py-3 flex items-center justify-center gap-6">
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

                        <img src={moon} alt="Moon icon" className="w-4 h-4" />
                    </div>

                    <button
                        onClick={hideSidebar}
                        className="flex cursor-pointer items-center font-semibold pl-6 py-4 mt-8 mr-6 w-11/12 gap-4 tracking-wide rounded-r-full capitalize transition-colors duration-300 ease-in-out hover:bg-dark-white dark:hover:bg-dark-white"
                    >
                        <img src={hideSidebarIcon} alt="" className="w-5 h-5" />
                        <span>hide sidebar</span>
                    </button>
                </div>
            </nav>
        </AnimateWrapper>
    );
}
