import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPSE__ || compose;

const store = createStore(
    rootReducer,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),//ext dev tool
    composeEnhancers(applyMiddleware(thunk))//hacer acciones asincronas
);

export default store;
