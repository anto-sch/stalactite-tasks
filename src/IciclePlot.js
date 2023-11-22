import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function IciclePlot({ hierarchical_data }) {

    const ref = useD3(
      (svg) => {
        const width = 1200;
        const height = 750;
      
        // Create the color scale.
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, hierarchical_data.children.length + 1));
      
        // Compute the layout.
        const hierarchy = d3.hierarchy(hierarchical_data)
            .sum(d => d.citations)
            // .sort((a, b) => b.height - a.height || b.value - a.value);
        const root = d3.partition()
            .size([width, (hierarchy.height + 1) * height / 3])
          (hierarchy);
        
        console.log(root)

        svg
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
    
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
    
        const cell = svg
        .selectAll("g")
        .data(root.descendants())
        .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);
    
        const rect = cell.append("rect")
            .attr("height", d => d.y1 - d.y0 - 1)
            .attr("width", d => rectWidth(d))
            .attr("fill", d => {
            if (!d.depth) return "#ccc";
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
            })
            .style("cursor", "pointer")
            .on("click", clicked);

        const text = cell.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 4)
            .attr("y", 13)
            .attr("fill-opacity", function(d) { return +labelVisible(d) });
      
        text.append("tspan")
            .text(d => d.data.name);
      
        const format = d3.format(",d");
        const tspan = text.append("tspan")
            .attr("fill-opacity", d => labelVisible(d) * 0.7)
            .text(d => ` ${format(d.value)}`);
      
        cell.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
        
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
            tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
        }
    
        function rectWidth(d) {
            return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
        }
    
        function labelVisible(d) {
            return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 75;
          }

        svg.selectAll("g")
          .sort((a, b) => d3.ascending(a.height, b.height))

      },
      [hierarchical_data.length]
    );
  
    return (
      <div style={{ position: "relative" }}>
        <svg
          ref={ref}
        //   style={{
        //     height: 1650,
        //     width: 1800,
        //     marginTop: "20px"
        //   }}
        >
        </svg>
      </div>
    );
  }
  
  
  export default IciclePlot;
  
