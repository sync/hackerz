import React from 'react';
import { render } from '@testing-library/react';
import { ClientContext } from 'graphql-hooks';
import client from '../utils/graphQLClient';

const AllTheProviders = ({ children }) => {
  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
