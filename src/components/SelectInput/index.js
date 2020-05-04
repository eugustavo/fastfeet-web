import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

export default function SelectInput({ name, options, ...rest }) {
  // const ref = useRef();
  // const { registerField, defaultValue, fieldName } = useField(name);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: ref.current,
  //     path: 'state.value',
  // })}, [ref.current, registerField]); // eslint-disable-line

  // function getDefaultValue() {
  //   if (!defaultValue) return null;

  //   return options.filter((option) => defaultValue.includes(option.id));
  // }

  // return (
  //   <AsyncSelect
  //     name={fieldName}
  //     options={('gustavo', 'andre', 'lucas')}
  //     defaultValue={getDefaultValue()}
  //     ref={ref}
  //     // getOptionValue={(options) => options.id}
  //     // getOptionLabel={(options) => options.title}
  //     {...rest}
  //   />
  // );
  console.tron.log('DADOS ASYNC-SELECT', options);
  const ref = useRef();
  const { fieldName, registerField, defaultValue } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    return selectValue ? selectValue.map((option) => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select.state.value',
      parseValue: parseSelectValue,
      clearValue: (selectRef) => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;
    return options.filter((option) => defaultValue.includes(option.id));
  }

  return (
    <AsyncSelect
      name={fieldName}
      aria-label={fieldName}
      options={options}
      defaultValue={getDefaultValue()}
      ref={ref}
      placeholder="Selecione uma opção"
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.title}
      {...rest}
    />
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
