import * as React from 'react';
import { render } from 'react-dom';
import registerWorker from './registerWorker';

const API = process.env.CYG_API;

interface IRoute {
  routeId: string;
  routeLongName: string;
}

interface IAppState {
  routes: IRoute[];
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      routes: [],
    };
  }

  public async componentDidMount() {
    const routes = await fetch(`${API}/route`).then((r) => r.json());
    this.setState({
      routes,
    });
  }

  public render() {
    const { routes } = this.state;

    return (
      <ul>
        {routes.map((route) =>
          <li key={route.routeId}>
            <a>{route.routeLongName}</a>
          </li>)}
      </ul>
    );
  }
}

render(
    <App />,
    document.getElementById('root'),
);

registerWorker();
