import React from 'react';
import { render } from 'react-testing-library';
import { make as More } from '../../app/pages/More.bs';

describe('More', () => {
  test('To render some more text', () => {
    const { getByText } = render(<More />);
    expect(getByText('More')).toBeTruthy();
  });
});
