import currentBoard from '../assets/svgs/current-board.svg';
import inactiveBoard from '../assets/svgs/board.svg';
import createBoard from '../assets/svgs/create-board.svg';

import { BOARD_STATUS } from '../consts/boardStatus';
import { cc } from '../utils/cc';

type BoardListProps = {
    status: string;
    content?: string;
    isButton?: boolean;
    onClick: () => void;
};
export default function BoardList({
    status,
    content,
    isButton = false,
    onClick
}: BoardListProps) {
    if (isButton) {
        return (
            <button onClick={onClick} className="flex cursor-pointer items-center font-semibold pl-6 py-4 mr-6 sm:w-11/12 md:w-10/12 gap-3 tracking-wide rounded-r-full text-dark-violet transition-colors duration-300 ease-in-out hover:bg-dark-white">
                <img src={createBoard} alt="" className="w-4 h-4" />
                <span>+ Create New Board</span>
            </button>
        );
    }
    let image;
    let classes = '';
    if (status === BOARD_STATUS.CURRENT) {
        image = currentBoard;
        classes = 'bg-dark-violet text-white';
    } else if (status === BOARD_STATUS.INACTIVE) {
        image = inactiveBoard;
        classes = 'hover:bg-dark-white dark:hover:bg-dark-white cursor-pointer';
    }
    return (
        <button
            onClick={onClick}
            className={cc(
                'flex items-center font-semibold pl-6 py-4 mr-6 sm:w-11/12 md:w-10/12 gap-3 cursor-pointer tracking-wide rounded-r-full transition-colors duration-300 ease-in-out',
                classes
            )}
        >
            <img src={image} alt="" className="w-4 h-4" />
            <span>{content}</span>
        </button>
    );
}
