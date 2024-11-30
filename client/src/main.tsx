import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.tsx';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import api from './redux/api.ts';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { NotificationProvider } from './contexts/NotificationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider api={api}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </PersistGate>
      </ReduxProvider>
    </ApiProvider>
  </StrictMode>
);
