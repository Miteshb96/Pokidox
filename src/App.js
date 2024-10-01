import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

import Home from './components/HomeScreen/Home';
import Detail, {fetchDetailedInfo} from './components/DetailedView/Detail.js';
import ErrorPage from "./components/ErrorPage/ErrorPage.js";

import './App.css'; // Create this file for your styles

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/detail/:id",
    element: <Detail/>,
    loader: ({params}) => { return fetchDetailedInfo(params.id) },
    errorElement: <ErrorPage/>
  }
])

const query_client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={query_client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
