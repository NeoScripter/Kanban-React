import showSideBar from '../assets/svgs/icon-show-sidebar.svg';

type ShowSidebarButtonProps = {
    toggleSidebar: () => void,
}

export default function ShowSidebarButton({ toggleSidebar }: ShowSidebarButtonProps) {
    return <button onClick={toggleSidebar} className='p-4 bg-dark-violet hidden sm:flex items-center justify-center cursor-pointer absolute top-130 left-0 transition-colors duration-300 ease-in-out hover:bg-light-violet rounded-r-full'>
        <img src={showSideBar} alt="white eye" />
    </button>
}