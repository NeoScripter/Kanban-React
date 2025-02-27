import { RefObject } from 'react';
import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useModalContext } from '../../hooks/useModalContext';

type BoardDialogProps = {
    showModal: boolean;
    closeModal: () => void;
    ref: RefObject<HTMLDivElement | null>;
};

export default function BoardDialog({
    ref,
    showModal,
    closeModal,
}: BoardDialogProps) {
    const { openEditBoardModal, openDeleteBoardModal } = useModalContext();

    return (
        <>
            <AnimateWrapper
                isVisible={showModal}
                isAbove={false}
                classes="absolute z-20 right-5 top-22"
            >
                <div
                    ref={ref}
                    className="shadow-md w-40 z-20 rounded-xl p-2 bg-white dark:bg-light-black"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openEditBoardModal();
                            closeModal();
                        }}
                        className=" text-sm p-2 w-full text-start cursor-pointer transition-colors duration-300 hover:bg-dark-blue/10 rounded-md dark:hover:bg-dark-blue/30"
                    >
                        Edit Board
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openDeleteBoardModal();
                        }}
                        className="text-dark-red text-sm p-2 w-full text-start cursor-pointer transition-colors duration-300 hover:bg-dark-blue/10 rounded-md dark:hover:bg-dark-blue/30"
                    >
                        Delete Board
                    </button>
                </div>
            </AnimateWrapper>
        </>
    );
}
