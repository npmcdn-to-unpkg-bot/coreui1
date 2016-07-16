import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Moment from 'moment';
import { localizers } from 'coreui';

localizers.numberLocalizer();
localizers.momentLocalizer(Moment);

const rootEl = document.getElementById('root');
render(<AppContainer><App /></AppContainer>, rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    render(<AppContainer><NextRoot /></AppContainer>, rootEl);
  });
}
