import { AnimateWrapper } from '../../providers/AnimateWrapper';
import { useModalContext } from '../../hooks/useModalContext';

type TaskDialogProps = {
    showModal: boolean;
    closeModal: () => void;
};

export default function TaskDialog({ showModal, closeModal }: TaskDialogProps) {
    const { openDeleteTaskModal, openEditTaskModal } = useModalContext();

    return (
        <>
            <AnimateWrapper
                isVisible={showModal}
                isAbove={false}
                classes="absolute z-20 right-0 sm:translate-x-1/2 top-10"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="shadow-md w-40 z-20 rounded-xl overflow-clip p-2 bg-white dark:bg-light-black font-normal"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openEditTaskModal();
                            closeModal();
                        }}
                        className="text-sm p-2 w-full text-start cursor-pointer text-dark-blue transition-colors duration-300 hover:bg-dark-blue/10 rounded-md dark:hover:bg-dark-blue/30"
                    >
                        Edit Task
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openDeleteTaskModal();
                        }}
                        className="text-dark-red text-sm p-2 w-full text-start cursor-pointer transition-colors duration-300 hover:bg-dark-blue/10 rounded-md dark:hover:bg-dark-blue/30"
                    >
                        Delete Task
                    </button>
                </div>
            </AnimateWrapper>
        </>
    );
}
