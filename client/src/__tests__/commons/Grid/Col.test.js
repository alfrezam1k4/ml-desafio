import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Row, Col } from '../../../components/commons';

const props = {
  style: { color: 'red' },
  className: 'test-class',
};

const chidren = <div>Test</div>;

describe('<Col />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Col {...props}>{chidren}</Col>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has correct class', () => {
    const wrapper = mount(<Col {...props}>{chidren}</Col>);
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  it('has correct styles', () => {
    const wrapper = mount(<Col {...props}>{chidren}</Col>);
    expect(wrapper.get(0).props.style).toHaveProperty('color', 'red');
  });

  test.each([
    ['xs', 6],
    ['sm', 12],
    ['md', 8],
    ['lg', 24],
    ['xl', 16],
    ['xxl', 2],
  ])('should have correct class for size %s', (prop, value) => {
    const sizeProp = { [prop]: value };
    const wrapper = mount(
      <Col {...props} {...sizeProp}>
        {chidren}
      </Col>
    );
    const hasClass = wrapper
      .find('.alf-col')
      .hasClass(`alf-col-${prop}-${value}`);
    expect(hasClass).toBe(true);
  });

  test.each([8, 16, 24, 32, 40, 48])(
    'should have correct col style for row gutter %s',
    (gutter) => {
      const wrapper = mount(
        <Row gutter={gutter}>
          <Col {...props}>{chidren}</Col>
        </Row>
      );
      const styles = wrapper.find('.alf-col').props().style;
      expect(styles).toHaveProperty('paddingLeft', gutter / 2);
      expect(styles).toHaveProperty('paddingRight', gutter / 2);
    }
  );
});
