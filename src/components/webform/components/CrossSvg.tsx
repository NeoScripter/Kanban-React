import { cc } from "../../../utils/cc";

type CrossSvgProps = {
    showError: boolean;
};

export default function CrossSvg({ showError }: CrossSvgProps) {
    return (
        <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="12.7279"
                width="3"
                height="18"
                transform="rotate(45 12.7279 0)"
                fill={cc(showError ? '#EA5555' : '#828FA3')}
            />
            <rect
                y="2.12109"
                width="3"
                height="18"
                transform="rotate(-45 0 2.12109)"
                fill={cc(showError ? '#EA5555' : '#828FA3')}
            />
        </svg>
    );
}
