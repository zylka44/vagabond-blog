import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import About from './modules/About/About';
import Main from './modules/Main/Main';
import store from './app/store';
import Article from './modules/Article/Article';
import Dispatcher from './modules/Dispacher/Dispacher';
import Edit from './modules/Edit/Edit';
import ScrollTop from './shared/components/ScrollTop/ScrollTop';
import Modals from './modules/Modals/Modals';

const App = () => {
  return (
    <Provider store={store}>
      <Dispatcher>
        <Router>
          <ScrollTop />
          <Modals />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/edit">
              <Edit />
            </Route>
            <Route exact path="/edit/:articleId">
              <Edit />
            </Route>
            <Route exact path="/abouteme">
              <About />
            </Route>
            <Route exact path="/article/:articleId">
              <Article />
            </Route>
            <Route exact path="/*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Dispatcher>
    </Provider>
  );
};

export default App;
