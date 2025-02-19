type Subtask = {
    id: string;
    title: string;
    isCompleted: boolean;
};

type Task = {
    id: string;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
};

type Column = {
    id: string;
    name: string;
    tasks: Task[];
};

type RawColumn = Omit<Column, 'tasks'>;

type Board = {
    id: string;
    name: string;
    columns: Column[];
};

class DashboardHanlder {
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
            columns: [...unchangedColumns, ...newColumns]
        };

        return [
            ...boards.slice(0, boardIndex),
            updatedBoard,
            ...boards.slice(boardIndex + 1)
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

    deleteBoard(boards: Board[], id: string) {
        return boards.filter((board) => board.id !== id);
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
            columns
        };

        return newBoard;
    }

    createColumn(name: string, tasks: Task[] = []) {
        const newColumn: Column = {
            id: crypto.randomUUID(),
            name,
            tasks
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
            subtasks
        };

        return newTask;
    }

    createSubtask(title: string, isCompleted: boolean = false) {
        const newSubtask: Subtask = {
            id: crypto.randomUUID(),
            title,
            isCompleted
        };

        return newSubtask;
    }
}
