/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Multiposts } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MultipostsUpdateFormInputValues = {
    title?: string;
    fb_id?: string;
    inst_id?: string;
    twit_id?: string;
};
export declare type MultipostsUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    fb_id?: ValidationFunction<string>;
    inst_id?: ValidationFunction<string>;
    twit_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MultipostsUpdateFormOverridesProps = {
    MultipostsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    fb_id?: PrimitiveOverrideProps<TextFieldProps>;
    inst_id?: PrimitiveOverrideProps<TextFieldProps>;
    twit_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MultipostsUpdateFormProps = React.PropsWithChildren<{
    overrides?: MultipostsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    multiposts?: Multiposts;
    onSubmit?: (fields: MultipostsUpdateFormInputValues) => MultipostsUpdateFormInputValues;
    onSuccess?: (fields: MultipostsUpdateFormInputValues) => void;
    onError?: (fields: MultipostsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MultipostsUpdateFormInputValues) => MultipostsUpdateFormInputValues;
    onValidate?: MultipostsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MultipostsUpdateForm(props: MultipostsUpdateFormProps): React.ReactElement;
