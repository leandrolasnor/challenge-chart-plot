import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import reducers from "./reducers/reducers";
import App from "./App";
import Editor from "./editor/editor";
import Dashboard from "./dashboard/dashboard";

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers);

it("<App />", () => {
  expect(toJson(shallow(<Provider store={store}>{App}</Provider>))).toMatchSnapshot();
});

it("<Editor />", () => {
  expect(toJson(shallow(<Provider store={store}>{Editor}</Provider>))).toMatchSnapshot();
});

it("<Dashboard />", () => {
  expect(toJson(shallow(<Provider store={store}>{Dashboard}</Provider>))).toMatchSnapshot();
});
