import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';

numberLocalizer();
momentLocalizer(Moment);

const context = require.context('./', true, /\.card\.js$/);
context.keys().forEach((moduleName) => { context(moduleName); });

module.hot.accept();
