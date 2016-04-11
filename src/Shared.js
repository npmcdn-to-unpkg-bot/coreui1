class Shared {
  constructor() {
    this.importedComponents = {};
  }

  getRegisteredComponents = () => this.importedComponents;
  
  registerComponent = (name, component) =>
    this.importedComponents[name] = component;
}

const SharedInst = new Shared();

export default SharedInst;