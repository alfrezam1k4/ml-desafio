import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.scss';
const Breadcrumb = ({ categories }) => {
  return (
    categories.length > 0 && (
      <p className="breadcrumb">
        {categories.map((crumb, index) => {
          if (index === categories.length - 1)
            return (
              <span key={index}>
                <b> {crumb}</b>
              </span>
            );
          return <span key={index}> {`${crumb} >`} </span>;
        })}
      </p>
    )
  );
};

Breadcrumb.propTypes = {
  categories: PropTypes.array,
};

export default Breadcrumb;
