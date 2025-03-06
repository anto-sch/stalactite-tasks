import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider, Link } from "react-router-dom";
import StalactitePlot from './StalactitePlot';
import StalactiteTask from './StalactiteTask';
import Navbar from './NavBar';
import TrainingTask from './TrainingTask';
import Introduction from './Introduction';
import IntroIcicle from './IntroIcicle';
import IcicleTask from './IcicleTask';
import TrainingTaskIcicle from './TrainingTaskIcicle';

import IntroductionEnergy from './IntroductionEnergy';
import IntroIcicleEnergy from './IntroIcicleEnergy';
import IcicleTaskEnergy from './IcicleTaskEnergy';
import TrainingTaskIcicleEnergy from './TrainingTaskIcicleEnergy';

import task_A from './data/task_A.json';
import task_B from './data/task_B.json';
import stock_data from './data/stock_data.json';
import large_stock_data from './data/large_stock_data.json';
import stock_data_medium from './data/stock_data_medium.json';
import wide_training_data from './data/wide_training_data.json';
import ttask_0 from './data/ttask_0.json';
import ttask_1 from './data/ttask_1.json';
import ttask_3 from './data/ttask_3.json';
import ttask_5 from './data/ttask_5.json';
import ttask_0_energy from './data/ttask_0_energy.json';
import ttask_1_energy from './data/ttask_1_energy.json';
import ttask_3_energy from './data/ttask_3_energy.json';
import ttask_5_energy from './data/ttask_5_energy.json';
import icicle from './data/icicle.json';
import IciclePlot from './IciclePlot';

import line_training_1 from './data/line_training_1.png';
import line_training_2 from './data/line_training_2.png';
import line_training_1_en from './data/line_training_1_en.png';
import line_training_2_en from './data/line_training_2_en.png';

import energy_data_A from './data/exp_datasets/energy_data_A.json';
import energy_data_B from './data/exp_datasets/energy_data_B.json';
import energy_data_C from './data/exp_datasets/energy_data_C.json';

import finance_data_A from './data/exp_datasets/finance_data_A.json';
import finance_data_B from './data/exp_datasets/finance_data_B.json';
import finance_data_C from './data/exp_datasets/finance_data_C.json';
import StalactitePlotWide from './StalactitePlotWide';
import IciclePlotWide from './IciclePlotWide';
import StalactiteTaskWide from './StalactiteTaskWide';
import IcicleTaskWide from './IcicleTaskWide';

const task_1_text = "Which companies in the Consumer Electronics sector have a profit margin above sector average?"
const task_2_text = "Which companies in the Consumer Electronics sector have a profit margin below sector average?"
const task_3_text = "Which companies in the Software Infrastructure sector have a profit margin above sector average?"
const task_4_text = "Which companies in the Software Infrastructure sector have a profit margin below sector average?"
const task_5_text = "Which sectors in the Technology industry have a profit margin above industry average?"
const task_6_text = "Which sectors in the Technology industry have a profit margin below industry average?"


