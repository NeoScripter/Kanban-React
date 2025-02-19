import { createContext, useState } from "react";
import type { Board } from '../types/taskTypes';
import { DashboardHanlder } from "../utils/DashboardHandler";
import data from '../utils/data.json';

type BoardContextType = {
    boards: Board[]
};

const boardHandler = new DashboardHanlder();

export const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const [boards] = useState<Board[]>(boardHandler.createInitialBoard(data));

  
    return (
        <BoardContext.Provider value={{ boards }}>
            {children}
        </BoardContext.Provider>
    );
}
