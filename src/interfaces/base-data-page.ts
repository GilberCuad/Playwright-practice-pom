export interface IBasicDataPage {
    performInsertionBasicData(data: {
        nameValue: string;
        type: string;
        descriptionValue: string;
    }): Promise<void>;

    performFieldRequire(data: { nameValue: string }): Promise<void>;

    lengthField(data: {
        nameValue: string;
        descriptionValue: string;
    }): Promise<void>;

    performValidationReturnButton(data: {
        nameValue: string;
        descriptionValue: string;
        type: string;
    }): Promise<void>;
}