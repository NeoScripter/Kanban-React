import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ShowSidebarButton from './components/ShowSidebarButton';
import { AnimateWrapper } from './providers/AnimateWrapper';
import Dashboard from './components/Dashboard';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    function toggleSidebar() {
        setShowSidebar((o) => !o);
    }

    function hideSidebar() {
        setShowSidebar(false);
    }

    const options = {
        initial: { x: -60, y: -100, transition: { duration: 0, ease: 'easeOut' }},
        animate: { x: 0, transition: { duration: 0.4, ease: 'easeOut' }},
        exit: { x: -60, transition: { duration: 0.4, ease: 'easeOut' }}
    };

    
    return (
        <div className="relative">
            <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

            <Sidebar showSidebar={showSidebar} hideSidebar={hideSidebar} />

            <AnimateWrapper isVisible={!showSidebar} options={options}>
                <ShowSidebarButton toggleSidebar={toggleSidebar} />
            </AnimateWrapper>

            <main className="overflow-x-auto min-h-screen">
                <Dashboard />
            </main>
        </div>
    );
}

export default App;
