/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createMultiposts } from "../graphql/mutations";
export default function MultipostsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    fb_id: "",
    inst_id: "",
    twit_id: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [fb_id, setFb_id] = React.useState(initialValues.fb_id);
  const [inst_id, setInst_id] = React.useState(initialValues.inst_id);
  const [twit_id, setTwit_id] = React.useState(initialValues.twit_id);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setFb_id(initialValues.fb_id);
    setInst_id(initialValues.inst_id);
    setTwit_id(initialValues.twit_id);
    setErrors({});
  };
  const validations = {
    title: [],
    fb_id: [],
    inst_id: [],
    twit_id: [],
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
          title,
          fb_id,
          inst_id,
          twit_id,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createMultiposts.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MultipostsCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              fb_id,
              inst_id,
              twit_id,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Fb id"
        isRequired={false}
        isReadOnly={false}
        value={fb_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              fb_id: value,
              inst_id,
              twit_id,
            };
            const result = onChange(modelFields);
            value = result?.fb_id ?? value;
          }
          if (errors.fb_id?.hasError) {
            runValidationTasks("fb_id", value);
          }
          setFb_id(value);
        }}
        onBlur={() => runValidationTasks("fb_id", fb_id)}
        errorMessage={errors.fb_id?.errorMessage}
        hasError={errors.fb_id?.hasError}
        {...getOverrideProps(overrides, "fb_id")}
      ></TextField>
      <TextField
        label="Inst id"
        isRequired={false}
        isReadOnly={false}
        value={inst_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              fb_id,
              inst_id: value,
              twit_id,
            };
            const result = onChange(modelFields);
            value = result?.inst_id ?? value;
          }
          if (errors.inst_id?.hasError) {
            runValidationTasks("inst_id", value);
          }
          setInst_id(value);
        }}
        onBlur={() => runValidationTasks("inst_id", inst_id)}
        errorMessage={errors.inst_id?.errorMessage}
        hasError={errors.inst_id?.hasError}
        {...getOverrideProps(overrides, "inst_id")}
      ></TextField>
      <TextField
        label="Twit id"
        isRequired={false}
        isReadOnly={false}
        value={twit_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              fb_id,
              inst_id,
              twit_id: value,
            };
            const result = onChange(modelFields);
            value = result?.twit_id ?? value;
          }
          if (errors.twit_id?.hasError) {
            runValidationTasks("twit_id", value);
          }
          setTwit_id(value);
        }}
        onBlur={() => runValidationTasks("twit_id", twit_id)}
        errorMessage={errors.twit_id?.errorMessage}
        hasError={errors.twit_id?.hasError}
        {...getOverrideProps(overrides, "twit_id")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
