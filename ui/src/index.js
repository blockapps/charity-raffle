import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom'
import {
    createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerReducer} from 'react-router-redux';
import newLotteryReducer from './components/NewLottery/newlottery.reducer'
import participateReducer from './components/Participate/participate.reducer'

import App from './App/';
import {unregister as unregisterServiceWorker} from './registerServiceWorker';

const rootReducer = combineReducers({
  routing: routerReducer,
  newLottery: newLotteryReducer,
  participate: participateReducer,
  // YOUR REDUCERS HERE
});

const rootSaga = function* startForeman() {
    yield [
        // YOUR SAGAS HERE
    ]
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
unregisterServiceWorker();
