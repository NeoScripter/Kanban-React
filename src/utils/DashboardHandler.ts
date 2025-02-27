import { Board, Column, Subtask, Task } from '../types/taskTypes';

export type RawColumn = Omit<Column, 'tasks'>;

type JsonObject = {
    boards: JsonBoard[];
};

type JsonBoard = {
    name: string;
    columns: JsonColumn[];
};
type JsonColumn = {
    name: string;
    tasks: JsonTask[];
};
type JsonTask = {
    title: string;
    description: string;
    status: string;
    subtasks: JsonSubtask[];
};
type JsonSubtask = Omit<Subtask, 'id'>;

export class DashboardHanlder {
    // Subtasks

    changeSubtaskStatus(
        boards: Board[],
        boardIndex: number,
        columnIndex: number,
        taskIndex: number,
        subtaskIndex: number
    ) {
        const currentBoard = boards[boardIndex];
        if (!currentBoard) return boards;
    
        const currentColumn = currentBoard.columns[columnIndex];
        if (!currentColumn) return boards;
    
        const currentTask = currentColumn.tasks[taskIndex];
        if (!currentTask) return boards;
    
        const currentSubtask = currentTask.subtasks[subtaskIndex];
        if (!currentSubtask) return boards; 
    
        const updatedSubtasks = currentTask.subtasks.map((subtask, index) =>
            index === subtaskIndex
                ? { ...subtask, isCompleted: !subtask.isCompleted } 
                : subtask
        );
    
        const updatedTask = { ...currentTask, subtasks: updatedSubtasks };
    
        const updatedTasks = currentColumn.tasks.map((task, index) =>
            index === taskIndex ? updatedTask : task
        );
    
        const updatedColumns = currentBoard.columns.map((column, index) =>
            index === columnIndex ? { ...column, tasks: updatedTasks } : column
        );
    
        return [
            ...boards.slice(0, boardIndex),
            { ...currentBoard, columns: updatedColumns },
            ...boards.slice(boardIndex + 1),
        ];
    }
    

    // Tasks

    changeTaskColumn(
        boards: Board[],
        boardIndex: number,
        oldColumnIndex: number,
        taskIndex: number,
        newColumnIndex: number
    ) {
        const currentBoard = boards[boardIndex];
        const oldColumn = currentBoard.columns[oldColumnIndex];
        const newColumn = currentBoard.columns[newColumnIndex];

        if (!oldColumn || !newColumn || !oldColumn.tasks[taskIndex]) {
            console.warn('Invalid task move operation.');
            return boards;
        }

        const currentTask = { ...oldColumn.tasks[taskIndex] };

        const updatedOldColumnTasks = oldColumn.tasks.filter(
            (_, index) => index !== taskIndex
        );

        const updatedNewColumnTasks = [...newColumn.tasks, currentTask];

        const updatedColumns = currentBoard.columns.map((column, index) =>
            index === oldColumnIndex
                ? { ...column, tasks: updatedOldColumnTasks }
                : index === newColumnIndex
                  ? { ...column, tasks: updatedNewColumnTasks }
                  : column
        );

        const updatedBoard = { ...currentBoard, columns: updatedColumns };

        return [
            ...boards.slice(0, boardIndex),
            updatedBoard,
            ...boards.slice(boardIndex + 1),
        ];
    }

    getTaskData(
        boards: Board[],
        boardIndex: number,
        columnIndex: number,
        taskIndex: number
    ) {
        return boards[boardIndex].columns[columnIndex].tasks[taskIndex];
    }

    updateTask(
        boards: Board[],
        boardIndex: number,
        currentColumnIndex: number,
        newColumnIndex: number,
        title: string,
        description: string,
        rawSubtasks: Subtask[],
        taskIndex: number
    ) {
        const currentBoard = boards[boardIndex];
        if (!currentBoard) return boards;
    
        const currentColumn = currentBoard.columns[currentColumnIndex];
        if (!currentColumn) return boards;
    
        const currentTask = currentColumn.tasks[taskIndex];
        if (!currentTask) return boards;
    
        const updatedTask = {
            ...currentTask,
            subtasks: rawSubtasks.map((subtask) => ({ ...subtask })), 
            title,
            description,
            status: currentBoard.columns[newColumnIndex].name,
        };
    
        let updatedColumns;
    
        if (currentColumnIndex === newColumnIndex) {
            const updatedTasks = currentColumn.tasks.map((task, index) =>
                index === taskIndex ? updatedTask : task
            );
    
            updatedColumns = currentBoard.columns.map((column, index) =>
                index === currentColumnIndex ? { ...column, tasks: updatedTasks } : column
            );
        } else {
            const updatedOldColumnTasks = currentColumn.tasks.filter(
                (_, index) => index !== taskIndex
            );
    
            const updatedNewColumnTasks = [
                ...currentBoard.columns[newColumnIndex].tasks,
                updatedTask,
            ];
    
            updatedColumns = currentBoard.columns.map((column, index) => {
                if (index === currentColumnIndex) {
                    return { ...column, tasks: updatedOldColumnTasks };
                }
                if (index === newColumnIndex) {
                    return { ...column, tasks: updatedNewColumnTasks }; 
                }
                return column;
            });
        }
    
        return [
            ...boards.slice(0, boardIndex),
            { ...currentBoard, columns: updatedColumns },
            ...boards.slice(boardIndex + 1),
        ];
    }
    

