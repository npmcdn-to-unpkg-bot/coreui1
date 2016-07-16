import React, {Component, PropTypes} from 'react';
import marked from 'marked';

require('./github-markdown.css');

const styles = { root: { marginBottom: 20, marginTop: 20, padding: '0 10px' } };

class MarkdownElement extends Component {

  static propTypes = {
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = { text: '' };

  componentWillMount() {
    marked.setOptions({
      breaks: false,
      gfm: true,
      highlight: function(code, lang) {
        return require('highlight.js').highlight(lang, code).value;
      },
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      tables: true,
    });
  }

  render() {
    const { style, text } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{__html: marked(text)}}
        style={Object.assign({}, styles.root, style)}
      />
    );
    /* eslint-enable */
  }
}

export default MarkdownElement;
