import React from 'react';
import renderer from 'react-test-renderer';
import { Breadcrumb } from '../../../components/commons';

const categories = ['1', '3'];
describe('<Breadcrumb />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Breadcrumb categories={categories} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