const ttask_0_text = `You are a financial investor using a visualization that allows you to compare the sales and profit margins of several companies. Sales is the company's income in a business year from selling its products. The profit margin is the percentage of sales that the company earns as profit. \n\nIn the visualization, companies are represented by boxes. The width of the box corresponds to the company's sales and the height to the profit margin.\n`
const ttask_1_text = "Let's look at an example. The diagram below shows sales and profit margin for three companies. A frequent task of investors is to compare and rank companies with respect to sales or profit margins. Remember, sales is represented by the width, profit margin by the height of the box. \n\nPlease rank the boxes from highest to lowest sales."
const ttask_2_text = "Please rank now the boxes from highest to lowest profit margin. \n\nRemember, sales is represented by the width, profit margin by the height of the box."
const ttask_3_text = "Typically, investors compare companies within industries, such as “Software Infrastructure”. As expected, the box of the industry shows the total of sales as its width and the average profit margin in the industry as its height. Note that the total of sales in an industry is just the sum of the sales of all its companies. If you want to compare a company's profit margin to the industry average you need to compare the industry's box height to the company's box height. \n\nWhich of the companies have a profit margin below the industry's average profit margin?"
const ttask_4_text = "Which of the companies have a profit margin above the industry's average profit margin?\n\nRemember, the box of the industry shows the total of sales as its width and the average profit margin in the industry as its height."
const ttask_5_text = "Investors group industries into sectors, such as “Technology”. The visualization follows the conventions as before. The total sales of the sector is represented by the width of the sector box. The average profit margin is represented by the height of the sector box.\n\nWhich of the industries has a profit margin above the sector's average profit margin?"
const ttask_6_text = "To facilitate the comparison, lines are added to the diagram showing the average profit margins of sector and industries.\n\nWhich color is the average line for the Technology sector?"
const ttask_8_text = "Investors commonly want to identify poorly performing companies. You can answer the following question by looking at the average line. \n\nWhich companies have a profit margin that is below industry average?"
const ttask_9_text = "The average line also helps you to identify companies that perform particularly well. \n\nWhich companies have a profit above industry average?"
const ttask_10_text = "As a financial advisor you commonly look at a portfolio of many companies that are grouped by their industries and sectors. If there are many companies the company name might only be legible with the help of a tooltip. Try it out by hovering the cursor over a box."
const ttask_11_text = "Now for some more compex analyses: for the sector with the lowest sales, identify the two industries with the lowest sales in the sector and list the company within each of these industries that has the highest sales."
const ttask_12_text = "For the sector with the highest profit margin, identify the industries with a profit margin below the sector average and list all the companies within these industries that have a profit margin above the industry average."
const ttask_13_text = "For the sector with the highest profit margin, identify the industry with the lowest sales and list the three companies with the lowest profit margin."

const i_ttask_0_text = `You are a financial investor using a visualization that allows you to compare the sales and profit margins of several companies. Sales is the company's income in a business year from selling its products. The profit margin is the percentage of sales that the company earns as profit. \n\nIn the visualization, companies are represented by boxes. The width of the box corresponds to the company's sales, the profit margin is written in the box.\n`
const i_ttask_1_text = "Let's look at an example. The diagram below shows sales and profit margin for three companies. A frequent task of investors is to compare and rank companies with respect to sales or profit margins. Remember, sales is represented by the width of the box, profit margin is written inside of it. \n\nPlease rank the boxes from highest to lowest sales."
const i_ttask_2_text = "Please rank now the boxes from highest to lowest profit margin. \n\nRemember, sales is represented by the width of the box, profit margin is written inside of it."
const i_ttask_3_text = "Typically, investors compare companies within industries, such as “Software Infrastructure”. As expected, the box of the industry shows the total of sales as its width and has the average profit margin written inside of it. Note that the total of sales in an industry is just the sum of the sales of all its companies. If you want to compare a company's profit margin to the industry average you need to compare the industry's box label to the company's box label. \n\nWhich of the companies have a profit margin below the industry's average profit margin?"
const i_ttask_4_text = "Which of the companies have a profit margin above the industry's average profit margin?\n\nRemember, the box of the industry shows the total of sales as its width and the average profit margin in the industry as its height."
const i_ttask_5_text = "Investors group industries into sectors, such as “Technology”. The visualization follows the conventions as before. The total sales of the sector is represented by the width of the sector box. The average profit margin is written inside of the sector box.\n\nWhich of the industries has a profit margin above the sector's average profit margin?"
const i_ttask_6_text = "As a financial advisor you commonly look at a portfolio of many companies that are grouped by their industries and sectors. If there are many companies the company name might only be legible with the help of a tooltip. Try it out by hovering the cursor over a box."
const i_ttask_7_text = "Now for some more compex analyses: for the sector with the lowest sales, identify the two industries with the lowest sales in the sector and list the company within each of these industries that has the highest sales."
const i_ttask_8_text = "For the sector with the highest profit margin, identify the industries with a profit margin below the sector average and list all the companies within these industries that have a profit margin above the industry average."
const i_ttask_9_text = "For the sector with the highest profit margin, identify the industry with the lowest sales and list the three companies with the lowest profit margin."

