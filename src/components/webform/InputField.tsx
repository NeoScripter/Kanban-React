import { useId } from "react";

type InputFieldProps = {
    label: string,
    setter: (value: string) => void,
    input: string,
}

export default function InputField({ label, setter, input }: InputFieldProps) {
    const fieldId = useId();

    return (
        <div>
            <label
                htmlFor={fieldId}
                className="font-bold text-xs mb-2 block dark:text-white theme-transition"
            >
                {label}
            </label>
            <input
                type="text"
                id={fieldId}
                value={input}
                placeholder="e.g. Web Design"
                className="border w-full border-gray-300 p-2 sm:px-3 text-sm rounded-md text-dark-black theme-transition dark:text-white"
                onChange={(e) => setter(e.target.value)}
            />
        </div>
    );
}
