import React from 'react';
import NumberFormat from 'react-number-format';

const SalaryInput = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
      decimalScale="2"
      fixedDecimalScale
    />
  );
}

export default SalaryInput;