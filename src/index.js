import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// Curried function
// function logger(obj, next, action) 
// logger(obj)(next)(action)
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       //middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({ dispatch, getState }) => (next) => (action) => {
  // logger code
  console.log('ACTION_TYPE = ', action.type);
  next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger));
console.log(store);
// console.log(store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: 'Superman' }]
// });

// console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={ store }/>
  </React.StrictMode>,
  document.getElementById('root')
);

