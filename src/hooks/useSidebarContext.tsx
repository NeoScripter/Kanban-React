import { useContext } from "react";
import { SidebarContext } from "../providers/SidebarProvider";

export function useSidebarContext() {
    const sidebarContext = useContext(SidebarContext);

    if (sidebarContext == null) {
        throw new Error('Must be within provider');
    }

    return sidebarContext;
}