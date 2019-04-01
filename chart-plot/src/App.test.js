import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers'
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json"
import App from './App';
import Editor from './editor/editor';
import Dashboard from './dashboard/dashboard';

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers);
const Snapshot = sayCheese => { return toJson(shallow(<Provider store={store}>{sayCheese}</Provider>)) }

it('<App />', () => {
  expect(<Snapshot sayCheese={App} />).toMatchSnapshot();
});

it('<Editor />', () => {
  expect(<Snapshot sayCheese={Editor} />).toMatchSnapshot();
});

it('<Dashboard />', () => {
  expect(<Snapshot sayCheese={Dashboard} />).toMatchSnapshot();
});
