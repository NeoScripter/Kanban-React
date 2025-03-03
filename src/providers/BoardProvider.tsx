import { createContext, useState } from "react";
import type { Board, Column, Subtask, Task } from '../types/taskTypes';
import { DashboardHanlder, RawColumn } from "../utils/DashboardHandler";
import data from '../utils/data.json';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
    getCurrentBoardColumns: () => Column[],
    addNewTask: (columnIndex: number, name: string, description: string, subtaskNames: string[]) => void,
    currentTaskIndices: TaskIndices | null,
    getCurrentTaskData: () => Task,
    selectCurrentTask: (taskIndex: number, columnIndex: number) => void,
    deselectCurrentTask: () => void,
    changeSubtaskStatus: (subtaskIndex: number) => void,
    changeTaskColumn: (newColumnIndex: number) => void,
    deleteCurrentTask: () => void,
    updateCurrentTask: (newColumnIndex: number, title: string, description: string, subtasks: Subtask[]) => void,
};

type TaskIndices = {
    taskIndex: number,
    columnIndex: number,
}

const boardHandler = new DashboardHanlder();

export const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const [boards, setBoards] = useLocalStorage("kanbanBoards", boardHandler.createInitialBoard(data));
    const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);
    const [currentTaskIndices, setCurrentTaskIndices] = useState<TaskIndices | null>(null);

    const notify = (message: string) => {
        toast(message, {
            className: "bg-white! dark:bg-dark-gray! font-bold! border border-dark-white! dark:border-light-gray!",
          });
      };


    function updateCurrentTask(newColumnIndex: number, title: string, description: string, subtasks: Subtask[]) {
        if (currentTaskIndices == null) return;

        setBoards(prevBoard => boardHandler.updateTask(prevBoard, currentBoardIndex, currentTaskIndices.columnIndex, newColumnIndex, title, description, subtasks, currentTaskIndices.taskIndex))
        
        deselectCurrentTask();

        notify('Task successfully updated!');
    }

    function deleteCurrentTask() {
        if (currentTaskIndices == null) return;

        setBoards(prevBoard => boardHandler.deleteTask(prevBoard, currentBoardIndex, currentTaskIndices.columnIndex, currentTaskIndices.taskIndex));

        notify('Task successfully deleted!');
    }

    function changeTaskColumn(newColumnIndex: number) {
        if (currentTaskIndices == null) return;

        setBoards(prevBoard => boardHandler.changeTaskColumn(prevBoard, currentBoardIndex, currentTaskIndices.columnIndex, currentTaskIndices.taskIndex, newColumnIndex))
    }

    function changeSubtaskStatus(subtaskIndex: number) {
        if (currentTaskIndices == null) return;

        setBoards(prevBoard => boardHandler.changeSubtaskStatus(prevBoard, currentBoardIndex, currentTaskIndices.columnIndex, currentTaskIndices.taskIndex, subtaskIndex));
    }

    function deselectCurrentTask() {
        setCurrentTaskIndices(null);
    }

    function selectCurrentTask(taskIndex: number, columnIndex: number) {
        setCurrentTaskIndices({ taskIndex, columnIndex })
    }

    function getCurrentTaskData() {
        const emptyTask: Task = {
            id: '',
            title: '',
            description: '',
            status: '',
            subtasks: []
        }
        if (currentTaskIndices == null) return emptyTask;
        return boardHandler.getTaskData(boards, currentBoardIndex, currentTaskIndices.columnIndex, currentTaskIndices.taskIndex);
    }

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

        notify('Board successfully deleted!');
    }

    function addBoard(newBoardName: string, newBoardColumnNames: string[]) {
        setBoards(prevBoards => boardHandler.addBoard(prevBoards, newBoardName, newBoardColumnNames));

        notify('Board successfully created!');
    }
    

    function updateBoard(newBoardName: string, newBoardColumns: RawColumn[]) {
        setBoards(prevBoards => boardHandler.updateBoard(prevBoards, currentBoardIndex, newBoardName, newBoardColumns));

        notify('Board successfully updated!');
    }

    function getCurrentBoardColumns() {
        return boardHandler.getCurrentBoardColumns(boards, currentBoardIndex);
    }

    function addNewTask(columnIndex: number, title: string, description: string, subtaskNames: string[]) {
        setBoards(prevBoards => boardHandler.addTask(prevBoards, currentBoardIndex, columnIndex, title, description, subtaskNames));

        notify('Task successfully created!');
    }

  
    return (
        <BoardContext.Provider value={{ boards, displayBoardNames, currentBoardIndex, getCurrentBoardName, selectBoard, boardLength: boards.length, deleteBoard, addBoard, updateBoard, getCurrentBoardColumns, addNewTask, currentTaskIndices, getCurrentTaskData, selectCurrentTask, deselectCurrentTask, changeSubtaskStatus, changeTaskColumn, deleteCurrentTask, updateCurrentTask }}>
            {children}
        </BoardContext.Provider>
    );
}
