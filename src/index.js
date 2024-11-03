import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider } from "react-router-dom";
import StalactitePlot from './StalactitePlot';
import StalactiteTask from './StalactiteTask';
import Navbar from './NavBar';
import TrainingTask from './TrainingTask';
import Introduction from './Introduction';
import IntroIcicle from './IntroIcicle';
import IcicleTask from './IcicleTask';
import TrainingTaskIcicle from './TrainingTaskIcicle';

import task_A from './data/task_A.json';
import task_B from './data/task_B.json';
import ttask_0 from './data/ttask_0.json';
import ttask_1 from './data/ttask_1.json';
import ttask_3 from './data/ttask_3.json';
import ttask_5 from './data/ttask_5.json';
import icicle from './data/icicle.json';
import IciclePlot from './IciclePlot';

import energy_data_A from './data/exp_datasets/energy_data_A.json';
import energy_data_B from './data/exp_datasets/energy_data_B.json';
import energy_data_C from './data/exp_datasets/energy_data_C.json';

import finance_data_A from './data/exp_datasets/finance_data_A.json';
import finance_data_B from './data/exp_datasets/finance_data_B.json';
import finance_data_C from './data/exp_datasets/finance_data_C.json';


const task_1_text = "Which companies in the Consumer Electronics sector have a profit margin above sector average?"
const task_2_text = "Which companies in the Consumer Electronics sector have a profit margin below sector average?"
const task_3_text = "Which companies in the Software Infrastructure sector have a profit margin above sector average?"
const task_4_text = "Which companies in the Software Infrastructure sector have a profit margin below sector average?"
const task_5_text = "Which sectors in the Technology industry have a profit margin above industry average?"
const task_6_text = "Which sectors in the Technology industry have a profit margin below industry average?"


const ttask_0_text = `You are a financial investor using a visualization that allows you to compare the sales and profit margins of several companies. Sales is the company's income in a business year from selling its products. The profit margin is the percentage of sales that the company earns as profit. \n\nIn the visualization, companies are represented by boxes. The width of the box corresponds to the company's sales and the height to the profit margin.\n`
const ttask_1_text = "Let's look at an example. The diagram below shows sales and profit margin for three companies. A frequent task of investors is to compare and rank companies with respect to sales or profit margins. Remember, sales is represented by the width, profit margin by the height of the box. \n\nPlease rank the boxes from highest to lowest sales."
const ttask_2_text = "Please rank now the boxes from highest to lowest profit margin. \n\nRemember, sales is represented by the width, profit margin by the height of the box."
const ttask_3_text = "Typically, investors compare companies within sectors, such as “Software Infrastructure”. As expected, the box of the sector shows the total of sales as its width and the average profit margin in the sector as its height. Note that the total of sales in a sector is just the sum of the sales of all its companies. If you want to compare a company's profit margin to the sector average you need to compare the sector's box height to the company's box height. \n\nWhich of the companies have a profit margin below the sector's average profit margin?"
const ttask_4_text = "Which of the companies have a profit margin above the sector's average profit margin?\n\nRemember, the box of the sector shows the total of sales as its width and the average profit margin in the sector as its height."
const ttask_5_text = "Investors group sectors into industries, such as “Technology”. The visualization follows the conventions as before. The total sales of the industry is represented by the width of the industry box. The average profit margin is represented by the height of the industry box.\n\nWhich of the sectors has a profit margin above the industry's average profit margin?"
const ttask_6_text = "Sometimes, to facilitate the comparison, lines are added to the diagram showing the average profit margins of industry and sectors.\n\nWhich color is the average line for the Technology industry?"

