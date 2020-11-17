import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ItemsResult } from '../../components/Items';

describe('<ItemsResult />', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <ItemsResult />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
