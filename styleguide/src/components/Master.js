import React, {Component, PropTypes} from 'react';
import LeftNav from './LeftNav';
import Title from 'react-title-component';

class Master extends Component {
  static propTypes = { children: PropTypes.node };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <LeftNav />
          <article className="col-xs-9">
            <Title render="CoreUI" />
            {this.props.children}
          </article>
        </div>
      </div>
    );
  }
}

export default Master;
