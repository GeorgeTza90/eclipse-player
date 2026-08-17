import { useStylesError } from "@/hooks/useStylesError";
import type { AuthFormErrorProps } from "@/types/error.types";

const AuthFormError = ({ message }: AuthFormErrorProps) => {
    const { errorText } = useStylesError();

    return (
        <p style={errorText}>
            {message}
        </p>
    );
};

export default AuthFormError;