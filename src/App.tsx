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
import EditTaskModal from './components/modals/EditTaskModal';
import { ToastContainer } from 'react-toastify';
import { useThemeContext } from './hooks/useThemeContext';

function App() {
    const { showSidebar, toggleSidebar } = useSidebarContext();

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

            <AppModals />
        </>
    );
}

export default App;

function AppModals() {
    const {
        showAddTaskModal,
        closeAddTaskModal,
        showEditBoardModal,
        closeEditBoardModal,
        closeDeleteBoardModal,
        handleDeleteBoardModalClick,
        showDeleteBoardModal,
        closeDeleteTaskModal,
        showDeleteTaskModal,
        handleDeleteTaskModalClick,
        closeEditTaskModal,
        showEditTaskModal,
    } = useModalContext();

    const { theme } = useThemeContext();

    const { getCurrentBoardName, getCurrentTaskData } = useBoardContext();
    return (
        <>
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

            <ModalOverlay
                key="DeleteBoardTaskOverlay"
                showModal={showDeleteTaskModal}
                closeModal={closeDeleteTaskModal}
            >
                <DeleteModal
                    isTask={true}
                    deleteClick={handleDeleteTaskModalClick}
                    name={getCurrentTaskData().title}
                />
            </ModalOverlay>

            <ModalOverlay
                key="EditTaskModalOverlay"
                showModal={showEditTaskModal}
                closeModal={closeEditTaskModal}
            >
                <EditTaskModal closeEditTaskModal={closeEditTaskModal} />
            </ModalOverlay>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
        </>
    );
}
