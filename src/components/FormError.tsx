import { cc } from "../utils/cc";

type FormErrorProps = {
    message: string;
    classes: string;
};
export default function FormError({ message, classes }: FormErrorProps) {
    return (
        <span className={cc('absolute text-red-500 top-1/2 -translate-y-1/2 text-sm', classes)}>
            {message}
        </span>
    );
}
