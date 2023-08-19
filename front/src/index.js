import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));

// require('dotenv').config();

root.render(

    <AuthProvider>

    <QueryClientProvider client={queryClient} >

        {/* devtools */}
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>

            <App />

        </BrowserRouter>

    </QueryClientProvider>
    </AuthProvider>


);

reportWebVitals();