const ttask_0_text_energy = `You are a consultant for an energy provider using a visualization that allows you to compare the number of people in an apartment and per-person energy use of several apartments. The per-person energy use are the kWh/person consumed by the apartment in a week. \n\nIn the visualization, apartments are represented by boxes. The width of the box corresponds to the number of people in the and the height to the per-person energy use.\n`
const ttask_1_text_energy = "Let's look at an example. The diagram below shows the number of people in the household and the per-person energy use for three apartments. A frequent task of utility companies is to compare and rank apartments with respect to the number of people living there or per-person energy use. Remember, the number of people is represented by the width, per-person energy use by the height of the box. \n\nPlease rank the boxes from most to least people living in an apartment."
const ttask_2_text_energy = "Please rank now the boxes from highest to lowest per-person energy use. \n\nRemember, the number of people in the apartment is represented by the width, per-person energy use by the height of the box."
const ttask_3_text_energy = "Typically, utility companies compare apartments within buildings, such as “Beach Road 1010”. As expected, the box of the building shows the total of people living there as its width and the average per-person energy use in the building as its height. Note that the total number of people living in a building is just the sum of the people living in its apartments. If you want to compare an apartment’s per-person energy use to the building average you need to compare the building's box height to the apartment's box height. \n\nWhich of the apartments have a per-person energy use below the sector's average per-person energy use?"
const ttask_4_text_energy = "Which of the apartments have a per-person energy use above the building's average per-person energy use?\n\nRemember, the box of the building shows the total of people living there as its width and the average per-person energy use in the building as its height."
const ttask_5_text_energy = "Utility companies group buildings based on the street they are on, such as “Beach Road”. The visualization follows the conventions as before. The total number of people on the street is represented by the width of the street box. The average per-person energy use is represented by the height of the street box.\n\nWhich of the buildings has a per-person energy use above the street's average per-person energy use?"
const ttask_6_text_energy = "To facilitate the comparison, lines are added to the diagram showing the average per-person energy use of the street and the buildings.\n\nWhich color is the average line for the street called Beach Road?"
const ttask_8_text_energy = "Utility companies commonly want to identify households that use more energy than others. You can answer the following question by looking at the average line. \n\nWhich apartment has an energy use that is above building average?"
const ttask_9_text_energy = "The average line also helps you to identify households that use less energy than others. \n\nWhich apartment has an energy use that is below building average?"

const i_ttask_0_text_energy = `You are a consultant for an energy provider using a visualization that allows you to compare the number of people in an apartment and per-person energy use of several apartments. The per-person energy use are the kWh/person consumed by the apartment in a week. \n\nIn the visualization, apartments are represented by boxes. The width of the box corresponds to the number of people in the and the per-person energy use is written inside the box.\n`
const i_ttask_1_text_energy = "Let's look at an example. The diagram below shows the number of people in the household and the per-person energy use for three apartments. A frequent task of utility companies is to compare and rank apartments with respect to the number of people living there or per-person energy use. Remember, the number of people is represented by the width, per-person energy use is written inside the box. \n\nPlease rank the boxes from most to least people living in an apartment."
const i_ttask_2_text_energy = "Please rank now the boxes from highest to lowest per-person energy use. \n\nRemember, the number of people is represented by the width, per-person energy use is written inside the box."
const i_ttask_3_text_energy = "Typically, utility companies compare apartments within buildings, such as “Beach Road 1010”. As expected, the box of the building shows the total of people living there as its width and the average per-person energy use in the building as its height. Note that the total number of people living in a building is just the sum of the people living in its apartments. If you want to compare an apartment’s per-person energy use to the building average you need to compare the building's box label to the apartment's box label. \n\nWhich of the apartments have a per-person energy use below the sector's average per-person energy use?"
const i_ttask_4_text_energy = "Which of the apartments have a per-person energy use above the building's average per-person energy use?\n\nRemember, the box of the building shows the total of people living there as its width and has the average per-person energy use in the building written inside it."
const i_ttask_5_text_energy = "Utility companies group buildings based on the street they are on, such as “Beach Road”. The visualization follows the conventions as before. The total number of people on the street is represented by the width of the street box. The average per-person energy use is written inside the street box.\n\nWhich of the buildings has a per-person energy use above the street's average per-person energy use?"

