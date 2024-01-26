import React, { useCallback, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { FieldValidation } from '@rjsf/utils';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';

export const CheckboxField = ({
  onChange,
  rawErrors,
  required,
  formData,
  uiSchema,
}: FieldExtensionComponentProps<string>) => {
  const valueObj = Object.assign(
    {},
    ...uiSchema['ui:items'].values.map((key: any) => ({ [key]: false })),
  );
  const [value, setValue] = useState(formData ? formData : valueObj);
  const handleCheckBoxValueChange = useCallback(
    event => {
      const newValue = { ...value, [event.target.value]: event.target.checked };
      setValue(newValue);
      onChange(newValue);
    },
    [uiSchema, formData],
  );
  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors && rawErrors?.length > 0 && !formData}
    >
      <FormGroup onChange={handleCheckBoxValueChange}>
        <Box>
          {uiSchema['ui:items'].values.map((lang: string) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox value={lang} key={lang} checked={value[lang]} />
                }
                label={lang}
                key={lang}
              />
            );
          })}
        </Box>
      </FormGroup>
    </FormControl>
  );
};

/*
 This is a validation function that will run when the form is submitted.
  You will get the value from the `onChange` handler before as the value here to make sure that the types are aligned\
*/

export const validateCheckboxFieldValidation = (
  value: any,
  validation: FieldValidation,
) => {
  if (!value) {
    validation.addError(`An owner has to be specified.`);
  }
};
