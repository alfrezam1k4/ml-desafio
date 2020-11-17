import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withApi } from '../../utils';

import queryString from 'query-string';
import Item from './Item';
import './Items.scss';
import { Breadcrumb } from '../commons';

const ItemsResult = ({ api }) => {
  const { search } = queryString.parse(
    window.location.search + window.location.hash
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api
      .getItems(search)
      .then((res) => {
        if (res.data) {
          setProducts(res.data.items);
          setCategories(res.data.categories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {products && products.length > 0 && (
        <>
          <Breadcrumb categories={categories} />
          <ul>
            {products.map((p) => (
              <li className="item-list" key={p.id}>
                <Item product={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

ItemsResult.propTypes = {
  api: PropTypes.object,
};

export default withApi(ItemsResult);
