import React from 'react';
import { hydrate } from 'react-dom';
import { register as registerServiceWorker } from './registerServiceWorker';
import App from './App';

registerServiceWorker();

hydrate(<App />, document.getElementById('app'));
