/* eslint-disable no-nested-ternary */
import React from 'react';
import { PropTypes } from 'prop-types';

import './Layout.scss';

const Background = ({ children }) => {
  return <div className="background">{children}</div>;
};

Background.propTypes = {
  children: PropTypes.any,
};

export default Background;
