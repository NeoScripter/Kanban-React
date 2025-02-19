
import data from '../utils/data.json';
import { DashboardHanlder } from '../utils/DashboardHandler';
import { useState } from 'react';
import { Board, Column, Task } from '../types/taskTypes';

const boardHandler = new DashboardHanlder();

export default function Dashboard() {
    const [boards, setBoards] = useState<Board[]>(boardHandler.createInitialBoard(data));

    return (
        <div className="h-full grid grid-flow-col justify-start gap-6 p-6">
            
            {boards[0].columns.map(column => <Column column={column} />)}
        </div>
    );
}

type ColumnType = {
    column: Column;
}

function Column({ column }: ColumnType) {
    return (<div className='w-70'>
        <header className='mb-6'>{column.name}</header>
        <div className='space-y-6'>
            {column.tasks.map(task => <Task task={task} />)}
        </div>
    </div>)
}

type TaskProps = {
    task: Task
}


function Task({ task }: TaskProps) {
    return (<div className='bg-white rounded-lg shadow-md px-4 py-6'>
        <p className='mb-2 font-bold text-dark-black text-balance'>{task.title}</p>
        <p className='text-xs'>{task.subtasks.length} subtasks</p>
    </div>)
}