    deleteTask(
        boards: Board[],
        boardIndex: number,
        columnIndex: number,
        taskIndex: number,
    ) {
        const updatedColumns = boards[boardIndex].columns.map(
            (column, index) =>
                index === columnIndex
                    ? {
                          ...column,
                          tasks: column.tasks.filter(
                              (_, index) => index !== taskIndex
                          ),
                      }
                    : column
        );

        const updatedBoard = {
            ...boards[boardIndex],
            columns: updatedColumns,
        };

        return [
            ...boards.slice(0, boardIndex),
            updatedBoard,
            ...boards.slice(boardIndex + 1),
        ];
    }

    addTask(
        boards: Board[],
        boardIndex: number,
        columnIndex: number,
        title: string,
        description: string,
        subtaskNames: string[]
    ) {
        const subtasks = subtaskNames.map((title) => this.createSubtask(title));
        const status = boards[boardIndex].columns[columnIndex].name;

        const newTask = this.createTask(title, description, status, subtasks);

        const updatedColumns = boards[boardIndex].columns.map(
            (column, index) =>
                index === columnIndex
                    ? { ...column, tasks: [...column.tasks, newTask] }
                    : column
        );

        const updatedBoard = {
            ...boards[boardIndex],
            columns: updatedColumns,
        };

        return [
            ...boards.slice(0, boardIndex),
            updatedBoard,
            ...boards.slice(boardIndex + 1),
        ];
    }

    // Columns

    getColumnNames(boards: Board[], boardIndex: number) {
        return boards[boardIndex].columns.map((column) => column.name);
    }

    getCurrentBoardColumns(boards: Board[], boardIndex: number) {
        if (boards.length === 0) return [];
        
        return [...boards[boardIndex].columns];
    }

    /*  showTask(boards: Board[], boardIndex: number, columnIndex: number, taskIndex: number) {

    } */

    // Boards

    updateBoard(
        boards: Board[],
        boardIndex: number,
        name: string,
        rawColumns: RawColumn[]
    ): Board[] {
        const currentBoard = boards[boardIndex];
        const rawColumnIds = new Set(rawColumns.map((col) => col.id));

        const unchangedColumns = currentBoard.columns.filter((col) =>
            rawColumnIds.has(col.id)
        );

        const newColumns = rawColumns
            .filter(
                (rawCol) =>
                    !unchangedColumns.some((col) => col.id === rawCol.id)
            )
            .map((rawCol) => this.createColumn(rawCol.name));

        const updatedBoard: Board = {
            ...currentBoard,
            name,
            columns: [...unchangedColumns, ...newColumns],
        };

        return [
            ...boards.slice(0, boardIndex),
            updatedBoard,
            ...boards.slice(boardIndex + 1),
        ];
    }

    addBoard(
        boards: Board[],
        newBoardName: string,
        newBoardColumnNames: string[]
    ) {
        const newBoardsColumns: Column[] = newBoardColumnNames.map((name) =>
            this.createColumn(name)
        );
        const newBoard: Board = this.createBoard(
            newBoardName,
            newBoardsColumns
        );

        return [...boards, newBoard];
    }

    deleteBoard(boards: Board[], index: number) {
        return [...boards.slice(0, index), ...boards.slice(index + 1)];
    }

    displayBoardNames(boards: Board[]) {
        const boardNames: string[] = [];

        boards.forEach((board) => boardNames.push(board.name));

        return boardNames;
    }

    // Utils

    createBoard(name: string, columns: Column[] = []) {
        const newBoard: Board = {
            id: crypto.randomUUID(),
            name,
            columns,
        };

        return newBoard;
    }

    createColumn(name: string, tasks: Task[] = []) {
        const newColumn: Column = {
            id: crypto.randomUUID(),
            name,
            tasks,
        };

        return newColumn;
    }

    createTask(
        title: string,
        description: string,
        status: string,
        subtasks: Subtask[] = []
    ) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            status,
            subtasks,
        };

        return newTask;
    }

    createSubtask(title: string, isCompleted: boolean = false) {
        const newSubtask: Subtask = {
            id: crypto.randomUUID(),
            title,
            isCompleted,
        };

        return newSubtask;
    }

    createInitialBoard(initialData: JsonObject) {
        return initialData.boards.map((board) =>
            this.createBoard(
                board.name,
                board.columns.map((column) =>
                    this.createColumn(
                        column.name,
                        column.tasks.map((task) =>
                            this.createTask(
                                task.title,
                                task.description,
                                task.status,
                                task.subtasks.map((subtask) =>
                                    this.createSubtask(
                                        subtask.title,
                                        subtask.isCompleted
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
}
