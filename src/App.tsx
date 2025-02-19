import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ShowSidebarButton from './components/ShowSidebarButton';
import { AnimateWrapper } from './providers/AnimateWrapper';
import Dashboard from './components/Dashboard';
import { sidebarBtnAnimationOptions } from './consts/sidebarBtnAnimationOptions';
import { useSidebarContext } from './hooks/useSidebarContext';
import { BoardProvider } from './providers/BoardProvider';

function App() {
    const { showSidebar, toggleSidebar } = useSidebarContext();

    return (
        <BoardProvider>
            <div className="relative">
                <Header />

                <Sidebar />

                <AnimateWrapper
                    isVisible={!showSidebar}
                    options={sidebarBtnAnimationOptions}
                >
                    <ShowSidebarButton toggleSidebar={toggleSidebar} />
                </AnimateWrapper>

                <main className="overflow-x-auto min-h-screen">
                    <Dashboard />
                </main>
            </div>
        </BoardProvider>
    );
}

export default App;
