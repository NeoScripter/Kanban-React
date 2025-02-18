import { useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';

function App() {
    const [showNavBar, setShowNavBar] = useState(false);

    function toggleNavBar() {
        setShowNavBar(o => !o);
    }
    return (
        <div className="relative">
            <Header toggleNavBar={toggleNavBar} />

            <NavBar showNavBar={showNavBar} />

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