const i_ttask_0_text = `You are a financial investor using a visualization that allows you to compare the sales and profit margins of several companies. Sales is the company's income in a business year from selling its products. The profit margin is the percentage of sales that the company earns as profit. \n\nIn the visualization, companies are represented by boxes. The width of the box corresponds to the company's sales, the profit margin is written in the box.\n`
const i_ttask_1_text = "Let's look at an example. The diagram below shows sales and profit margin for three companies. A frequent task of investors is to compare and rank companies with respect to sales or profit margins. Remember, sales is represented by the width of the box, profit margin is written inside of it. \n\nPlease rank the boxes from highest to lowest sales."
const i_ttask_2_text = "Please rank now the boxes from highest to lowest profit margin. \n\nRemember, sales is represented by the width of the box, profit margin is written inside of it."
const i_ttask_3_text = "Typically, investors compare companies within sectors, such as “Software Infrastructure”. As expected, the box of the sector shows the total of sales as its width and has the average profit margin written inside of it. Note that the total of sales in a sector is just the sum of the sales of all its companies. If you want to compare a company's profit margin to the sector average you need to compare the sector's box label to the company's box label. \n\nWhich of the companies have a profit margin below the sector's average profit margin?"
const i_ttask_4_text = "Which of the companies have a profit margin above the sector's average profit margin?\n\nRemember, the box of the sector shows the total of sales as its width and the average profit margin in the sector as its height."
const i_ttask_5_text = "Investors group sectors into industries, such as “Technology”. The visualization follows the conventions as before. The total sales of the industry is represented by the width of the industry box. The average profit margin is written inside of the industry box.\n\nWhich of the sectors has a profit margin above the industry's average profit margin?"

const ttask_1_answers = [["/ttask-1", "Company B, Company C, Company A", false], ["/ttask-2", "Company A, Company C, Company B", true], ["/ttask-1", "Company C, Company A, Company B", false]]
const ttask_2_answers = [["/ttask-2", "Company A, Company C, Company B", false], ["/ttask-2", "Company C, Company A, Company B", false], ["/ttask-3", "Company B, Company C, Company A", true]]
const ttask_3_answers = [["/ttask-4", "Company A", true], ["/ttask-3", "Company A, Company B", false], ["/ttask-3", "Company C", false]]
const ttask_4_answers = [["/ttask-4", "Company A, Company C", false], ["/ttask-5", "Company B, Company C", true], ["/ttask-4", "Company B", false]]
const ttask_5_answers = [["/ttask-5", "Software Infrastructure", false], ["/ttask-6", "Consumer Electronics", true]]
const ttask_6_answers = [["/end", "Red", true], ["/ttask-6", "Yellow", false]]

const nl_ttask_1_answers = [["/no-lines-ttask-1", "Company B, Company C, Company A", false], ["/no-lines-ttask-2", "Company A, Company C, Company B", true], ["/no-lines-ttask-1", "Company C, Company A, Company B", false]]
const nl_ttask_2_answers = [["/no-lines-ttask-2", "Company A, Company C, Company B", false], ["/no-lines-ttask-2", "Company C, Company A, Company B", false], ["/no-lines-ttask-3", "Company B, Company C, Company A", true]]
const nl_ttask_3_answers = [["/no-lines-ttask-4", "Company A", true], ["/no-lines-ttask-3", "Company A, Company B", false], ["/no-lines-ttask-3", "Company C", false]]
const nl_ttask_4_answers = [["/no-lines-ttask-4", "Company A, Company C", false], ["/no-lines-ttask-5", "Company B, Company C", true], ["/no-lines-ttask-4", "Company B", false]]
const nl_ttask_5_answers = [["/no-lines-ttask-5", "Software Infrastructure", false], ["/end", "Consumer Electronics", true]]

const i_ttask_1_answers = [["/icicle-ttask-1", "Company B, Company C, Company A", false], ["/icicle-ttask-2", "Company A, Company C, Company B", true], ["/icicle-ttask-1", "Company C, Company A, Company B", false]]
const i_ttask_2_answers = [["/icicle-ttask-2", "Company A, Company C, Company B", false], ["/icicle-ttask-2", "Company C, Company A, Company B", false], ["/icicle-ttask-3", "Company B, Company C, Company A", true]]
const i_ttask_3_answers = [["/icicle-ttask-4", "Company A", true], ["/icicle-ttask-3", "Company A, Company B", false], ["/icicle-ttask-3", "Company C", false]]
const i_ttask_4_answers = [["/icicle-ttask-4", "Company A, Company C", false], ["/icicle-ttask-5", "Company B, Company C", true], ["/icicle-ttask-4", "Company B", false]]
const i_ttask_5_answers = [["/icicle-ttask-5", "Software Infrastructure", false], ["/end", "Consumer Electronics", true]]

