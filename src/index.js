import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StalactitePlot from './StalactitePlot';

import task_1 from './data/task_1.json';
import task_2 from './data/task_2.json';
import task_3 from './data/task_3.json';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/task-1",
    element: <StalactitePlot hierarchical_data={task_1}/>,
  },
  {
    path: "/task-2",
    element: <StalactitePlot hierarchical_data={task_2}/>,
  },
  {
    path: "/task-3",
    element: <StalactitePlot hierarchical_data={task_3}/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
