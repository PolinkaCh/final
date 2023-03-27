import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import {createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reducer from "./redux/reducers/combine"
import thunk from 'redux-thunk';

const store = createStore (reducer, compose (applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <div className="Body">
          <Header/>
          <Main/>
          <Footer/> 
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
