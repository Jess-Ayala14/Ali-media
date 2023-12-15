/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Analytics } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function AnalyticsUpdateForm(props) {
  const {
    id: idProp,
    analytics: analyticsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    rate_weekFB: "",
    rate_monthFB: "",
    rate_weekIns: "",
    rate_monthIns: "",
    date_generated: "",
  };
  const [rate_weekFB, setRate_weekFB] = React.useState(
    initialValues.rate_weekFB
  );
  const [rate_monthFB, setRate_monthFB] = React.useState(
    initialValues.rate_monthFB
  );
  const [rate_weekIns, setRate_weekIns] = React.useState(
    initialValues.rate_weekIns
  );
  const [rate_monthIns, setRate_monthIns] = React.useState(
    initialValues.rate_monthIns
  );
  const [date_generated, setDate_generated] = React.useState(
    initialValues.date_generated
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = analyticsRecord
      ? { ...initialValues, ...analyticsRecord }
      : initialValues;
    setRate_weekFB(cleanValues.rate_weekFB);
    setRate_monthFB(cleanValues.rate_monthFB);
    setRate_weekIns(cleanValues.rate_weekIns);
    setRate_monthIns(cleanValues.rate_monthIns);
    setDate_generated(cleanValues.date_generated);
    setErrors({});
  };
  const [analyticsRecord, setAnalyticsRecord] =
    React.useState(analyticsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Analytics, idProp)
        : analyticsModelProp;
      setAnalyticsRecord(record);
    };
    queryData();
  }, [idProp, analyticsModelProp]);
  React.useEffect(resetStateValues, [analyticsRecord]);
  const validations = {
    rate_weekFB: [],
    rate_monthFB: [],
    rate_weekIns: [],
    rate_monthIns: [],
    date_generated: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          rate_weekFB,
          rate_monthFB,
          rate_weekIns,
          rate_monthIns,
          date_generated,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Analytics.copyOf(analyticsRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "AnalyticsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Rate week fb"
        isRequired={false}
        isReadOnly={false}
        value={rate_weekFB}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rate_weekFB: value,
              rate_monthFB,
              rate_weekIns,
              rate_monthIns,
              date_generated,
            };
            const result = onChange(modelFields);
            value = result?.rate_weekFB ?? value;
          }
          if (errors.rate_weekFB?.hasError) {
            runValidationTasks("rate_weekFB", value);
          }
          setRate_weekFB(value);
        }}
        onBlur={() => runValidationTasks("rate_weekFB", rate_weekFB)}
        errorMessage={errors.rate_weekFB?.errorMessage}
        hasError={errors.rate_weekFB?.hasError}
        {...getOverrideProps(overrides, "rate_weekFB")}
      ></TextField>
      <TextField
        label="Rate month fb"
        isRequired={false}
        isReadOnly={false}
        value={rate_monthFB}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rate_weekFB,
              rate_monthFB: value,
              rate_weekIns,
              rate_monthIns,
              date_generated,
            };
            const result = onChange(modelFields);
            value = result?.rate_monthFB ?? value;
          }
          if (errors.rate_monthFB?.hasError) {
            runValidationTasks("rate_monthFB", value);
          }
          setRate_monthFB(value);
        }}
        onBlur={() => runValidationTasks("rate_monthFB", rate_monthFB)}
        errorMessage={errors.rate_monthFB?.errorMessage}
        hasError={errors.rate_monthFB?.hasError}
        {...getOverrideProps(overrides, "rate_monthFB")}
      ></TextField>
      <TextField
        label="Rate week ins"
        isRequired={false}
        isReadOnly={false}
        value={rate_weekIns}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rate_weekFB,
              rate_monthFB,
              rate_weekIns: value,
              rate_monthIns,
              date_generated,
            };
            const result = onChange(modelFields);
            value = result?.rate_weekIns ?? value;
          }
          if (errors.rate_weekIns?.hasError) {
            runValidationTasks("rate_weekIns", value);
          }
          setRate_weekIns(value);
        }}
        onBlur={() => runValidationTasks("rate_weekIns", rate_weekIns)}
        errorMessage={errors.rate_weekIns?.errorMessage}
        hasError={errors.rate_weekIns?.hasError}
        {...getOverrideProps(overrides, "rate_weekIns")}
      ></TextField>
      <TextField
        label="Rate month ins"
        isRequired={false}
        isReadOnly={false}
        value={rate_monthIns}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rate_weekFB,
              rate_monthFB,
              rate_weekIns,
              rate_monthIns: value,
              date_generated,
            };
            const result = onChange(modelFields);
            value = result?.rate_monthIns ?? value;
          }
          if (errors.rate_monthIns?.hasError) {
            runValidationTasks("rate_monthIns", value);
          }
          setRate_monthIns(value);
        }}
        onBlur={() => runValidationTasks("rate_monthIns", rate_monthIns)}
        errorMessage={errors.rate_monthIns?.errorMessage}
        hasError={errors.rate_monthIns?.hasError}
        {...getOverrideProps(overrides, "rate_monthIns")}
      ></TextField>
      <TextField
        label="Date generated"
        isRequired={false}
        isReadOnly={false}
        value={date_generated}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rate_weekFB,
              rate_monthFB,
              rate_weekIns,
              rate_monthIns,
              date_generated: value,
            };
            const result = onChange(modelFields);
            value = result?.date_generated ?? value;
          }
          if (errors.date_generated?.hasError) {
            runValidationTasks("date_generated", value);
          }
          setDate_generated(value);
        }}
        onBlur={() => runValidationTasks("date_generated", date_generated)}
        errorMessage={errors.date_generated?.errorMessage}
        hasError={errors.date_generated?.hasError}
        {...getOverrideProps(overrides, "date_generated")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || analyticsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || analyticsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
