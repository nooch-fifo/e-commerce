import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './contexts/User-Context';
import { ProductCategoriesProvider } from './contexts/ProductCategories-Context';
import { CartProvider } from './contexts/Cart-Context';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <ProductCategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductCategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
