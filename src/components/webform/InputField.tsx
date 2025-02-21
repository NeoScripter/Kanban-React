import { useId } from 'react';
import { cc } from '../../utils/cc';
import FormError from '../FormError';

type InputFieldProps = {
    label: string;
    setter: (value: string) => void;
    input: string;
    isSubmitted: boolean;
    resetError: () => void;
};

export default function InputField({
    label,
    setter,
    input,
    isSubmitted,
    resetError,
}: InputFieldProps) {
    const fieldId = useId();

    const showError = isSubmitted && input === '';

    return (
        <div>
            <label
                htmlFor={fieldId}
                className="font-bold text-xs sm:text-sm mb-2 block dark:text-white theme-transition"
            >
                {label}
            </label>

            <div className="relative">
                {showError && <FormError message="Can't be empty" classes='right-6' />}
                <input
                    type="text"
                    id={fieldId}
                    value={input}
                    placeholder="e.g. Web Design"
                    className={cc(
                        'border w-full relative p-2 sm:p-3 text-sm sm:text-base rounded-md text-dark-black theme-transition dark:text-white',
                        showError ? 'border-dark-red' : 'border-gray-300'
                    )}
                    onChange={(e) => {
                        setter(e.target.value);
                        resetError();
                    }}
                />
            </div>
        </div>
    );
}
