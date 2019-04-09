import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { make as Link } from '../app/components/Link.bs';

// stories

storiesOf('Link', module).add('Default', () => {
  return <Link href={'/link'}>This is a link</Link>;
});
