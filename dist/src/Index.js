import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Importera din Redux Store
import App from './components/App/App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(Provider, { store: store, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
