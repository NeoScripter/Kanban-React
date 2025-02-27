import Header from './components/Header';
import Sidebar from './components/sidebar/Sidebar';
import ShowSidebarButton from './components/sidebar/ShowSidebarButton';
import { AnimateWrapper } from './providers/AnimateWrapper';
import Dashboard from './components/Dashboard';
import { sidebarBtnAnimationOptions } from './consts/sidebarBtnAnimationOptions';
import { useSidebarContext } from './hooks/useSidebarContext';
import ModalOverlay from './components/modals/ModalOverlay';
import { useModalContext } from './hooks/useModalContext';
import AddTaskModal from './components/modals/AddTaskModal';
import EditBoardModal from './components/modals/EditBoardModal';
import { DeleteModal } from './components/modals/DeleteModal';
import { useBoardContext } from './hooks/useBoardContext';

function App() {
    const { showSidebar, toggleSidebar } = useSidebarContext();
    const {
        showAddTaskModal,
        closeAddTaskModal,
        showEditBoardModal,
        closeEditBoardModal,
        closeDeleteBoardModal,
        handleDeleteBoardModalClick,
        showDeleteBoardModal,
    } = useModalContext();

    const { getCurrentBoardName } = useBoardContext();

    return (
        <>
            <div className="relative">
                <Header />

                <Sidebar />

                <AnimateWrapper
                    isVisible={!showSidebar}
                    options={sidebarBtnAnimationOptions}
                >
                    <ShowSidebarButton toggleSidebar={toggleSidebar} />
                </AnimateWrapper>

                <main className="overflow-x-auto min-h-screen scrollbar-hidden">
                    <Dashboard />
                </main>
            </div>

            <ModalOverlay
                key="AddTaskModalOverlay"
                showModal={showAddTaskModal}
                closeModal={closeAddTaskModal}
            >
                <AddTaskModal closeAddTaskModal={closeAddTaskModal} />
            </ModalOverlay>

            <ModalOverlay
                key="EditBoardModalOverlay"
                showModal={showEditBoardModal}
                closeModal={closeEditBoardModal}
            >
                <EditBoardModal closeEditBoardModal={closeEditBoardModal} />
            </ModalOverlay>

            <ModalOverlay
                key="DeleteBoardModalOverlay"
                showModal={showDeleteBoardModal}
                closeModal={closeDeleteBoardModal}
            >
                <DeleteModal
                    deleteClick={handleDeleteBoardModalClick}
                    name={getCurrentBoardName()}
                />
            </ModalOverlay>
        </>
    );
}

export default App;
