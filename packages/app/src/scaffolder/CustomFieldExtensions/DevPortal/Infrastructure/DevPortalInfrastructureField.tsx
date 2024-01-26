import React, { useCallback, useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { FieldProps, FieldValidation } from '@rjsf/utils';
import axios from 'axios';
import { TextField } from '@material-ui/core';

const listOfAllowedValues: string[] = [];
export const DevPortalInfrastructureField = ({
  onChange,
  rawErrors,
  required,
  formData,
}: FieldProps<string>) => {
  const [infrastructureList, setInfrastructureList] = useState<any[]>([]);
  const [infraValue, setInfraValue] = useState<any>(
    formData ? formData : undefined,
  );

  const fetchInfrastructureData = useCallback(async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8000/getInfrastructure',
      withCredentials: false,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const comboBoxObj: any[] = [];
    response.data.forEach((item: any, index: number) => {
      const val = {
        label: item.name,
        id: item.id,
        key: item.id + index,
        snowId: item.snowId,
      };
      comboBoxObj.push(val);
      if (formData && formData.id === item.id) {
        setInfraValue(val);
      }
      listOfAllowedValues.push(item.id);
    });
    setInfrastructureList(comboBoxObj);
  }, []);

  const valueChange = useCallback((_, value) => {
    onChange(value);
  }, []);

  useEffect(() => {
    fetchInfrastructureData();
  }, [formData]);
  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors && rawErrors?.length > 0 && !formData}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={infrastructureList}
        renderInput={params => <TextField {...params} label="Infrastructure" />}
        onChange={valueChange}
        value={infraValue}
      />
    </FormControl>
  );
};

/*
 This is a validation function that will run when the form is submitted.
  You will get the value from the `onChange` handler before as the value here to make sure that the types are aligned\
*/

export const validateDevPortalInfrastructureFieldValidation = (
  value: any,
  validation: FieldValidation,
) => {
  if (value === '' || !value) {
    validation.addError(`An owner has to be specified.`);
  }
  if (listOfAllowedValues.indexOf(value.id) < 0) {
    validation.addError(`Please choose from the available Projects`);
  }
};
