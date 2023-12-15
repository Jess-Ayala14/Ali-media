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
export declare type BusinessCreateFormInputValues = {
    name?: string;
    about?: string;
    phone?: string;
    address?: string;
    image?: string;
    website?: string;
};
export declare type BusinessCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    about?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    website?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BusinessCreateFormOverridesProps = {
    BusinessCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    about?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    website?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BusinessCreateFormProps = React.PropsWithChildren<{
    overrides?: BusinessCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BusinessCreateFormInputValues) => BusinessCreateFormInputValues;
    onSuccess?: (fields: BusinessCreateFormInputValues) => void;
    onError?: (fields: BusinessCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BusinessCreateFormInputValues) => BusinessCreateFormInputValues;
    onValidate?: BusinessCreateFormValidationValues;
} & React.CSSProperties>;
export default function BusinessCreateForm(props: BusinessCreateFormProps): React.ReactElement;
