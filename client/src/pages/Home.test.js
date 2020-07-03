import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';


it('renders welcome message',  () => {
    const wrapper = shallow(<Home/>);
    const welcome = <h1>Welcome to Florida App</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