const ttask_1_answers = [["/ttask-1", "Company B, Company C, Company A", false], ["/ttask-2", "Company A, Company C, Company B", true], ["/ttask-1", "Company C, Company A, Company B", false]]
const ttask_2_answers = [["/ttask-2", "Company A, Company C, Company B", false], ["/ttask-2", "Company C, Company A, Company B", false], ["/ttask-3", "Company B, Company C, Company A", true]]
const ttask_3_answers = [["/ttask-4", "MSFT", true], ["/ttask-3", "MSFT, FTNT", false], ["/ttask-3", "GEN", false]]
const ttask_4_answers = [["/ttask-4", "MSFT, GEN", false], ["/ttask-5", "FTNT, GEN", true], ["/ttask-4", "FTNT", false]]
const ttask_5_answers = [["/ttask-5", "Software Infrastructure", false], ["/ttask-6", "Consumer Electronics", true]]
const ttask_6_answers = [["/ttask-7", "Green", true], ["/ttask-6", "Red", false]]
const ttask_8_answers = [["/ttask-8", "FTNT, GEN", false], ["/ttask-9", "MSFT", true], ["/ttask-8", "GEN", false]]
const ttask_9_answers = [["/ttask-9", "MSFT", false], ["/ttask-10", "FTNT, GEN", true], ["/ttask-9", "MSFT, GEN", false]]
const ttask_10_answers = [["/ttask-11", "Got it!", true]]
const ttask_11_answers = [["/ttask-11", "GOOG, META", false], ["/ttask-12", "VZ, DIS", true], ["/ttask-11", "BAC, JPM", false]]
const ttask_12_answers = [["/ttask-13", "AFL, PFG, ACGL, CB, CINF", true], ["/ttask-12", "BAC, C, JPM, MS", false], ["/ttask-12", "MET, PRU, ALL, PGR, TRV", false]]
const ttask_13_answers = [["/ttask-13", "PNC, TFC, USB", false], ["/ttask-13", "DIS, LYV, NFLX", false], ["/end", "MET, PFG, PRU", true]]

const nl_ttask_1_answers = [["/no-lines-ttask-1", "Company B, Company C, Company A", false], ["/no-lines-ttask-2", "Company A, Company C, Company B", true], ["/no-lines-ttask-1", "Company C, Company A, Company B", false]]
const nl_ttask_2_answers = [["/no-lines-ttask-2", "Company A, Company C, Company B", false], ["/no-lines-ttask-2", "Company C, Company A, Company B", false], ["/no-lines-ttask-3", "Company B, Company C, Company A", true]]
const nl_ttask_3_answers = [["/no-lines-ttask-4", "Company A", true], ["/no-lines-ttask-3", "Company A, Company B", false], ["/no-lines-ttask-3", "Company C", false]]
const nl_ttask_4_answers = [["/no-lines-ttask-4", "Company A, Company C", false], ["/no-lines-ttask-5", "Company B, Company C", true], ["/no-lines-ttask-4", "Company B", false]]
const nl_ttask_5_answers = [["/no-lines-ttask-5", "Software Infrastructure", false], ["/end", "Consumer Electronics", true]]

