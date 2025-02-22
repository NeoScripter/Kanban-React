import ellipsis from '../assets/svgs/icon-vertical-ellipsis.svg';

type EllipsisBtnProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function EllipsisBtn({ onClick }: EllipsisBtnProps) {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer h-4 sm:h-5 shrink-0 relative after:absolute after:w-4 after:h-8 sm:after:w-6 sm:after:h-10 after:-translate-x-1/2 after:-translate-y-7/10 hover:after:bg-dark-white after:transition-colors after:duration-300 dark:hover:after:bg-light-black after:rounded-full after:-z-10 z-10"
        >
            <img
                src={ellipsis}
                alt="ellipsis"
                className="object-cover object-center h-full w-full"
            />
        </button>
    );
}
