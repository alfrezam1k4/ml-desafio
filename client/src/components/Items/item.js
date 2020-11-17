import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from '../commons';
import { useResponsive, formats } from '../../utils';
import { icShipping } from '../../assets/icon';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  const { price, title, address, picture, free_shipping } = product;
  const { screenIsUp } = useResponsive();

  return (
    <Link to={`/items/${product.id}`} className="item-link">
      <Row
        type="flex"
        justify="center"
        gutter={8}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={24} sm={8} lg={5}>
          <img src={picture} alt="" className="item-image" />
        </Col>
        <Col
          xs={24}
          sm={12}
          lg={16}
          style={{ marginTop: screenIsUp('sm') ? '16px' : '0' }}
        >
          <>
            <p
              style={{
                fontSize: '24px',
                display: 'inline-block',
                margin: '16px 16px 32px 0px',
              }}
            >
              {formats.moneyFormat(price.amount)}
            </p>
            {free_shipping && (
              <img
                src={icShipping}
                alt="Envio"
                style={{ width: '24px', verticalAlign: 'text-bottom' }}
              />
            )}
          </>
          <p style={{ fontSize: '18px', maxWidth: '400px', marginTop: 0 }}>
            {title}
          </p>
        </Col>
        <Col
          xs={24}
          sm={4}
          lg={3}
          style={{ marginTop: screenIsUp('sm') ? '32px' : '0' }}
        >
          <p style={{ fontSize: '12px' }}>{address}</p>
        </Col>
      </Row>
    </Link>
  );
};

Item.propTypes = {
  product: PropTypes.object,
};

export default Item;
