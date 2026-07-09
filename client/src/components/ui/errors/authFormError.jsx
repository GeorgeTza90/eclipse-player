import { useStylesError } from "../../../hooks/useStylesError";

const AuthFormError = ({message}) => {
    const { errorText } = useStylesError();

    return(
        <p style={errorText}>
            {message}
        </p>
    );
}

export default AuthFormError;