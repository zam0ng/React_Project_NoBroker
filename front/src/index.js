import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));

// require('dotenv').config();

root.render(

    <QueryClientProvider client={queryClient} >

        {/* devtools */}

        {/* 리액트 쿼리 아이콘 없애기 
            1) initialIsOpen={false}
            2) style 에서 display 없애기  */}
        <ReactQueryDevtools initialIsOpen={false} />
        <style>
            {`
                .ReactQueryDevtools {
                    display: none !important;
                }
            `}
        </style>

        <BrowserRouter>
        
            <App />
        
        </BrowserRouter>

    </QueryClientProvider>

    
);

reportWebVitals();
