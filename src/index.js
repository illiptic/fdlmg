import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createStore } from 'redux';
import rootReducer from './app/rootReducer'
import App from './app/App';
import About from './app/components/About';
import Program from './app/components/Program';

const store = (window.devToolsExtension ?
  window.devToolsExtension()(createStore) :
  createStore)(rootReducer , {});

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/program" />
        <Route path="program" component={Program}/>
        <Route path="about" component={About}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
