import React from 'react';
import NumberFormat from 'react-number-format';

const MoneyDisplay = ({ value }) => {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator
      isNumericString
      prefix="$"
      decimalScale={2}
      fixedDecimalScale
    />
  );
}

export default MoneyDisplay;