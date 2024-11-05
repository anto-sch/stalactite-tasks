import { useEffect, useRef } from 'react';
import React from 'react';
import * as d3 from 'd3';
import './StalactiteTask.css'
import { useNavigate } from "react-router-dom";

function IcicleTask({ lines, task_data, task_text, task_answers }) {
    const navigate = useNavigate();

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 1200;
        const height = 500;

        const yScale = 8;
      
        // Create the color scale.
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateHslLong(d3.color("hsl(39, 50%, 75%)"), d3.color("hsl(300, 50%, 50%)")), hierarchical_data.children.length + 2));
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(15, 52%, 62%)"), d3.color("hsl(64, 52%, 62%)"), d3.color("hsl(197, 23%, 62%)")]), task_data.children.length + 2));
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(138, 18%, 58%)"), d3.color("hsl(11, 76%, 58%)"), d3.color("hsl(50, 91%, 44%)")]), 3));
        

        // Compute the layout.
        const hierarchy = d3.hierarchy(task_data)
            .sum(d => d.add_val)
            // .sort((a, b) => b.height - a.height || b.value - a.value);

        const root = d3.partition()
            .size([width, (hierarchy.height + 1) * height / 3])
          (hierarchy);

        svg
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 50%; height: auto; font: 10px sans-serif")
            // .attr("transform", "scaleY(0.3)");
    
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
        .data(root.descendants())
        .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);
    
        const rect = cell.append("rect")
            .attr("height", d => d.y1 - d.y0 - 1)
            .attr("width", d => rectWidth(d)-1)
            .attr("fill", d => {
              if (!d.depth) return color(0);
              // while (d.depth > 1) d = d.parent;
              return color(d.depth);
              })
            .style("cursor", "pointer")
            .on("click", clicked);

        const text = cell.append("text")
          .style("user-select", "none")
          .attr("pointer-events", "none")
          .attr("x", 15)
          .attr("y", 40)
          .attr("fill-opacity", function(d) { return +labelVisible(d) });
      
        text.append("tspan")
          .style("font-size", "26px")
          .text(d => d.data.name);

        const label = cell.append("text")
          .style("user-select", "none")
          .attr("pointer-events", "none")
          .attr("x", 15)
          .attr("y", 80)
          .attr("fill-opacity", function(d) { return +labelVisible(d) });

        label.append("tspan")
          .style("font-size", "16px")
          .text(d => "\nprofit margin: ");

        label.append("tspan")
          .style("font-size", "22px")
          .text(d => Math.round(rectLabel(d)) + "%");
      
        // const format = d3.format(",d");
        // const tspan = text.append("tspan")
        //     .attr("fill-opacity", d => labelVisible(d) * 0.7)
        //     .text(d => ` ${format(d.value)}`);
      
        // cell.append("title")
        //     .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
        
        console.log("rect", rect)
    
        // On click, change the focus and transitions it into view.
        let focus = root;

        function clicked(event, p) {
            focus = focus === p ? p = p.parent : p;

            root.each(d => d.target = {
                y0: d.y0 - p.y0,
                y1: d.y1 - p.y0,
                x0: (d.x0 - p.x0) / (p.x1 - p.x0) * width,
                x1: (d.x1 - p.x0) / (p.x1 - p.x0) * width
            });

            const t = cell.transition().duration(750)
                .attr("transform", d => `translate(${d.target.x0},${d.target.y0})`);

            rect.transition(t).attr("width", d => rectWidth(d.target));
            text.transition(t).attr("fill-opacity", function(d) { return +labelVisible(d.target) });
            // tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
        }
    
        function rectWidth(d) {
            return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
        }

        function rectLabel(d) {
          let height_factor = 0;

          if (d.children) {
              for (const child of d.children) {
                  height_factor += rectLabel(child)*child.value;
              }
          } else {
              if (d.data.add_val !== undefined) height_factor = d.data.ratio_val;
              return height_factor;
          }
          return height_factor/d.value;
        }
    
        function labelVisible(d) {
            return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 75;
          }

        svg.selectAll("g")
          .sort((a, b) => d3.ascending(a.height, b.height))
        
      },
      [task_data, lines]
    );

    function onAnswer(answer) {
        let clockTimeout = null;

        if (!answer[2] && document.getElementById('alert')) {
            document.getElementById('alert').style.display = 'block'
            clearTimeout(clockTimeout)
            clockTimeout = setTimeout(() => {
            document.getElementById('alert').style.display = 'none'
            }, 1000)
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
                { task_answers.length === 3 ? <button className="button" onClick={() => onAnswer(task_answers[2])}>{task_answers[2][1]}</button> : null }
            </div>
            : null }
        </div>
    );
  }
  
  
  export default IcicleTask;
  
