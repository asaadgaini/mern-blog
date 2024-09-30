import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './components/redux/store.js';
import { Provider } from 'react-redux'; // Corrected import for Provider
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
             <App />
        </ThemeProvider>
      

      </PersistGate>
    </Provider>
  </StrictMode>,
);
