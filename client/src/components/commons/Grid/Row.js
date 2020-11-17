import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import RowContext from './RowContext';
import './Grid.scss';

const GUTTERS = [0, 8, 16, 24, 32, 40, 48];

const Row = ({
  gutter,
  type,
  justify,
  align,
  style,
  className,
  children,
  ariaHidden,
}) => {
  const rowStyle =
    gutter > 0
      ? {
          marginLeft: gutter / -2,
          marginRight: gutter / -2,
          ...style,
        }
      : style;

  const classes = [];
  classes.push(type === 'flex' ? 'alf-row-flex' : 'alf-row');
  if (justify) {
    classes.push(`alf-row-flex-${justify}`);
  }
  if (align) {
    classes.push(`alf-row-flex-${align}`);
  }

  return (
    <RowContext.Provider value={{ gutter }}>
      <div
        aria-hidden={ariaHidden}
        className={clsx(classes, className)}
        style={rowStyle}
      >
        {children}
      </div>
    </RowContext.Provider>
  );
};

Row.propTypes = {
  children: PropTypes.any,
  gutter: PropTypes.oneOf(GUTTERS),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  className: PropTypes.string,
  type: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

Row.defaultProps = {
  gutter: 0,
  ariaHidden: false,
};

export default Row;
