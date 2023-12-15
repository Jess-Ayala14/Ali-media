/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Analytics } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AnalyticsUpdateFormInputValues = {
    rate_weekFB?: string;
    rate_monthFB?: string;
    rate_weekIns?: string;
    rate_monthIns?: string;
    date_generated?: string;
};
export declare type AnalyticsUpdateFormValidationValues = {
    rate_weekFB?: ValidationFunction<string>;
    rate_monthFB?: ValidationFunction<string>;
    rate_weekIns?: ValidationFunction<string>;
    rate_monthIns?: ValidationFunction<string>;
    date_generated?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnalyticsUpdateFormOverridesProps = {
    AnalyticsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    rate_weekFB?: PrimitiveOverrideProps<TextFieldProps>;
    rate_monthFB?: PrimitiveOverrideProps<TextFieldProps>;
    rate_weekIns?: PrimitiveOverrideProps<TextFieldProps>;
    rate_monthIns?: PrimitiveOverrideProps<TextFieldProps>;
    date_generated?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnalyticsUpdateFormProps = React.PropsWithChildren<{
    overrides?: AnalyticsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    analytics?: Analytics;
    onSubmit?: (fields: AnalyticsUpdateFormInputValues) => AnalyticsUpdateFormInputValues;
    onSuccess?: (fields: AnalyticsUpdateFormInputValues) => void;
    onError?: (fields: AnalyticsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnalyticsUpdateFormInputValues) => AnalyticsUpdateFormInputValues;
    onValidate?: AnalyticsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AnalyticsUpdateForm(props: AnalyticsUpdateFormProps): React.ReactElement;
