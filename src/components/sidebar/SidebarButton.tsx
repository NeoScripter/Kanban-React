
import { BOARD_STATUS } from '../../consts/boardStatus';
import { cc } from '../../utils/cc';

type SidebarButtonProps = {
    status: string;
    content?: string;
    isButton?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function SidebarButton({
    status,
    content,
    onClick
}: SidebarButtonProps) {
    let imageClasses;
    let classes = '';
    if (status === BOARD_STATUS.CURRENT) {
        imageClasses = 'fill-[#FFF]';
        classes = 'bg-dark-violet text-white';
    } else if (status === BOARD_STATUS.INACTIVE) {
        imageClasses = 'group-hover:fill-dark-violet';
        classes =
            'hover:bg-dark-white dark:hover:bg-dark-white dark:hover:text-dark-violet';
    } else {
        imageClasses = 'fill-dark-violet';
        classes =
            'text-dark-violet hover:bg-dark-white dark:hover:bg-dark-white';
    }
    return (
        <button
            onClick={onClick}
            className={cc(
                'flex group items-center font-semibold pl-6 py-4 mr-6 w-11/12 md:w-10/12 gap-3 cursor-pointer tracking-wide rounded-r-full transition-colors duration-300 ease-in-out',
                classes
            )}
        >
            <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className={cc(imageClasses, 'w-4 h-4')}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                    fill="#828FA3"
                />
            </svg>
            <span>{content}</span>
        </button>
    );
}
