import { useEffect, useRef } from 'react';
import React from 'react';
import * as d3 from 'd3';
import './StalactiteTask.css';
import { useNavigate } from "react-router-dom";


function TrainingTaskIcicle({ task_data, task_text, task_answers }) {
    const navigate = useNavigate();

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 900;
        const height = 400;
        let posX = 0;
      
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(138, 18%, 58%)"), d3.color("hsl(11, 76%, 58%)"), d3.color("hsl(50, 91%, 44%)")]), 3));

        svg
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif");
    
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
    
        const cell = svg
            .selectAll("g")
            .data(task_data)
            .join("g")
            .attr("transform", function(d, i) {return `translate(${getPosX(d.add_val*2)},0)`});
        
        cell.append("rect")
            .attr("height", 100)
            .attr("width", d => d.add_val*2)
            .attr("fill", (d,i) => {
                return color(i);
                })
            .style("cursor", "pointer");

        const text = cell.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 15)
            .attr("y", 30);
      
        text.append("tspan")
            .style("font-size", "20px")
            .text(d => d.name);
      
            const label = cell.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 15)
            .attr("y", 80);
  
        // label.append("tspan")
        //     .style("font-size", "16px")
        //     .text(d => "\nprofit margin: ");
  
        label.append("tspan")
            .style("font-size", "20px")
            .text(d => Math.round(d.ratio_val));

        // Calculate PosX
        function getPosX(rectWidth, index) {
            const newPosX = posX; // Return this position
            posX += rectWidth + 3; // prepare position for next node
            return newPosX;
        }
        
      },
      [task_data]
    );

    function onAnswer(answer) {
        let clockTimeout = null;

        if (!answer[2] && document.getElementById('alert')) {
            document.getElementById('alert').style.display = 'block'
            clearTimeout(clockTimeout)
            clockTimeout = setTimeout(() => {
            document.getElementById('alert').style.display = 'none'
            }, 2000)
        } else if (document.getElementById('correct')) {
            console.log("correct")
            document.getElementById('correct').style.display = 'block'
            clearTimeout(clockTimeout)
            clockTimeout = setTimeout(() => {
            document.getElementById('correct').style.display = 'none'
            }, 500)
        }

        navigate(answer[0]);
    }

    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <div id="alert" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#f55d42", color: "white" }}><h3>Not correct! Please try again.</h3></div>
            <div id="correct" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#4ccf40", color: "white" }}><h3>Correct!</h3></div>
            <div style={{ marginTop: "20px", paddingBottom: "30px", marginRight: "150px", marginLeft: "180px", textAlign: "left" }}>
                <span style={{ fontSize: "18px", whiteSpace: "pre-line" }}>{task_text}</span>
            </div>
            {/* <div style={{ width: "75%", margin: "auto" }}> */}
                <svg
                ref={ref}
                >
                </svg>
            {/* </div> */}
            {task_answers ? 
            <div style={{position: "absolute", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", bottom: "40px", width: "800px"}}>
                <button className="button" onClick={() => onAnswer(task_answers[0])}>{task_answers[0][1]}</button>
                <button className="button" onClick={() => onAnswer(task_answers[1])}>{task_answers[1][1]}</button>
                <button className="button" onClick={() => onAnswer(task_answers[2])}>{task_answers[2][1]}</button>
            </div>
            : null }
        </div>
    );
  }
  
  
  export default TrainingTaskIcicle;
  
