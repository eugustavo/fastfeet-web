import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import { useField } from '@rocketseat/unform';

export default function SelectInput({
  name,
  label,
  placeholder,
  EditActive,
  ...rest
}) {
  const selectRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <label htmlFor={fieldName}>
      {label}
      <ReactSelect
        ref={selectRef}
        classNamePrefix="react-select"
        placeholder={EditActive || placeholder}
        {...rest}
      />
    </label>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  EditActive: PropTypes.string,
};

SelectInput.defaultProps = {
  EditActive: '',
};
