import * as React from 'react';
import { render } from 'react-dom';
import registerWorker from './registerWorker'

const App = () => (
    <h2>Hello cyg</h2>
);

render(
    <App />,
    document.getElementById("root")
);

registerWorker();