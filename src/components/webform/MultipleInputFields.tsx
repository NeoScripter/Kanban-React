import { ChangeEvent } from 'react';
import type { RawColumn } from '../../utils/DashboardHandler';
import { cc } from '../../utils/cc';
import FormError from '../FormError';
import { Subtask } from '../../types/taskTypes';
import CrossSvg from './components/CrossSvg';

type InputItem = RawColumn | Subtask;

type MultipleInputFieldsProps<T extends InputItem> = {
    inputArray: T[];
    setInputArray: React.Dispatch<React.SetStateAction<T[]>>;
    label: string;
    placeholders: string[];
    isSubmitted: boolean;
    resetError: () => void;
    btnLabel: string;
};

export default function MultipleInputFields<T extends InputItem>({
    inputArray,
    setInputArray,
    label,
    placeholders,
    isSubmitted,
    resetError,
    btnLabel,
}: MultipleInputFieldsProps<T>) {
    function addColumn() {
        const newColumn = {
            id: crypto.randomUUID(),
            ...(inputArray.length > 0 && 'name' in inputArray[0]
                ? { name: '' }
                : { title: '', isCompleted: false }),
        } as T;
        setInputArray((a) => [...a, newColumn]);
    }

    function isRawColumn(item: InputItem): item is RawColumn {
        return (item as RawColumn).name !== undefined;
    }

    function updateColumn(e: ChangeEvent<HTMLInputElement>, index: number) {
        const target = e.target as HTMLInputElement;
        if (target == null) return;

        resetError();

        setInputArray((a) =>
            a.map((item, i) =>
                i === index
                    ? isRawColumn(item)
                        ? { ...item, name: target.value }
                        : { ...item, title: target.value }
                    : item
            )
        );
    }

    function deleteColumn(index: number) {
        setInputArray((a) => a.filter((_, i) => i !== index));
    }

    return (
        <div>
            <p className="font-bold text-xs mb-2 sm:text-sm block dark:text-white theme-transition">
                {label}
            </p>
            <div className="space-y-2 sm:space-y-4 mb-4">
                {inputArray.map((input, index) => (
                    <SingleField
                        key={input.id}
                        index={index}
                        input={'name' in input ? input.name : input.title}
                        placeholder={placeholders[index] ?? ''}
                        updateColumn={updateColumn}
                        deleteColumn={() => deleteColumn(index)}
                        isSubmitted={isSubmitted}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    addColumn();
                }}
                className="btn-secondary bg-light-blue text-sm sm:text-base hover:bg-light-violet/35 text-dark-violet"
            >
                {btnLabel}
            </button>
        </div>
    );
}

type SingleFieldProps = {
    index: number;
    input: string;
    placeholder: string;
    updateColumn: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    deleteColumn: () => void;
    isSubmitted: boolean;
};

function SingleField({
    index,
    input,
    placeholder,
    updateColumn,
    deleteColumn,
    isSubmitted,
}: SingleFieldProps) {
    const showError = isSubmitted && input === '';

    return (
        <div className="flex items-center gap-1 relative">
            <input
                type="text"
                className={cc(
                    'border w-full text-dark-black sm:text-base theme-transition dark:text-white p-2 sm:p-3 text-sm rounded-md',
                    showError ? 'border-dark-red' : 'border-gray-300'
                )}
                placeholder={placeholder}
                value={input}
                onChange={(e) => updateColumn(e, index)}
            />

            {showError && (
                <FormError classes="right-16" message="Can't be empty" />
            )}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    deleteColumn();
                }}
                className="cursor-pointer h-full aspect-square p-2.5"
            >
                <CrossSvg showError={showError} />
            </button>
        </div>
    );
}
