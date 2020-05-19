import React from 'react';
import { render } from '@testing-library/react';
import Confirmed from '../Confirmed';
import AppProvider from '../../AppProvider';

test('renders learn react link', () => {
  const { getByText } = render(
    <AppProvider children={<Confirmed />} />
  );
  const Election = getByText('Your Election');
  expect(Election).toBeInTheDocument();
});