import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Row } from '../../../components/commons';

const props = {
  gutter: 0,
  style: { color: 'red' },
  className: 'test-class',
};

const chidren = <div>Test</div>;

describe('<Row />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Row {...props}>{chidren}</Row>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has correct class', () => {
    const wrapper = mount(<Row {...props}>{chidren}</Row>);
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  it('has correct styles', () => {
    const wrapper = mount(<Row {...props}>{chidren}</Row>);
    expect(wrapper.get(0).props.style).toHaveProperty('color', 'red');
  });

  test.each([8, 16, 24, 32, 40, 48])(
    'should have correct row style for gutter %s',
    (gutter) => {
      const wrapper = mount(
        <Row {...props} gutter={gutter}>
          {chidren}
        </Row>
      );
      const styles = wrapper.find('.alf-row').props().style;
      expect(styles).toHaveProperty('marginLeft', gutter / -2);
      expect(styles).toHaveProperty('marginRight', gutter / -2);
    }
  );
});