const task_1_a_answers = [["/task-1-b-lines", "Company E", true], ["/task-1-a-lines", "Company D", false], ["/task-1-a-lines", "Company A", false]]
const task_1_b_answers = [["/task-2-a-lines", "Company D", true], ["/task-1-b-lines", "Company E", false], ["/task-1-b-lines", "Company D, Company E", false]]
const task_2_a_answers = [["/task-2-b-lines", "Company D", true], ["/task-2-a-lines", "Company E", false], ["/task-2-a-lines", "Company C", false]]
const task_2_b_answers = [["/task-3-a-lines", "Company C, Company E", true], ["/task-2-b-lines", "Company D, Company E", false], ["/task-2-b-lines", "Company C", false]]
const task_3_a_answers = [["/task-3-b-lines", "Company B, Company C", true], ["/task-3-a-lines", "Company A, Company B", false], ["/task-3-a-lines", "Company C", false]]
const task_3_b_answers = [["/task-4-a-lines", "Company A", true], ["/task-3-b-lines", "Company B", false], ["/task-3-b-lines", "Company C", false]]
const task_4_a_answers = [["/task-4-b-lines", "Company A", true], ["/task-4-a-lines", "Company A, Company C", false], ["/task-4-a-lines", "Company B", false]]
const task_4_b_answers = [["/task-5-a-lines", "Company B", true], ["/task-4-b-lines", "Company A", false], ["/task-4-b-lines", "Company D", false]]
const task_5_a_answers = [["/task-5-b-lines", "Consumer Electronics", true], ["/task-5-a-lines", "Software Infrastructure", false], ["/task-5-a-lines", "Company A", false]]
const task_5_b_answers = [["/task-6-a-lines", "Software Infrastructure", true], ["/task-5-b-lines", "Consumer Electronics", false], ["/task-5-b-lines", "Company C", false]]
const task_6_a_answers = [["/task-6-b-lines", "Software Infrastructure", true], ["/task-6-a-lines", "Consumer Electronics", false], ["/task-6-a-lines", "Company B", false]]
const task_6_b_answers = [["/end", "Consumer Electronics", true], ["/task-6-b-lines", "Software Infrastructure", false], ["/task-6-b-lines", "Company A", false]]



