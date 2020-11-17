import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';
import { Item } from '../../components/Items';

const product = {
  price: {},
  title: '',
  address: '',
  picture: '',
  free_shipping: true,
};
describe('<Item />', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Item product={product} />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('shows shipping icon when free sheeping variable is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Item product={product} />
      </MemoryRouter>
    );

    expect(wrapper.find('img').last().props().alt).toBe('Envio Gratis');
  });
  it('shows shipping icon when free sheeping variable is false', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Item product={{ ...product, free_shipping: false }} />
      </MemoryRouter>
    );

    expect(wrapper.find('img').last().props().alt).not.toBe('Envio Gratis');
  });
});
