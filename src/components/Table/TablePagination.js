import React, { Component, PropTypes } from 'react';
import TextInput from 'components/TextInput';
import cx from 'classnames';

class CustomPagination extends Component {
  componentWillMount = () => {
    const { events, settings } = this.props;
    events.setPageSize(settings.pageSize || 10);
  }

  render = () => {
    const { data, events, pageProperties, settings } = this.props;
    const { getNextPage, getPage, getPreviousPage } = events;
    const { currentPage, maxPage } = pageProperties;

    return (data.length >= (settings.pageSize || 10)) && (
      <div className="pagination">
        <div
          className={cx('left', equals(1, currentPage) ? 'disabled' : null)}
          onClick={getPreviousPage}
        >
          <span className="icon icon-backward" />
          <span>Previous</span>
        </div>
        <div className="page">
          <div>
            <TextInput max={maxPage} min={1} onChange={getPage} type="number" value={currentPage} />
            <div style={{ whiteSpace: 'nowrap' }}>of {maxPage}</div>
          </div>
        </div>
        <div
          className={cx('right', maxPage === currentPage ? 'disabled' : null)}
          onClick={getNextPage}
        >
          <span>Next</span>
          <span className="icon icon-forward" />
        </div>
      </div>
    );
  }
}

CustomPagination.propTypes = {
  data: PropTypes.array,
  events: PropTypes.object,
  pageProperties: PropTypes.object,
  settings: PropTypes.object,
};