const router = createHashRouter([
  {
    path: "/",
    element: <Navbar/>
  },
  // stalactite plots with lines
  {
    path: "/task-1-a-lines",
    element: <StalactitePlot hierarchical_data={task_A} task_text={task_1_text} task_answers={task_1_a_answers} />
  },
  {
    path: "/task-1-b-lines",
    element: <StalactitePlot hierarchical_data={task_B} task_text={task_1_text} task_answers={task_1_b_answers} />
  },
  {
    path: "/task-2-a-lines",
    element: <StalactitePlot hierarchical_data={task_A} task_text={task_2_text} task_answers={task_2_a_answers} />
  },
  {
    path: "/task-2-b-lines",
    element: <StalactitePlot hierarchical_data={task_B} task_text={task_2_text} task_answers={task_2_b_answers} />
  },
  {
    path: "/task-3-a-lines",
    element: <StalactitePlot hierarchical_data={task_A} task_text={task_3_text} task_answers={task_3_a_answers} />
  },
  {
    path: "/task-3-b-lines",
    element: <StalactitePlot hierarchical_data={task_B} task_text={task_3_text} task_answers={task_3_b_answers} />
  },
  {
    path: "/task-4-a-lines",
    element: <StalactitePlot hierarchical_data={task_A} task_text={task_4_text} task_answers={task_4_a_answers} />
  },
  {
    path: "/task-4-b-lines",
    element: <StalactitePlot hierarchical_data={task_B} task_text={task_4_text} task_answers={task_4_b_answers} />
  },
  {
    path: "/task-5-a-lines",
    element: <StalactitePlot hierarchical_data={task_A} task_text={task_5_text} task_answers={task_5_a_answers} />
  },
  {
    path: "/task-5-b-lines",
    element: <StalactitePlot hierarchical_data={task_B} task_text={task_5_text} task_answers={task_5_b_answers} />
  },
  {
    path: "/task-6-a-lines",
    element: <StalactitePlot hierarchical_data={task_A} task_text={task_6_text} task_answers={task_6_a_answers} />
  },
  {
    path: "/task-6-b-lines",
    element: <StalactitePlot hierarchical_data={task_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  // stalactite plots without lines
  {
    path: "/task-1-a",
    element: <StalactitePlot hierarchical_data={task_A} lines={false} task_text={task_1_text} task_answers={task_1_a_answers} />
  },
  {
    path: "/task-1-b",
    element: <StalactitePlot hierarchical_data={task_B} lines={false} task_text={task_1_text} task_answers={task_1_b_answers} />
  },
  {
    path: "/task-2-a",
    element: <StalactitePlot hierarchical_data={task_A} lines={false} task_text={task_2_text} task_answers={task_2_a_answers} />
  },
  {
    path: "/task-2-b",
    element: <StalactitePlot hierarchical_data={task_B} lines={false} task_text={task_2_text} task_answers={task_2_b_answers} />
  },
  {
    path: "/task-3-a",
    element: <StalactitePlot hierarchical_data={task_A} lines={false} task_text={task_3_text} task_answers={task_3_a_answers} />
  },
  {
    path: "/task-3-b",
    element: <StalactitePlot hierarchical_data={task_B} lines={false} task_text={task_3_text} task_answers={task_3_b_answers} />
  },
  {
    path: "/task-4-a",
    element: <StalactitePlot hierarchical_data={task_A} lines={false} task_text={task_4_text} task_answers={task_4_a_answers} />
  },
  {
    path: "/task-4-b",
    element: <StalactitePlot hierarchical_data={task_B} lines={false} task_text={task_4_text} task_answers={task_4_b_answers} />
  },
  {
    path: "/task-5-a",
    element: <StalactitePlot hierarchical_data={task_A} lines={false} task_text={task_5_text} task_answers={task_5_a_answers} />
  },
  {
    path: "/task-5-b",
    element: <StalactitePlot hierarchical_data={task_B} lines={false} task_text={task_5_text} task_answers={task_5_b_answers} />
  },
  {
    path: "/task-6-a",
    element: <StalactitePlot hierarchical_data={task_A} lines={false} task_text={task_6_text} task_answers={task_6_a_answers} />
  },
  {
    path: "/task-6-b",
    element: <StalactitePlot hierarchical_data={task_B} lines={false} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  // Training for stalactite plots with lines
  {
    path: "/ttask-0",
    element: <Introduction task_data={ttask_0} task_text={ttask_0_text} vis_type={1}/>
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
    element: <div><div id='correct'></div><h1>You have completed the training! Click 'next' in the bottom right corner to continue.</h1></div> 
  },
  // Training for stalactite plots without lines (vis_type 2)
  {
    path: "/no-lines-ttask-0",
    element: <Introduction task_data={ttask_0} task_text={ttask_0_text} vis_type={2} />
  },
  {
    path: "/no-lines-ttask-1",
    element: <TrainingTask task_data={ttask_1} task_text={ttask_1_text} task_answers={nl_ttask_1_answers} />
  },
  {
    path: "/no-lines-ttask-2",
    element: <TrainingTask task_data={ttask_1} task_text={ttask_2_text} task_answers={nl_ttask_2_answers} />
  },
  {
    path: "/no-lines-ttask-3",
    element: <StalactiteTask lines={false} task_data={ttask_3} task_text={ttask_3_text} task_answers={nl_ttask_3_answers} />
  },
  {
    path: "/no-lines-ttask-4",
    element: <StalactiteTask lines={false} task_data={ttask_3} task_text={ttask_4_text} task_answers={nl_ttask_4_answers} />
  },
  {
    path: "/no-lines-ttask-5",
    element: <StalactiteTask lines={false} task_data={ttask_5} task_text={ttask_5_text} task_answers={nl_ttask_5_answers} />
  },
  // Training for icicle plots
  {
    path: "/icicle-ttask-0",
    element: <IntroIcicle task_data={ttask_0} task_text={i_ttask_0_text} vis_type={2} />
  },
  {
    path: "/icicle-ttask-1",
    element: <TrainingTaskIcicle task_data={ttask_1} task_text={i_ttask_1_text} task_answers={i_ttask_1_answers} />
  },
  {
    path: "/icicle-ttask-2",
    element: <TrainingTaskIcicle task_data={ttask_1} task_text={i_ttask_2_text} task_answers={i_ttask_2_answers} />
  },
  {
    path: "/icicle-ttask-3",
    element: <IcicleTask lines={false} task_data={ttask_3} task_text={i_ttask_3_text} task_answers={i_ttask_3_answers} />
  },
  {
    path: "/icicle-ttask-4",
    element: <IcicleTask lines={false} task_data={ttask_3} task_text={i_ttask_4_text} task_answers={i_ttask_4_answers} />
  },
  {
    path: "/icicle-ttask-5",
    element: <IcicleTask lines={false} task_data={ttask_5} task_text={i_ttask_5_text} task_answers={i_ttask_5_answers} />
  },
  {
    path: "/icicle",
    element: <IciclePlot hierarchical_data={icicle}/>
  },
  // Plots for study: stalactite
  {
    path: "/stalactite-energy-A",
    element: <StalactitePlot hierarchical_data={energy_data_A} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-energy-B",
    element: <StalactitePlot hierarchical_data={energy_data_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-energy-C",
    element: <StalactitePlot hierarchical_data={energy_data_C} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-finance-A",
    element: <StalactitePlot hierarchical_data={finance_data_A} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-finance-B",
    element: <StalactitePlot hierarchical_data={finance_data_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-finance-C",
    element: <StalactitePlot hierarchical_data={finance_data_C} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  // Plots for study: stalactite no lines
  {
    path: "/stalactite-no-lines-energy-A",
    element: <StalactitePlot lines={false} hierarchical_data={energy_data_A} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-no-lines-energy-B",
    element: <StalactitePlot lines={false} hierarchical_data={energy_data_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-no-lines-energy-C",
    element: <StalactitePlot lines={false} hierarchical_data={energy_data_C} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-no-lines-finance-A",
    element: <StalactitePlot lines={false} hierarchical_data={finance_data_A} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-no-lines-finance-B",
    element: <StalactitePlot lines={false} hierarchical_data={finance_data_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/stalactite-no-lines-finance-C",
    element: <StalactitePlot lines={false} hierarchical_data={finance_data_C} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  // Plots for study: icicle
  {
    path: "/icicle-energy-A",
    element: <IciclePlot hierarchical_data={energy_data_A} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/icicle-energy-B",
    element: <IciclePlot hierarchical_data={energy_data_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/icicle-energy-C",
    element: <IciclePlot hierarchical_data={energy_data_C} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/icicle-finance-A",
    element: <IciclePlot hierarchical_data={finance_data_A} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/icicle-finance-B",
    element: <IciclePlot hierarchical_data={finance_data_B} task_text={task_6_text} task_answers={task_6_b_answers} />
  },
  {
    path: "/icicle-finance-C",
    element: <IciclePlot hierarchical_data={finance_data_C} task_text={task_6_text} task_answers={task_6_b_answers} />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
