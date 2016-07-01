import jss from 'jss';
import reactJss from 'react-jss';
import extend from 'jss-extend';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import vendorPrefixer from 'jss-vendor-prefixer';
import reactWidgetsSheet from './jss/react-widgets';

class Shared {
  constructor() {
    this.importedComponents = {};
    this.jss = jss.create();
    this.useSheet = reactJss(this.jss);
    this.jss.use(extend());
    this.jss.use(nested());
    this.jss.use(camelCase());
    this.jss.use(defaultUnit());
    this.jss.use(vendorPrefixer());

    // temporary instance for react-widgets sheet to workaround css-vendor content escaping issues
    this.rwjss = jss.create();
    this.rwjss.use(extend());
    this.rwjss.use(nested());
    this.rwjss.use(camelCase());
    this.rwjss.use(defaultUnit());

    this.attachReactWidgetsSheet();
  }

  attachReactWidgetsSheet = () => {
    this.rwjss.createStyleSheet(reactWidgetsSheet, { named: false }).attach();
  }

  getRegisteredComponents = () => this.importedComponents;

  registerComponent = (name, component) => {
    this.importedComponents[name] = component;
  }
}

const SharedInst = new Shared();

export default SharedInst;
