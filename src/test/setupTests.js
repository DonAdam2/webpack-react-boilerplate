//redux mock store
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//sinon
import sinon from 'sinon';
//enzyme
import { mount, render, shallow, ShallowWrapper, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chaiEnzyme from 'chai-enzyme';
//chai
import chai, { expect } from 'chai';
import chaiReduxMockStore from 'chai-redux-mock-store';
//mocha
import { describe, beforeEach, afterEach, before, after, it } from 'mocha';
//js dom setup
require('jsdom-global')();

const middleWares = [thunk],
	mockStore = configureStore(middleWares),
	createState =
		({ initialState, reducer }) =>
		(actions) =>
			actions.reduce(reducer, initialState),
	mockedStore = ({ initialState, reducer }) => mockStore(createState({ initialState, reducer }));

//enzyme configurations
configure({
	adapter: new Adapter(),
});

//chai assertion for enzyme
chai.use(chaiEnzyme());
//chai assertion for redux mock store
chai.use(chaiReduxMockStore);

/**************** set global functions ****************/
//mock store
global.mockedStore = mockedStore;
//sinon
global.sinon = sinon;
//chai
global.expect = expect;
//mocha
global.describe = describe;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.before = before;
global.after = after;
global.it = it;
//enzyme
/* renders the whole DOM tree and gives you jQuery-like API to access DOM elements
inside this tree, simulate events and read text content. */
global.mount = mount;
/* returns a string with rendered HTML code, similar to the renderToString() method
from react-dom. It’s useful when you need to test HTML output. For example, a component that renders Markdown */
global.render = render;
// renders only the component itself without its children
global.shallow = shallow;
global.ShallowWrapper = ShallowWrapper;
