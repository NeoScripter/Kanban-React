import { createContext, useState } from "react";
import { useScreenResize } from "../hooks/useScreenResize";

type SidebarContextType = {
    showSidebar: boolean;
    toggleSidebar: () => void;
    hideSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const isLarge = useScreenResize();
    const [showSidebar, setShowSidebar] = useState(isLarge);

    function toggleSidebar() {
        setShowSidebar((o) => !o);
    }

    function hideSidebar() {
        setShowSidebar(false);
    }

    return (
        <SidebarContext.Provider value={{ showSidebar, toggleSidebar, hideSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}
