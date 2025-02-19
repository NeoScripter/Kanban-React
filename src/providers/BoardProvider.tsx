import { createContext, useState } from "react";
import type { Board } from '../types/taskTypes';
import { DashboardHanlder } from "../utils/DashboardHandler";
import data from '../utils/data.json';

type BoardContextType = {
    boards: Board[],
    displayBoardNames: () => string[],
    currentBoardIndex: number,
    getCurrentBoardName: () => string,
    selectBoard: (arg0: number) => void,
    boardLength: number,
};

const boardHandler = new DashboardHanlder();

export const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const [boards, setBoards] = useState<Board[]>(boardHandler.createInitialBoard(data));
    const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);

    function getCurrentBoardName() {
        return boards[currentBoardIndex].name;
    }

    function selectBoard(index: number) {
        setCurrentBoardIndex(index);
    }

    function displayBoardNames() {
        return boardHandler.displayBoardNames(boards)
    }

    function deleteBoard(boardId) {
        setBoards(prevBoards => boardHandler.deleteBoard(prevBoards, boardId));
    }

  
    return (
        <BoardContext.Provider value={{ boards, displayBoardNames, currentBoardIndex, getCurrentBoardName, selectBoard, boardLength: boards.length }}>
            {children}
        </BoardContext.Provider>
    );
}
