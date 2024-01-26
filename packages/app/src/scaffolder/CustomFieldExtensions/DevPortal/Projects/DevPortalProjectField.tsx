import React, { useCallback, useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { FieldProps, FieldValidation } from '@rjsf/utils';
import axios from 'axios';
import { TextField } from '@material-ui/core';

const listOfAllowedValues: string[] = [];
export const DevPortalProjectField = ({
  onChange,
  rawErrors,
  required,
  formData,
}: FieldProps<string>) => {
  const [projectList, setProjectList] = useState<any[]>([]);
  const [projectValue, setProjectValue] = useState<any>(
    formData ? formData : undefined,
  );

  const fetchProjectData = useCallback(async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8000/getProjects',
      withCredentials: false,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const comboBoxObj: any[] = [];
    response.data.forEach((item: any) => {
      const val = {
        label: item.name,
        id: item.id,
        key: item.key,
      };
      comboBoxObj.push(val);
      listOfAllowedValues.push(item.id);
      if (formData && formData.id === item.id) {
        setProjectValue(val);
      }
    });
    setProjectList(comboBoxObj);
  }, []);

  const valueChange = useCallback((_, value) => {
    onChange(value);
  }, []);

  useEffect(() => {
    fetchProjectData();
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
        options={projectList}
        renderInput={params => <TextField {...params} label="Project" />}
        onChange={valueChange}
        value={projectValue}
      />
    </FormControl>
  );
};

/*
 This is a validation function that will run when the form is submitted.
  You will get the value from the `onChange` handler before as the value here to make sure that the types are aligned\
*/

export const validateDevPortalProjectFieldValidation = (
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
