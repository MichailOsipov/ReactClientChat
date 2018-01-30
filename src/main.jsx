import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Chat} from './chat';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
        <Chat />
    </Provider>,
    document.getElementById('root')
);
