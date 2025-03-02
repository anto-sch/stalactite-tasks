import { useEffect, useRef } from 'react';
import React from 'react';
import * as d3 from 'd3';
import { useNavigate } from "react-router-dom";

function StalactitePlotWide({ hierarchical_data, lines=true, task_text, task_answers }) {

    const navigate = useNavigate();

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 1800;
        const height = 900;

        const yScale = 6;
      
        // Create the color scale.
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateHslLong(d3.color("hsl(39, 50%, 75%)"), d3.color("hsl(300, 50%, 50%)")), hierarchical_data.children.length + 2));
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(15, 52%, 62%)"), d3.color("hsl(64, 52%, 62%)"), d3.color("hsl(197, 23%, 62%)")]), hierarchical_data.children.length + 2));
        // 273, 18%, 58% 92, 33%, 47% 272, 17%, 57%
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(138, 18%, 58%)"), d3.color("hsl(11, 76%, 58%)"), d3.color("hsl(50, 91%, 44%)"), d3.color("hsl(244, 23%, 57%)")]), 4));

        
        // Compute the layout.
        const hierarchy = d3.hierarchy(hierarchical_data)
            .sum(d => d.add_val)
            // .sort((a, b) => b.height - a.height || b.value - a.value);

        const root = d3.partition()
            .size([width, (hierarchy.height + 1) * height / 3])
          (hierarchy);

        svg
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif")
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


        root.each(d => d.parent ? d.y0 = rectPosition(d.parent) : d.y0 = 0);
    
        const cell = svg
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);
        
        const rect = cell.append("rect")
            .attr("height", d => {return rectHeight(d)*yScale-1})
            .attr("width", d => rectWidth(d)-1)
            .attr("fill", d => {
            if (!d.depth) return color(0);
            // while (d.depth > 1) d = d.parent;
            return color(d.depth);
            })
            // .attr("fill-opacity", d => { if (d.depth>2) return 0; else {return 1;}})
            .attr("fill-opacity", 1)
            .style("cursor", "pointer")
            .attr("onmouseover", "evt.target.setAttribute('fill-opacity', 0.7);")
            .attr("onmouseleave", "evt.target.setAttribute('fill-opacity', 1);")
            .on("mouseover", showTooltip)
            .on("mouseleave", hideTooltip)
            // .on("click", clicked);
        
        let line;
        
        if (lines) {
            line = cell.filter(function(d) {return d.children}).append("line")
                .attr("x1", 0)
                .attr("x2", d => rectWidth(d))
                .attr("y1", d => 2*rectHeight(d)*yScale)
                .attr("y2", d => 2*rectHeight(d)*yScale)
                .style("stroke-width", 4)
                // .style("stroke-dasharray", ("3, 3"))
                .attr("stroke", d => {
                if (!d.depth) return color(0);
                // while (d.depth > 1) d = d.parent;
                return color(d.depth);
                })
                // .attr("stroke-opacity", d => { if (d.depth>1) return 0; else {return 1;}})
                .attr("stroke-opacity", 1)
        }

        const text = cell.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 15)
            .attr("y", 30)
            .attr("fill-opacity", function(d) { return +labelVisible(d) });
      
        text.append("tspan")
            .style("font-size", "18px")
            .text(d => d.data.name);
        
        const format = d3.format(",d");
        // const tspan = text.append("tspan")
        //     .attr("fill-opacity", d => labelVisible(d) * 0.7)
        //     .style("white-space", "pre")
        //     .style("font-size", "20px")
        //     .text(d => `\nSales ${format(d.value)}\nProfit Margin ${format(rectHeight(d))}`);
      
        // rect.append("title")
        //     // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
        //     .text(d => `${d.data.name}\nSales ${format(d.value*100000000)} $\nProfit Margin ${format(rectHeight(d))} %`);

        // On click, change the focus and transitions it into view.
        let focus = root;

        function clicked(event, p) {
            if (p.depth === 0) return;

            focus = focus === p ? p = p.parent : p;

            const depth = p.depth;

            root.each(d => d.target = {
                y0: d.y0 - p.y0,
                y1: d.y1 - p.y0,
                x0: (d.x0 - p.x0) / (p.x1 - p.x0) * width,
                x1: (d.x1 - p.x0) / (p.x1 - p.x0) * width,
            });

            const t = cell.transition().duration(750)
                .attr("transform", d => `translate(${d.target.x0},${d.target.y0})`);

            rect.transition(t).attr("width", d => rectWidth(d.target));
            rect.attr("fill-opacity", d => { if (d.depth < 3+depth) { return 1; } else { return 0; } });

            if (lines) {
                line.transition(t).attr("x2", d => rectWidth(d.target));
                line.attr("stroke-opacity", d => { if (d.depth < 2+depth) { return 1; } else { return 0; } });
            }

            // line.transition(t).attr("x1", 0);
            // line.transition(t).attr("x2", d => rectWidth(d.target));
            // line.attr("stroke-opacity", d => { if (d.depth < 2+depth && d.depth > depth-1) { return 1; } else { return 0; } });

            text.attr("fill-opacity", function(d) { return +labelVisible(d.target, d.depth-depth) });
            // tspan.attr("fill-opacity", d => labelVisible(d.target, d.depth-depth) * 0.7);
        }
    
        function rectWidth(d) {
            return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
        }

        function rectHeight(d) {
            let height_factor = 0;

            if (d.children) {
                for (const child of d.children) {
                    height_factor += rectHeight(child)*child.value;
                }
            } else {
                if (d.data.add_val !== undefined) height_factor = d.data.ratio_val;
                return height_factor;
            }
            return height_factor/d.value;
        }

        function rectPosition(d) {
            let position = 0;

            if (d.ancestors()) {
                const ancestors = d.ancestors();
                for (const ancestor of ancestors) {
                    position += rectHeight(ancestor) * yScale;
                }
            } 
            return position;
        }

        function getTextWidth(text, font) {
            // re-use canvas object for better performance
            const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
            const context = canvas.getContext("2d");
            context.font = font;
            const metrics = context.measureText(text);
            return metrics.width;
          }
    
        function labelVisible(d, depth = d.depth) {
            return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > getTextWidth(d.data.name, "18pt arial") + 10;
          }

        function showTooltip(event, d) {
            const format = d3.format(",d");

            let tooltipElement = document.getElementById('tooltip');
            const title = `${d.data.name}` + "<br />" + `Sales $${format(d.value*0.10)}B` + "<br />" + `Profit Margin ${format(rectHeight(d))} %`;
            
            // if (!element.dataset.title) {
            //     let titleElement = element.querySelector('title');
            //     title = titleElement.innerHTML;
            //     event.target.setAttribute('data-title', title);
            //     titleElement.parentNode.removeChild(titleElement);
            // } else {
            //     title = element.dataset.title;
            // }
            
            tooltipElement.innerHTML = title;
            tooltipElement.style.display = 'block';
            tooltipElement.style.left = event.pageX + 10 + 'px';
            tooltipElement.style.top = event.pageY + 10 + 'px';
            tooltipElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltipElement.style.borderRadius = '5px';
            tooltipElement.style.padding = '5px';
            tooltipElement.style.color = 'white';
        }
        
        function hideTooltip() {
            var tooltip = document.getElementById('tooltip');
            tooltip.style.display = 'none';
        }

        svg.selectAll("g")
          .sort((a, b) => d3.ascending(a.height, b.height))
        
        // cell
        //     .on("mouseover", mouseover)
        //     .on("mousemove", mousemove)
        //     .on("mouseleave", mouseleave)
      },
      [hierarchical_data]
    );

    function onAnswer(answer) {
        let clockTimeout = null;

        if (!answer[2]) {
            document.getElementById('alert').style.display = 'block'
            clearTimeout(clockTimeout)
            clockTimeout = setTimeout(() => {
            document.getElementById('alert').style.display = 'none'
            }, 500)
        }
        navigate(answer[0]);
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    let answerButtons = [];

    task_answers.map((answer) =>
        answerButtons.push(<button className="button" onClick={() => onAnswer(answer)}>{answer[1]}</button>)
    );

    shuffleArray(answerButtons);

    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
        <div id="alert" style={{ display: "none", position: "absolute", left: 0, right: 0, top: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#f55d42", color: "white" }}><h3>This is not correct! Please reread the explanation and try answering again.</h3></div>
        {/* <div style={{ marginTop: "50px", paddingBottom: "30px", marginRight: "150px", marginLeft: "150px", textAlign: "center" }}>
            <span style={{ fontSize: "24px", whiteSpace: "pre-line" }}>{task_text}</span>
        </div> */}
        <div style={{ width: "100%", margin: "none" }}>
            <svg
            ref={ref}
            >
            </svg>
            <div id="tooltip" style={{position: "absolute", display: "none"}}></div>
        </div>
        {/* <div style={{position: "absolute", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", bottom: "40px", width: "800px"}}>
            {answerButtons}
        </div> */}
    </div>
    );
  }
  
  
  export default StalactitePlotWide;
  
