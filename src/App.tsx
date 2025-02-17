import logoMobile from './assets/svgs/logo-mobile.svg';
import chevronDown from './assets/svgs/icon-chevron-down.svg';
import addTask from './assets/svgs/icon-add-task-mobile.svg';
import ellipsis from './assets/svgs/icon-vertical-ellipsis.svg';
import logoDark from './assets/svgs/logo-dark.svg';
import logoLight from './assets/svgs/logo-light.svg';
import { useThemeContext } from './hooks/useThemeContext';
import { THEMES } from './utils/theme';

function App() {
    const { theme, toggleTheme } = useThemeContext();

    const isDark = theme === THEMES.DARK;

    return (
        <div>
            <header className="flex items-center bg-white dark:bg-dark-gray justify-between gap-2 shadow-sm border-b border-dark-white dark:border-light-gray theme-transition">
                <div className="flex items-center">
                    <div className="p-5 sm:p-7 md:p-8 sm:border-r-1 sm:border-dark-white dark:sm:border-light-gray theme-transition">
                        <img src={logoMobile} alt="" className="sm:hidden" />
                        <img
                            src={isDark ? logoLight : logoDark}
                            alt=""
                            className="hidden sm:block"
                        />
                    </div>
                    <div className="py-5 sm:p-7 md:p-8">
                        <button className="flex items-center gap-2 cursor-pointer sm:hidden">
                            <span className="xs:text-lg font-bold text-dark-black dark:text-white">
                                Platform Launch{' '}
                            </span>
                            <img src={chevronDown} alt="" className="mt-1 hidden xs:block" />
                        </button>
                        <span className="text-xl md:text-2xl hidden sm:inline font-bold text-dark-black dark:text-white">
                            Platform Launch{' '}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 cursor-pointer p-5 sm:gap-6">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center shrink-0 justify-center gap-2 px-4 py-2 btn-primary sm:py-4 sm:px-6"
                    >
                        <img src={addTask} alt="" />
                        <span className="text-white font-semibold hidden sm:inline">
                            Add New Task
                        </span>
                    </button>
                    <button className="cursor-pointer h-4 sm:h-5 shrink-0">
                        <img
                            src={ellipsis}
                            alt=""
                            className="object-cover object-center h-full w-full"
                        />
                    </button>
                </div>
            </header>
            <main className="overflow-x-auto min-h-screen">
                <div className="w-400 h-full">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum vero repellendus reiciendis! Esse eos accusantium
                    error et vitae assumenda ratione soluta ea ipsa repellendus
                    in iusto eaque dignissimos, maiores ex accusamus explicabo
                    dolor cupiditate excepturi recusandae est. Qui consectetur
                    eos dicta ipsum, odit quidem animi architecto itaque
                    reiciendis quasi illo.
                </div>
            </main>
        </div>
    );
}

export default App;
