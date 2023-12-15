/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MultipostsCreateFormInputValues = {
    title?: string;
    fb_id?: string;
    inst_id?: string;
    twit_id?: string;
};
export declare type MultipostsCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    fb_id?: ValidationFunction<string>;
    inst_id?: ValidationFunction<string>;
    twit_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MultipostsCreateFormOverridesProps = {
    MultipostsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    fb_id?: PrimitiveOverrideProps<TextFieldProps>;
    inst_id?: PrimitiveOverrideProps<TextFieldProps>;
    twit_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MultipostsCreateFormProps = React.PropsWithChildren<{
    overrides?: MultipostsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MultipostsCreateFormInputValues) => MultipostsCreateFormInputValues;
    onSuccess?: (fields: MultipostsCreateFormInputValues) => void;
    onError?: (fields: MultipostsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MultipostsCreateFormInputValues) => MultipostsCreateFormInputValues;
    onValidate?: MultipostsCreateFormValidationValues;
} & React.CSSProperties>;
export default function MultipostsCreateForm(props: MultipostsCreateFormProps): React.ReactElement;
