import { useEffect, useRef } from 'react';
import React from 'react';
import * as d3 from 'd3';
import './StalactiteTask.css'
import { useNavigate } from "react-router-dom";


function IntroIcicle({ task_data, task_text, vis_type }) {
    const navigate = useNavigate();

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 1200;
        const height = 900;
      
        const color = d3.color("hsl(15, 52%, 62%)");

        svg
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 50%; height: auto; font: 10px sans-serif");
    
        /*
        This line is needed so that we can calculate the length of the text labels
        in the labelVisible function during the initial rendering of the visualization.
        Without this line, all labels would be shown before any node is clicked,
        since getComputedTextLength returns 0 for text elements that aren't added
        to the DOM. This line lets us add the labels to the DOM before we calculate
        their length. The same technique is used in this notebook:
        https://observablehq.com/@analyzer2004/fancy-radial-bars
        */
        // yield svg.node();

        svg.selectAll("*").remove();        
        
        svg.append("rect")
            .attr("height", task_data.ratio_val*6)
            .attr("width", task_data.add_val*6)
            .attr("fill", color);

        const text = svg.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 15)
            .attr("y", 45)
      
        text.append("tspan")
            .style("font-size", "35px")
            .text(task_data.name);
      
        const format = d3.format(",d");
        text.append("tspan")
            .style("white-space", "pre")
            .style("font-size", "28px")
            .text(d => `\nSales ${format(task_data.add_val)}$ milion\nProfit margin ${format(task_data.ratio_val)}%`);

        
      },
      [task_data]
    );

    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <div style={{ marginTop: "20px", paddingBottom: "30px", marginRight: "150px", marginLeft: "180px", textAlign: "left" }}>
                <span style={{ fontSize: "20px", whiteSpace: "pre-line" }}>{task_text}</span>
            </div>
            {/* <div style={{ width: "75%", margin: "auto" }}> */}
                <svg
                ref={ref}
                >
                </svg>
            {/* </div> */}
            <div style={{position: "absolute", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", bottom: "40px", width: "800px"}}>
                <button className="button" onClick={() =>  navigate("/icicle-ttask-1") }>Continue</button>
            </div>
        </div>
    );
  }
  
  
  export default IntroIcicle;
  
