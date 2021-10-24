import Error from './Error';

export type ErrorProps = {
    statusCode?: number;
    title: string;
    message: string;
    buttonText: string;
}

export default Error;