import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Layout from '../../components/layout/Layout';

describe('<Layout />', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
