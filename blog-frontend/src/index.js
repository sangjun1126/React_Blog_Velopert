import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux"; // 수정: applyMiddleware와 compose를 import
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga"; // 수정: createSagaMiddleware를 import

const sagaMiddleware = createSagaMiddleware(); // 수정: createSagaMiddleware를 호출
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware))); // 수정: composeWithDevTools 제거
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
