import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { createSelector } from 'reselect'

import Header from './components/Header';

import { addToList, toggleDisplay } from './actions/actions.js';

class App extends Component{
  render() {
    // Injected by connect() call:
    const { addItem, toggle, children, example, example2 } = this.props;

    let inputValue
    return (
      <div className="container-fluid">
        <Header></Header>
        <div className="container">{children}</div>
      </div>
    )
  }
}

App.propTypes = {
  example: PropTypes.bool,
  example2: PropTypes.array
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
const mapStateToProps = (state) => {
  return {
    example: state.example,
    example2: state.example2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: () => {
      dispatch(toggleDisplay())
    },
    addItem: (form) => {
      let value = form.itemText.value.trim();
      if(!value) return
      dispatch(addToList(value))
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App)
