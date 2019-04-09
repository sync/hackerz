import {
  configure,
  addDecorator,
  getStorybook,
  setAddon,
} from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import createPercyAddon from '@percy-io/percy-storybook';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.jsx?$/);
function loadStories() {
  addDecorator(centered);
  req.keys().forEach(filename => req(filename));
}

const { percyAddon, serializeStories } = createPercyAddon();
setAddon(percyAddon);

configure(loadStories, module);

// NOTE: if you're using the Storybook options addon, call serializeStories *BEFORE* the setOptions call
serializeStories(getStorybook);
