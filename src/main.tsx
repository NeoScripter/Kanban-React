import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { SidebarProvider } from './providers/SidebarProvider.tsx';
import { BoardProvider } from './providers/BoardProvider.tsx';
import { ModalProvider } from './providers/ModalProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SidebarProvider>
            <BoardProvider>
                <ModalProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ModalProvider>
            </BoardProvider>
        </SidebarProvider>
    </StrictMode>
);
