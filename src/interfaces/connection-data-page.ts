export interface IConnectionDataPage {
    performInsertionConnectionData(data: {
        host: string;
        port: string;
        user: string;
        password: string;
        origin: string;
        destination: string;
    }): Promise<void>;

    validateRequiredFields(data: {
        host: string;
        port: string;
        user: string;
        password: string;
        origin: string;
        destination: string;
    }): Promise<void>;
}