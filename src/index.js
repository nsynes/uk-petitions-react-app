import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />

                <Switch>
                    <Route path="/" component={List} exact />
                    <Route path="/petition/:id" component={Detail} exact />
                    {/*this notFound works because last route only renders if none above worked*/}
                    <Route component={NotFound} />
                </Switch>

                <div className='developed-by' align='center'>
                    Developed by<br/><a className='website-link' href='https://www.nicksynes.com'>nicksynes.com</a>
                </div>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