const i_ttask_1_answers = [["/icicle-ttask-1", "Company B, Company C, Company A", false], ["/icicle-ttask-2", "Company A, Company C, Company B", true], ["/icicle-ttask-1", "Company C, Company A, Company B", false]]
const i_ttask_2_answers = [["/icicle-ttask-2", "Company A, Company C, Company B", false], ["/icicle-ttask-2", "Company C, Company A, Company B", false], ["/icicle-ttask-3", "Company B, Company C, Company A", true]]
const i_ttask_3_answers = [["/icicle-ttask-4", "MSFT", true], ["/icicle-ttask-3", "MSFT, FTNT", false], ["/icicle-ttask-3", "GEN", false]]
const i_ttask_4_answers = [["/icicle-ttask-4", "MSFT, GEN", false], ["/icicle-ttask-5", "FTNT, GEN", true], ["/icicle-ttask-4", "FTNT", false]]
const i_ttask_5_answers = [["/icicle-ttask-5", "Software Infrastructure", false], ["/icicle-ttask-6", "Consumer Electronics", true]]
const i_ttask_6_answers = [["/icicle-ttask-7", "Got it!", true]]
const i_ttask_7_answers = [["/icicle-ttask-7", "GOOG, META", false], ["/icicle-ttask-8", "VZ, DIS", true], ["/icicle-ttask-7", "BAC, JPM", false]]
const i_ttask_8_answers = [["/icicle-ttask-9", "AFL, PFG, ACGL, CB, CINF", true], ["/icicle-ttask-8", "BAC, C, JPM, MS", false], ["/icicle-ttask-8", "MET, PRU, ALL, PGR, TRV", false]]
const i_ttask_9_answers = [["/icicle-ttask-9", "PNC, TFC, USB", false], ["/icicle-ttask-9", "DIS, LYV, NFLX", false], ["/end", "MET, PFG, PRU", true]]

const ttask_1_answers_energy = [["/ttask-1-energy", "Apartment B, Apartment C, Apartment A", false], ["/ttask-2-energy", "Apartment A, Apartment C, Apartment B", true], ["/ttask-1-energy", "Apartment C, Apartment A, Apartment B", false]]
const ttask_2_answers_energy = [["/ttask-2-energy", "Apartment A, Apartment C, Apartment B", false], ["/ttask-2-energy", "Apartment C, Apartment A, Apartment B", false], ["/ttask-3-energy", "Apartment B, Apartment C, Apartment A", true]]
const ttask_3_answers_energy = [["/ttask-4-energy", "Apartment A", true], ["/ttask-3-energy", "Apartment A, Apartment B", false], ["/ttask-3-energy", "Apartment C", false]]
const ttask_4_answers_energy = [["/ttask-4-energy", "Apartment A, Apartment C", false], ["/ttask-5-energy", "Apartment B, Apartment C", true], ["/ttask-4-energy", "Apartment B", false]]
const ttask_5_answers_energy = [["/ttask-5-energy", "Beach Road 1009", false], ["/ttask-6-energy", "Beach Road 1010", true]]
const ttask_6_answers_energy = [["/ttask-7-energy", "Red", true], ["/ttask-6-energy", "Yellow", false]]
const ttask_8_answers_energy = [["/ttask-9-energy", "Apartment B, Apartment C", true], ["/ttask-8-energy", "Apartment A", false], ["/ttask-8-energy", "Apartment C", false]]
const ttask_9_answers_energy = [["/end", "Apartment A", true], ["/ttask-9-energy", "Apartment B, Apartment C", false], ["/ttask-9-energy", "Apartment A, Apartment C", false]]

const nl_ttask_1_answers_energy = [["/no-lines-ttask-1-energy", "Apartment B, Apartment C, Apartment A", false], ["/no-lines-ttask-2-energy", "Apartment A, Apartment C, Apartment B", true], ["/no-lines-ttask-1-energy", "Apartment C, Apartment A, Apartment B", false]]
const nl_ttask_2_answers_energy = [["/no-lines-ttask-2-energy", "Apartment A, Apartment C, Apartment B", false], ["/no-lines-ttask-2-energy", "Apartment C, Apartment A, Apartment B", false], ["/no-lines-ttask-3-energy", "Apartment B, Apartment C, Apartment A", true]]
const nl_ttask_3_answers_energy = [["/no-lines-ttask-4-energy", "Apartment A", true], ["/no-lines-ttask-3-energy", "Apartment A, Apartment B", false], ["/no-lines-ttask-3-energy", "Apartment C", false]]
const nl_ttask_4_answers_energy = [["/no-lines-ttask-4-energy", "Apartment A, Apartment C", false], ["/no-lines-ttask-5-energy", "Apartment B, Apartment C", true], ["/no-lines-ttask-4-energy", "Apartment B", false]]
const nl_ttask_5_answers_energy = [["/no-lines-ttask-5-energy", "Beach Road 1009", false], ["/end", "Beach Road 1010", true]]

