import React from 'react';
import Routes from './Routes';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';

window.React = React;
window.Perf = require('react-addons-perf');

const browserHistory = useRouterHistory(createHistory)({ basename: '/styleguide' });

const App = () => (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    {Routes}
  </Router>
);

export default App;
