import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools} from "@redux-devtools/extension";