const i_ttask_1_answers_energy = [["/icicle-ttask-1-energy", "Apartment B, Apartment C, Apartment A", false], ["/icicle-ttask-2-energy", "Apartment A, Apartment C, Apartment B", true], ["/icicle-ttask-1-energy", "Apartment C, Apartment A, Apartment B", false]]
const i_ttask_2_answers_energy = [["/icicle-ttask-2-energy", "Apartment A, Apartment C, Apartment B", false], ["/icicle-ttask-2-energy", "Apartment C, Apartment A, Apartment B", false], ["/icicle-ttask-3-energy", "Apartment B, Apartment C, Apartment A", true]]
const i_ttask_3_answers_energy = [["/icicle-ttask-4-energy", "Apartment A", true], ["/icicle-ttask-3-energy", "Apartment A, Apartment B", false], ["/icicle-ttask-3-energy", "Apartment C", false]]
const i_ttask_4_answers_energy = [["/icicle-ttask-4-energy", "Apartment A, Apartment C", false], ["/icicle-ttask-5-energy", "Apartment B, Apartment C", true], ["/icicle-ttask-4-energy", "Apartment B", false]]
const i_ttask_5_answers_energy = [["/icicle-ttask-5-energy", "Beach Road 1009", false], ["/end", "Beach Road 1010", true]]

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
    path: "/stock_data",
    element: <StalactitePlot hierarchical_data={stock_data} task_text={"Which companies in the Seminconductors industry have a profit margin above sector average?"} task_answers={task_1_a_answers} />
  },
  {
    path: "/large_stock_data",
    element: <StalactitePlotWide hierarchical_data={stock_data_medium} task_text={"Which companies in the Seminconductors industry have a profit margin above sector average?"} task_answers={task_1_a_answers} />
  },
  {
    path: "/large_stock_data_icicle",
    element: <IciclePlotWide hierarchical_data={stock_data_medium} task_text={"Which companies in the Seminconductors industry have a profit margin above sector average?"} task_answers={task_1_a_answers} />
  },
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
    path: "/ttask-7",
    element: <div style={{textAlign: "left", padding: "10px 200px", fontSize: "20px"}}><div id="alert" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#f55d42", color: "white" }}><h3>Not correct! Please try again.</h3></div>
    <div id="correct" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#4ccf40", color: "white" }}><h3>Correct!</h3></div>
    <p style={{ fontSize: "14px" }}>The average line of the sector lets you compare the profit margin of an industry to the average profit margin in the sector. In the same way, you can compare the profit margin of a company to the average profit margin in the industry. </p><img src={line_training_1} style={{width: "353px", height: "144px", marginLeft: "auto", marginRight: "auto", display: "block"}}></img><p style={{ fontSize: "14px" }}>With the average line you can easily see which companies have a <span style={{color: "red"}}>below</span> average profit margin and which have an <span style={{color: "green"}}>above</span> average profit margin.</p><img src={line_training_2} style={{width: "353px", height: "144px", marginLeft: "auto", marginRight: "auto", display: "block"}}></img><div style={{textAlign: "center"}}><Link className="button" to="/ttask-8" style={{padding: "8px 20px", marginTop: "20px", width: "100px"}}>Got it!</Link></div></div> 
  },
  {
    path: "/ttask-8",
    element: <StalactiteTask lines={true} task_data={ttask_3} task_text={ttask_8_text} task_answers={ttask_8_answers} />
  },
  {
    path: "/ttask-9",
    element: <StalactiteTask lines={true} task_data={ttask_3} task_text={ttask_9_text} task_answers={ttask_9_answers} />
  },
  {
    path: "/ttask-10",
    element: <StalactiteTaskWide lines={true} hierarchical_data={wide_training_data} task_text={ttask_10_text} task_answers={ttask_10_answers} />
  },
  {
    path: "/ttask-11",
    element: <StalactiteTaskWide lines={true} hierarchical_data={wide_training_data} task_text={ttask_11_text} task_answers={ttask_11_answers} />
  },
  {
    path: "/ttask-12",
    element: <StalactiteTaskWide lines={true} hierarchical_data={wide_training_data} task_text={ttask_12_text} task_answers={ttask_12_answers} />
  },
  {
    path: "/ttask-13",
    element: <StalactiteTaskWide lines={true} hierarchical_data={wide_training_data} task_text={ttask_13_text} task_answers={ttask_13_answers} />
  },
  {
    path: "/end",
    element: <div><div id="alert" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#f55d42", color: "white" }}><h3>Not correct! Please try again.</h3></div>
    <div id="correct" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#4ccf40", color: "white" }}><h3>Correct!</h3></div>
    <h2>You have completed the training! Click 'Next' in the bottom right corner to continue.</h2></div> 
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
    path: "/icicle-ttask-6",
    element: <IcicleTaskWide lines={true} hierarchical_data={wide_training_data} task_text={i_ttask_6_text} task_answers={i_ttask_6_answers} />
  },
  {
    path: "/icicle-ttask-7",
    element: <IcicleTaskWide lines={true} hierarchical_data={wide_training_data} task_text={i_ttask_7_text} task_answers={i_ttask_7_answers} />
  },
  {
    path: "/icicle-ttask-8",
    element: <IcicleTaskWide lines={true} hierarchical_data={wide_training_data} task_text={i_ttask_8_text} task_answers={i_ttask_8_answers} />
  },
  {
    path: "/icicle-ttask-9",
    element: <IcicleTaskWide lines={true} hierarchical_data={wide_training_data} task_text={i_ttask_9_text} task_answers={i_ttask_9_answers} />
  },
  {
    path: "/icicle",
    element: <IciclePlot hierarchical_data={icicle}/>
  },
  // Training for stalactite plots with lines: energy use
  {
    path: "/ttask-0-energy",
    element: <IntroductionEnergy task_data={ttask_0_energy} task_text={ttask_0_text_energy} vis_type={1}/>
  },
  {
    path: "/ttask-1-energy",
    element: <TrainingTask task_data={ttask_1_energy} task_text={ttask_1_text_energy} task_answers={ttask_1_answers_energy} />
  },
  {
    path: "/ttask-2-energy",
    element: <TrainingTask task_data={ttask_1_energy} task_text={ttask_2_text_energy} task_answers={ttask_2_answers_energy} />
  },
  {
    path: "/ttask-3-energy",
    element: <StalactiteTask lines={false} task_data={ttask_3_energy} task_text={ttask_3_text_energy} task_answers={ttask_3_answers_energy} />
  },
  {
    path: "/ttask-4-energy",
    element: <StalactiteTask lines={false} task_data={ttask_3_energy} task_text={ttask_4_text_energy} task_answers={ttask_4_answers_energy} />
  },
  {
    path: "/ttask-5-energy",
    element: <StalactiteTask lines={false} task_data={ttask_5_energy} task_text={ttask_5_text_energy} task_answers={ttask_5_answers_energy} />
  },
  {
    path: "/ttask-6-energy",
    element: <StalactiteTask lines={true} task_data={ttask_5_energy} task_text={ttask_6_text_energy} task_answers={ttask_6_answers_energy} />
  },
  {
    path: "/ttask-7-energy",
    element: <div style={{textAlign: "left", padding: "10px 200px", fontSize: "20px"}}><div id="alert" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#f55d42", color: "white" }}><h3>Not correct! Please try again.</h3></div>
    <div id="correct" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#4ccf40", color: "white" }}><h3>Correct!</h3></div>
    <p>The average line of the street lets you compare the energy use of a building to the average energy use on that street. In the same way, you can compare the energy use of an apartment to the average energy use in that building. </p><img src={line_training_1_en} style={{width: "415px", height: "169px", marginLeft: "auto", marginRight: "auto", display: "block"}}></img><p>With the average line you can easily see which apartments have an energy use <span style={{color: "red"}}>below</span> building average and which have an energy use <span style={{color: "green"}}>above</span> building average.</p><img src={line_training_2_en} style={{width: "415px", height: "169px", marginLeft: "auto", marginRight: "auto", display: "block"}}></img><div style={{textAlign: "center"}}><Link className="button" to="/ttask-8-energy" style={{marginTop: "30px", width: "100px"}}>Got it!</Link></div></div> 
  },
  {
    path: "/ttask-8-energy",
    element: <StalactiteTask lines={true} task_data={ttask_3_energy} task_text={ttask_8_text_energy} task_answers={ttask_8_answers_energy} />
  },
  {
    path: "/ttask-9-energy",
    element: <StalactiteTask lines={true} task_data={ttask_3_energy} task_text={ttask_9_text_energy} task_answers={ttask_9_answers_energy} />
  },
  // {
  //   path: "/end",
  //   element: <div><div id='correct'></div><h1>You have completed the training! Click 'next' in the bottom right corner to continue.</h1></div> 
  // },
  // Training for stalactite plots without lines (vis_type 2)
  {
    path: "/no-lines-ttask-0-energy",
    element: <IntroductionEnergy task_data={ttask_0_energy} task_text={ttask_0_text_energy} vis_type={2} />
  },
  {
    path: "/no-lines-ttask-1-energy",
    element: <TrainingTask task_data={ttask_1_energy} task_text={ttask_1_text_energy} task_answers={nl_ttask_1_answers_energy} />
  },
  {
    path: "/no-lines-ttask-2-energy",
    element: <TrainingTask task_data={ttask_1_energy} task_text={ttask_2_text_energy} task_answers={nl_ttask_2_answers_energy} />
  },
  {
    path: "/no-lines-ttask-3-energy",
    element: <StalactiteTask lines={false} task_data={ttask_3_energy} task_text={ttask_3_text_energy} task_answers={nl_ttask_3_answers_energy} />
  },
  {
    path: "/no-lines-ttask-4-energy",
    element: <StalactiteTask lines={false} task_data={ttask_3_energy} task_text={ttask_4_text_energy} task_answers={nl_ttask_4_answers_energy} />
  },
  {
    path: "/no-lines-ttask-5-energy",
    element: <StalactiteTask lines={false} task_data={ttask_5_energy} task_text={ttask_5_text_energy} task_answers={nl_ttask_5_answers_energy} />
  },
  // Training for icicle plots
  {
    path: "/icicle-ttask-0-energy",
    element: <IntroIcicleEnergy task_data={ttask_0_energy} task_text={i_ttask_0_text_energy} vis_type={2} />
  },
  {
    path: "/icicle-ttask-1-energy",
    element: <TrainingTaskIcicleEnergy task_data={ttask_1_energy} task_text={i_ttask_1_text_energy} task_answers={i_ttask_1_answers_energy} />
  },
  {
    path: "/icicle-ttask-2-energy",
    element: <TrainingTaskIcicleEnergy task_data={ttask_1_energy} task_text={i_ttask_2_text_energy} task_answers={i_ttask_2_answers_energy} />
  },
  {
    path: "/icicle-ttask-3-energy",
    element: <IcicleTaskEnergy lines={false} task_data={ttask_3_energy} task_text={i_ttask_3_text_energy} task_answers={i_ttask_3_answers_energy} />
  },
  {
    path: "/icicle-ttask-4-energy",
    element: <IcicleTaskEnergy lines={false} task_data={ttask_3_energy} task_text={i_ttask_4_text_energy} task_answers={i_ttask_4_answers_energy} />
  },
  {
    path: "/icicle-ttask-5-energy",
    element: <IcicleTaskEnergy lines={false} task_data={ttask_5_energy} task_text={i_ttask_5_text_energy} task_answers={i_ttask_5_answers_energy} />
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
