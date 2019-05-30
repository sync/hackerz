import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { make as Link } from '../../app/components/Link.bs';
import * as ReasonReactRouter from 'reason-react/src/ReasonReactRouter.js';

jest.mock('reason-react/src/ReasonReactRouter.js');

describe('Link', () => {
  test('To render some link', () => {
    const linkText = 'Som test here';
    const href = '/help';
    const { getByText } = render(<Link href={href}>{linkText}</Link>);

    const link = getByText(linkText);
    expect(link).toBeTruthy();

    fireEvent.click(link);
    expect(ReasonReactRouter.push).toHaveBeenCalledWith(href);
  });
});
