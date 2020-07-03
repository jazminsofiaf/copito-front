import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import Home from './pages/Home';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('invalid path should redirect to Home page', () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});
