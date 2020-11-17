import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import RowContext from './RowContext';

const DIMENSIONS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const Col = ({ style, className, children, ...props }) => {
  const { gutter } = useContext(RowContext);
  let sizeClassObj = {};
  let colStyle = style;

  DIMENSIONS.forEach((size) => {
    sizeClassObj = {
      ...sizeClassObj,
      [`alf-col-${size}-${props[size]}`]: props[size] !== undefined,
    };
  });

  if (gutter > 0) {
    colStyle = {
      paddingLeft: gutter / 2,
      paddingRight: gutter / 2,
      ...style,
    };
  }

  return (
    <div style={colStyle} className={clsx('alf-col', sizeClassObj, className)}>
      {children}
    </div>
  );
};

Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  children: PropTypes.any,
  className: PropTypes.any,
  xs: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  sm: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  md: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  lg: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  xl: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  xxl: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default Col;
