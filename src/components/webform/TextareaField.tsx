import { useId } from 'react';

type TextareaFieldProps = {
    label: string;
    placeholder: string;
    setter: (value: string) => void;
    input: string;
};

export default function TextareaField({
    label,
    placeholder,
    setter,
    input,
}: TextareaFieldProps) {
    const fieldId = useId();

    return (
        <div>
            <label
                htmlFor={fieldId}
                className="font-bold text-xs sm:text-sm mb-2 block dark:text-white theme-transition"
            >
                {label}
            </label>

            <div className="relative">
                <textarea
                rows={4}
                    id={fieldId}
                    value={input}
                    placeholder={placeholder}
                    className="border w-full relative p-2 sm:p-3 text-sm sm:text-base rounded-md text-dark-black theme-transition dark:text-white border-gray-300"
                    onChange={(e) => {
                        setter(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
