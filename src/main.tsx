import '@gravity-ui/uikit/styles/styles.css';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from '../store/store';
import {RouterProvider} from 'react-router-dom';
import {router} from './router';
import {ThemeProvider} from '@gravity-ui/uikit';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
