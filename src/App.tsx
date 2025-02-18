import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ShowSidebarButton from './components/ShowSidebarButton';
import { AnimateWrapper } from './providers/AnimateWrapper';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    function toggleSidebar() {
        setShowSidebar((o) => !o);
    }

    function hideSidebar() {
        setShowSidebar(false);
    }
    
    return (
        <div className="relative">
            <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

            <Sidebar showSidebar={showSidebar} hideSidebar={hideSidebar} />

            <AnimateWrapper isVisible={!showSidebar}>
                <ShowSidebarButton toggleSidebar={toggleSidebar} />
            </AnimateWrapper>

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
