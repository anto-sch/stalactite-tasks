import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function IciclePlot({ hierarchical_data, task_text, task_answers }) {

    const ref = useD3(
      (svg) => {
        const width = 1600;
        const height = 700;
      
        // Create the color scale.
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(15, 52%, 62%)"), d3.color("hsl(64, 52%, 62%)"), d3.color("hsl(197, 23%, 62%)")]), hierarchical_data.children.length + 2));
      
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(138, 18%, 58%)"), d3.color("hsl(11, 76%, 58%)"), d3.color("hsl(50, 91%, 44%)")]), 3));

        // Compute the layout.
        const hierarchy = d3.hierarchy(hierarchical_data)
            .sum(d => d.add_val)
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
      [hierarchical_data.length]
    );
  
    return (
      // <div style={{ position: "relative" }}>
      //   <svg
      //     ref={ref}
      //   //   style={{
      //   //     height: 1650,
      //   //     width: 1800,
      //   //     marginTop: "20px"
      //   //   }}
      //   >
      //   </svg>
      // </div>

      <div style={{ margin: "auto", textAlign: "center" }}>
        <div style={{ marginTop: "50px", paddingBottom: "30px", marginRight: "150px", marginLeft: "150px", textAlign: "center" }}>
            <span style={{ fontSize: "24px", whiteSpace: "pre-line" }}>{task_text}</span>
        </div>
        <div style={{ width: "75%", margin: "auto" }}>
            <svg
            ref={ref}
            // style={{
            //         height: 1650,
            //         width: 1800,
            //  }}
            >
            </svg>
        </div>
        {/* <div style={{position: "absolute", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", bottom: "40px", width: "800px"}}>
            {answerButtons}
        </div> */}
    </div>
    );
  }
  
  
  export default IciclePlot;
  
