import showSideBar from '../assets/svgs/icon-show-sidebar.svg';

type ShowSidebarButtonProps = {
    toggleSidebar: () => void,
}

export default function ShowSidebarButton({ toggleSidebar }: ShowSidebarButtonProps) {
    return <button onClick={toggleSidebar} className='w-14 h-12 bg-dark-violet hidden sm:flex items-center justify-center cursor-pointer absolute left-0 transition-colors duration-300 ease-in-out hover:bg-light-violet rounded-r-full' style={{top: "min(40rem, 80vh)"}}>
        <img src={showSideBar} alt="white eye" />
    </button>
}