export interface IConfigurationDataPage {
    performInsertionConfigurationData(data: {
        radioSelectorValue: string;
        buttonSelectorValue: string;
        regexValue: string;
    }): Promise<void>;

    performLengthValidation(data: {
        regexValue: string;
    }): Promise<void>;

    performRequireFieldValidation(data: {
        regexValue: string;
    }): Promise<void>;
}