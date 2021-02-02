import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import {render, fireEvent, cleanup, getByTestId} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup);

// Snapshot test
/* it('renders correctly enzyme', () => {
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot();
  }); */

it('Selecting tokens enables Input 1', () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.change(getByTestId("Select1"), {target: {value: "WETH"}})
    fireEvent.change(getByTestId("Select2"), {target: {value: "UNI"}})
    expect(getByText(/Estimate/i).closest('Button')).not.toBeDisabled();
})

/* test("renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<App></App>, root);
}); */

