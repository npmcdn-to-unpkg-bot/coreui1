import jss from 'jss';
import reactJss from 'react-jss';
import extend from 'jss-extend';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import vendorPrefixer from 'jss-vendor-prefixer';

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
  }

  getRegisteredComponents = () => this.importedComponents;

  registerComponent = (name, component) => {
    this.importedComponents[name] = component;
  }
}

const SharedInst = new Shared();

export default SharedInst;
