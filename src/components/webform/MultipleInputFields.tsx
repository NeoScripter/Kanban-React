import { ChangeEvent } from 'react';

type MultipleInputFieldsProps = {
    inputArray: string[],
    setInputArray: React.Dispatch<React.SetStateAction<string[]>>,
    label: string,
}

export default function MultipleInputFields({ inputArray, setInputArray, label }: MultipleInputFieldsProps) {

    function addColumn() {
        setInputArray((a) => [...a, '']);
    }

    function updateColumn(e: ChangeEvent, index: number) {
        const target = e.target as HTMLInputElement;
        if (target == null) return;

        setInputArray((a) => {
            return [...a.slice(0, index), target.value, ...a.slice(index + 1)];
        });
    }

    function deleteColumn(index: number) {
        setInputArray((a) => [
            ...a.slice(0, index),
            ...a.slice(index + 1, a.length),
        ]);
    }

    return (
        <div>
            <p className="font-bold text-xs mb-2 sm:text-sm block dark:text-white theme-transition">
                {label}
            </p>
            <div className="space-y-2 sm:space-y-4 mb-4">
                {inputArray.map((input, index) => (
                    <SingleField
                        key={'multiple' + index}
                        index={index}
                        input={input}
                        updateColumn={updateColumn}
                        deleteColumn={() => deleteColumn(index)}
                    />
                ))}
            </div>

            <button
                type='button'
                onClick={addColumn}
                className="btn-secondary bg-light-blue text-sm sm:text-base hover:bg-light-violet/35 text-dark-violet"
            >
                + Add New Column
            </button>
        </div>
    );
}

type SingleFieldProps = {
    index: number;
    input: string;
    updateColumn: (e: ChangeEvent, index: number) => void;
    deleteColumn: () => void;
};

function SingleField({
    index,
    input,
    updateColumn,
    deleteColumn,
}: SingleFieldProps) {
    return (
        <div className="flex items-center gap-1">
            <input
                type="text"
                className="border w-full border-gray-300 text-dark-black sm:text-base theme-transition dark:text-white p-2 sm:p-3 text-sm rounded-md"
                value={input}
                onChange={(e) => updateColumn(e, index)}
            />
            <button
                onClick={deleteColumn}
                className="cursor-pointer h-full aspect-square p-2.5"
            >
                <svg
                    className='w-4 h-4 sm:w-5 sm:h-5'
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="12.7279"
                        width="3"
                        height="18"
                        transform="rotate(45 12.7279 0)"
                        fill="#828FA3"
                    />
                    <rect
                        y="2.12109"
                        width="3"
                        height="18"
                        transform="rotate(-45 0 2.12109)"
                        fill="#828FA3"
                    />
                </svg>
            </button>
        </div>
    );
}
