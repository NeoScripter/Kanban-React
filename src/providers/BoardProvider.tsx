import { createContext, useState } from "react";
import type { Board, Column } from '../types/taskTypes';
import { DashboardHanlder, RawColumn } from "../utils/DashboardHandler";
import data from '../utils/data.json';

type BoardContextType = {
    boards: Board[],
    displayBoardNames: () => string[],
    currentBoardIndex: number,
    getCurrentBoardName: () => string,
    selectBoard: (arg0: number) => void,
    boardLength: number,
    deleteBoard: (arg0: number) => void,
    addBoard: (arg0: string, arg1: string[]) => void,
    updateBoard: (newBoardName: string, newBoardColumns: RawColumn[]) => void,
    getCurrentBoardColumns: () => Column[]
};

const boardHandler = new DashboardHanlder();

export const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const [boards, setBoards] = useState<Board[]>(boardHandler.createInitialBoard(data));
    const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);

    function getCurrentBoardName() {
        if (boards.length === 0) return '';
        return boards[currentBoardIndex].name;
    }

    function selectBoard(index: number) {
        setCurrentBoardIndex(index);
    }

    function displayBoardNames() {
        return boardHandler.displayBoardNames(boards)
    }

    function deleteBoard(index: number) {
        setBoards(prevBoards => boardHandler.deleteBoard(prevBoards, index));
        setCurrentBoardIndex(0);
    }

    function addBoard(newBoardName: string, newBoardColumnNames: string[]) {
        setBoards(prevBoards => boardHandler.addBoard(prevBoards, newBoardName, newBoardColumnNames));
    }

    function updateBoard(newBoardName: string, newBoardColumns: RawColumn[]) {
        setBoards(prevBoards => boardHandler.updateBoard(prevBoards, currentBoardIndex, newBoardName, newBoardColumns));
    }

    function getCurrentBoardColumns() {
        return boardHandler.getCurrentBoardColumns(boards, currentBoardIndex);
    }

  
    return (
        <BoardContext.Provider value={{ boards, displayBoardNames, currentBoardIndex, getCurrentBoardName, selectBoard, boardLength: boards.length, deleteBoard, addBoard, updateBoard, getCurrentBoardColumns }}>
            {children}
        </BoardContext.Provider>
    );
}
