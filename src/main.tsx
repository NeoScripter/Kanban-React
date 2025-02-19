import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { SidebarProvider } from './providers/SidebarProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SidebarProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </SidebarProvider>
    </StrictMode>
);
