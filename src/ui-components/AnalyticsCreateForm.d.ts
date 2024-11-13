/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AnalyticsCreateFormInputValues = {
    rate_weekFB?: string;
    rate_monthFB?: string;
    rate_weekIns?: string;
    rate_monthIns?: string;
    date_generated?: string;
};
export declare type AnalyticsCreateFormValidationValues = {
    rate_weekFB?: ValidationFunction<string>;
    rate_monthFB?: ValidationFunction<string>;
    rate_weekIns?: ValidationFunction<string>;
    rate_monthIns?: ValidationFunction<string>;
    date_generated?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnalyticsCreateFormOverridesProps = {
    AnalyticsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    rate_weekFB?: PrimitiveOverrideProps<TextFieldProps>;
    rate_monthFB?: PrimitiveOverrideProps<TextFieldProps>;
    rate_weekIns?: PrimitiveOverrideProps<TextFieldProps>;
    rate_monthIns?: PrimitiveOverrideProps<TextFieldProps>;
    date_generated?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnalyticsCreateFormProps = React.PropsWithChildren<{
    overrides?: AnalyticsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AnalyticsCreateFormInputValues) => AnalyticsCreateFormInputValues;
    onSuccess?: (fields: AnalyticsCreateFormInputValues) => void;
    onError?: (fields: AnalyticsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnalyticsCreateFormInputValues) => AnalyticsCreateFormInputValues;
    onValidate?: AnalyticsCreateFormValidationValues;
} & React.CSSProperties>;
export default function AnalyticsCreateForm(props: AnalyticsCreateFormProps): React.ReactElement;
