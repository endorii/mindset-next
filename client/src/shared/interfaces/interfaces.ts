export interface ServerResponseWithMessage<T = unknown> {
    message: string;
    data?: T;
}

export interface IconProps {
    className?: string;
}
