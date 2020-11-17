import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withApi, formats } from '../../utils';
import { Breadcrumb, Col, Row } from '../commons';

const ItemDetails = ({ api, match }) => {
  const [product, setProduct] = useState(null);

  const [categories, setCategories] = useState([]);
  const [condition, setCondition] = useState('');
  useEffect(() => {
    api
      .getItemDetails(match.params.id)
      .then((res) => {
        if (res.data) {
          setProduct(res.data.product);
          switch (res.data.product.condition) {
            case 'new':
              setCondition('Nuevo');
              break;
            case 'used':
              setCondition('Usado');
              break;
            case 'refurbished':
              setCondition('Reacondicionado');
              break;

            default:
              break;
          }
          setCategories(res.data.categories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb categories={categories} />

      {product && (
        <div className="item-details">
          <div>
            <Row gutter={32}>
              <Col xs={24} md={16}>
                <div className="content-image">
                  <img src={product.picture} alt="" />
                </div>
              </Col>
              <Col xs={24} md={8}>
                <p
                  style={{ fontSize: '14px', marginBottom: '16px' }}
                >{`${condition} - ${product.sold_quantity} vendidos`}</p>
                <p style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>
                  {product.item.title}
                </p>
                <p
                  style={{
                    fontSize: '46px',
                    margin: '32px 0px',
                  }}
                >
                  {formats.moneyFormat(product.item.price.amount)}
                </p>
                <button className="button-comprar">Comprar</button>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={16}>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    marginBottom: 0,
                  }}
                >
                  Descripcion del producto
                </p>
                <p style={{ fontSize: '16px', margin: '32px 0px' }}>
                  {product.description}
                </p>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

ItemDetails.propTypes = {};

export default withApi(ItemDetails);
