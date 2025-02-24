import { useState } from 'react';
import { useBoardContext } from '../../hooks/useBoardContext';
import { SelectMenu } from '../webform/SelectMenu';
import EllipsisBtn from '../EllipsisBtn';
import SubtaskItem from '../SubtaskItem';

/* type ShowTaskModalProps = {
    closeShowTaskModal: () => void;
}; */

/* type SelectColumnType = {
    id: string;
    columnIndex: number;
    columnName: string;
}; */

export default function ShowTaskModal() {
    const { getCurrentBoardColumns, getCurrentTaskData, currentTaskIndices} =
        useBoardContext();

    const taskData = getCurrentTaskData();

    const initialColumns = getCurrentBoardColumns();
    const columns = initialColumns.map((column, index) => {
        return {
            id: column.id,
            columnIndex: index,
            columnName: column.name,
        };
    });

    const [selectedColumn, setSelectedColumn] = useState(
        columns[currentTaskIndices?.columnIndex || 0]
    );

 /*    function handleChange(newColumn: SelectColumnType) {
        changeTaskColumn(newColumn.columnIndex);
        selectCurrentTask(initialColumns[newColumn.columnIndex].tasks.length - 1, newColumn.columnIndex)
    }
 */
    return (
        <div className="bg-white pop-in dark:bg-dark-gray rounded-lg p-6 sm:p-8 space-y-6 w-full xs:w-86 theme-transition sm:w-120">
            <div className="font-bold text-lg sm:text-xl text-dark-black dark:text-white theme-transition flex items-center justify-between gap-4 sm:gap-6">
                <div className="break-words text-balance">{taskData.title}</div>
                <EllipsisBtn />
            </div>

            {taskData.description && (
                <p className="w-full relative text-sm sm:text-base text-dark-black theme-transition dark:text-white">
                    {taskData.description}
                </p>
            )}

            <div>
                <p className="font-bold text-xs sm:text-sm mb-2 block dark:text-white theme-transition">
                    Subtasks (
                    {taskData.subtasks.reduce(
                        (acc, subtask) => (subtask.isCompleted ? acc + 1 : acc),
                        0
                    )}{' '}
                    of {taskData.subtasks.length})
                </p>
                <div className="grid gap-2">
                    {taskData.subtasks.map((subtask, index) => (
                        <SubtaskItem
                            key={subtask.id}
                            subtask={subtask}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="font-bold text-xs sm:text-sm mb-2 block dark:text-white theme-transition">
                    Current Status
                </p>
                <SelectMenu
                    items={columns}
                    selected={selectedColumn}
                    setSelected={setSelectedColumn}
                />
            </div>
        </div>
    );
}
