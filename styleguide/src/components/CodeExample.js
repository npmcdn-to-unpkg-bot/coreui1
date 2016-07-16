import React, {Component, PropTypes} from 'react';
import { parse } from 'react-docgen';
import MarkdownElement from './MarkdownElement';
import Button from 'coreui/components/Button';

class CodeExample extends Component {
  static defaultProps = { component: true };

  static propTypes = {
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    component: PropTypes.bool,
    description: PropTypes.string,
    exampleBlockStyle: React.PropTypes.object,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
  };

  state = { expand: false };

  handleClick = () => { this.setState({ expand: !this.state.expand }); };

  render() {
    const { children, code, component } = this.props;
    const { expand } = this.state;
    const docs = component ? parse(code) : {};
    const styles = {
      codeBlockTitle: { cursor: 'pointer' },
      example: { maxWidth: 550 },
      markdown: {
        overflow: 'auto',
        maxHeight: 1400,
        marginTop: 0,
        marginBottom: 0,
      },
      markdownRetracted: { maxHeight: 0 },
      description: {
        background: '#ffffff',
        overflow: 'auto',
        padding: '10px 20px 0',
        marginTop: 0,
        marginBottom: 0,
      },
      root: { marginBottom: 32 },
    };
    const codeStyle = expand ?
      styles.markdown :
      Object.assign({}, styles.markdown, styles.markdownRetracted);
    const text = `\`\`\`js
${code}
    \`\`\``;

    return (
      <div className="row">
        <div className="col-xs-1">&nbsp;</div>
        <div className="col-xs-10">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{this.props.title}</h4>
            </div>
            <div className="card-block">
              {expand && <MarkdownElement style={codeStyle} text={text} />}
              <MarkdownElement text={this.props.description || docs.description} />
              <div style={styles.example}>{children}</div>
            </div>
            <div className="card-footer">
              <Button actionType="primary" onClick={this.handleClick}>
                {`${expand ? 'Hide' : 'Show'} code`}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-xs-1">&nbsp;</div>
      </div>
    );
  }
}

export default CodeExample;
