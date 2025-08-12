export interface ServerResponseWithMessage<T = unknown> {
    message: string;
    data?: T;
}
