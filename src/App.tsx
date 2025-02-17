import BoardList from './components/BoardList';
import Header from './components/Header';
import { BOARD_STATUS } from './utils/boardStatus';

function App() {
    return (
        <div className="relative">
            <Header />

            <nav className="z-10 absolute inset-0 top-17 bg-black/50 pt-8">
                <div className="bg-white dark:bg-dark-gray rounded-lg theme-transition mx-auto py-4 w-66">
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

                    <div className="mx-3 rounded-sm bg-dark-white py-3 flex items-center justify-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Toggle me
                            </span>
                        </label>
                    </div>
                </div>
            </nav>

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
