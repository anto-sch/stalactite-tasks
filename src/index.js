import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider } from "react-router-dom";
import StalactitePlot from './StalactitePlot';
import StalactiteTask from './StalactiteTask';
import Navbar from './NavBar';
import TrainingTask from './TrainingTask';
import Introduction from './Introduction';

import task_1 from './data/task_1.json';
import task_2 from './data/task_2.json';
import task_3 from './data/task_3.json';
import ttask_0 from './data/ttask_0.json';
import ttask_1 from './data/ttask_1.json';
import ttask_3 from './data/ttask_3.json';
import ttask_5 from './data/ttask_5.json';

const ttask_0_text = `You are a financial investor using a visualization that allows you to compare the sales and profit margins of several companies. Sales is the company's income in a business year from selling its products. The profit margin is the percentage of sales that the company earns as profit. \n\nIn the visualization, companies are represented by boxes. The width of the box corresponds to the company's sales and the height to the profit margin.\n`
const ttask_1_text = "Let's look at an example. The diagram below shows sales and profit margin for three companies. A frequent task of investors is to compare and rank companies with respect to sales or profit margins. Remember, sales is represented by the width, profit margin by the height of the box. \n\nPlease rank the boxes from highest to lowest sales."
const ttask_2_text = "Please rank now the boxes from highest to lowest profit margin. \n\nRemember, sales is represented by the width, profit margin by the height of the box."
const ttask_3_text = "Typically, investors compare companies within sectors, such as “Software Infrastructure”. As expected, the box of the sector shows the total of sales as its width and the average profit margin in the sector as its height. Note that the total of sales in a sector is just the sum of the sales of all its companies. If you want to compare a company's profit margin to the sector average you need to compare the sector's box height to the company's box height. \n\nWhich of the companies have a profit margin below the sector's average profit margin?"
const ttask_4_text = "Which of the companies have a profit margin above the sector's average profit margin?\n\nRemember, the box of the sector shows the total of sales as its width and the average profit margin in the sector as its height."
const ttask_5_text = "Investors group sectors into industries, such as “Technology”. The visualization follows the conventions as before. The total sales of the industry is represented by the width of the industry box. The average profit margin is represented by the height of the industry box.\n\nWhich of the sectors has a profit margin above the industry's average profit margin?"
const ttask_6_text = "Sometimes, to facilitate the comparison, lines are added to the diagram showing the average profit margins of industry and sectors.\n\nWhich color is the average line for the Technology industry?"

const ttask_1_answers = [["/ttask-1", "Company B, Company C, Company A", false], ["/ttask-2", "Company A, Company C, Company B", true], ["/ttask-1", "Company C, Company A, Company B", false]]
const ttask_2_answers = [["/ttask-2", "Company A, Company C, Company B", false], ["/ttask-2", "Company C, Company A, Company B", false], ["/ttask-3", "Company B, Company C, Company A", true]]
const ttask_3_answers = [["/ttask-4", "Company A", true], ["/ttask-3", "Company A, Company B", false], ["/ttask-3", "Company C", false]]
const ttask_4_answers = [["/ttask-4", "Company A, Company C", false], ["/ttask-5", "Company B, Company C", true], ["/ttask-4", "Company B", false]]
const ttask_5_answers = [["/ttask-5", "Software Infrastructure", false], ["/ttask-6", "Consumer Electronics", true]]
const ttask_6_answers = [["/end", "Red", true], ["/ttask-6", "Yellow", false]]


const router = createHashRouter([
  {
    path: "/",
    element: <Navbar/>
  },
  {
    path: "/task-1",
    element: <StalactitePlot hierarchical_data={task_1} />
  },
  {
    path: "/task-2",
    element: <StalactitePlot hierarchical_data={task_2} />
  },
  {
    path: "/task-3",
    element: <StalactitePlot hierarchical_data={task_3} />
  },
  {
    path: "/ttask-0",
    element: <Introduction task_data={ttask_0} task_text={ttask_0_text} />
  },
  {
    path: "/ttask-1",
    element: <TrainingTask task_data={ttask_1} task_text={ttask_1_text} task_answers={ttask_1_answers} />
  },
  {
    path: "/ttask-2",
    element: <TrainingTask task_data={ttask_1} task_text={ttask_2_text} task_answers={ttask_2_answers} />
  },
  {
    path: "/ttask-3",
    element: <StalactiteTask lines={false} task_data={ttask_3} task_text={ttask_3_text} task_answers={ttask_3_answers} />
  },
  {
    path: "/ttask-4",
    element: <StalactiteTask lines={false} task_data={ttask_3} task_text={ttask_4_text} task_answers={ttask_4_answers} />
  },
  {
    path: "/ttask-5",
    element: <StalactiteTask lines={false} task_data={ttask_5} task_text={ttask_5_text} task_answers={ttask_5_answers} />
  },
  {
    path: "/ttask-6",
    element: <StalactiteTask lines={true} task_data={ttask_5} task_text={ttask_6_text} task_answers={ttask_6_answers} />
  },
  {
    path: "/end",
    element: <h1>You have completed the training. Press f10 to continue!</h1> 
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
