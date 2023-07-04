/*
 * @Author: Leo
 * @Date: 2023-07-04 11:43:51
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 12:21:42
 * @FilePath: \event-calculator\src\App.js
 * @Description: 
 */
// import logo from './logo.svg';
import Home from './Pages/Home';
import { store } from './Redux/Store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Home />
      </div>
    </Provider>
  );
}

export default App;
