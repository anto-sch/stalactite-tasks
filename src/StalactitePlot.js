import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function StalactitePlot({ hierarchical_data }) {

    const ref = useD3(
      (svg) => {
        const width = 1200;
        const height = 900;
      
        // Create the color scale.
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateHslLong(d3.color("hsl(39, 50%, 75%)"), d3.color("hsl(300, 50%, 50%)")), hierarchical_data.children.length + 2));
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRgbBasis([d3.color("hsl(15, 52%, 62%)"), d3.color("hsl(64, 52%, 62%)"), d3.color("hsl(197, 23%, 62%)")]), hierarchical_data.children.length + 2));

        
        // Compute the layout.
        const hierarchy = d3.hierarchy(hierarchical_data)
            .sum(d => d.add_val)
            // .sort((a, b) => b.height - a.height || b.value - a.value);

        const root = d3.partition()
            .size([width, (hierarchy.height + 1) * height / 3])
          (hierarchy);

        svg
            .attr("viewBox", [0, 0, width, height+400])
            .attr("width", width)
            .attr("height", height+400)
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

        root.each(d => d.parent ? d.y0 = rectPosition(d.parent) : d.y0 = 0);
    
        const cell = svg
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);
        
        const rect = cell.append("rect")
            .attr("height", d => {return rectHeight(d)*10-1})
            .attr("width", d => rectWidth(d)-1)
            .attr("fill", d => {
            if (!d.depth) return color(0);
            // while (d.depth > 1) d = d.parent;
            return color(d.depth);
            })
            .attr("fill-opacity", d => { if (d.depth>2) return 0; else {return 1;}})
            .style("cursor", "pointer")
            .on("click", clicked);

        const line = cell.filter(function(d) {return d.children}).append("line")
            .attr("x1", 0)
            .attr("x2", d => rectWidth(d))
            .attr("y1", d => 2*rectHeight(d)*10)
            .attr("y2", d => 2*rectHeight(d)*10)
            .style("stroke-width", 8)
            // .style("stroke-dasharray", ("3, 3"))
            .attr("stroke", d => {
            if (!d.depth) return color(0);
            // while (d.depth > 1) d = d.parent;
            return color(d.depth);
            })
            .attr("stroke-opacity", d => { if (d.depth>1) return 0; else {return 1;}})

        const inner_node_line = cell.filter(function(d) {return d.children && d.parent}).append("line")
            .attr("x1", 0)
            .attr("x2", d => rectWidth(d))
            .attr("y1", d => (rectHeight(d) + rectHeight(d.parent))*10)
            .attr("y2", d => (rectHeight(d) + rectHeight(d.parent))*10)
            .style("stroke-width", 4)
            // .style("stroke-dasharray", ("3, 3"))
            .attr("stroke", d => {
            d = d.parent
            if (!d.depth) return color(0);
            // while (d.depth > 1) d = d.parent;
            return color(d.depth);
            })
            .attr("stroke-opacity", d => { if (d.depth>1) return 0; else {return 1;}})

        // const leaf_line = cell.filter(function(d) {return !d.children && d.parent}).append("line")
        //     .attr("x1", 0)
        //     .attr("x2", d => rectWidth(d))
        //     .attr("y1", d => (rectHeight(d.parent.parent))*10)
        //     .attr("y2", d => (rectHeight(d.parent.parent))*10)
        //     .style("stroke-width", 2)
        //     // .style("stroke-dasharray", ("3, 3"))
        //     .attr("stroke", d => {
        //     d = d.parent.parent
        //     if (!d.depth) return color(0);
        //     // while (d.depth > 1) d = d.parent;
        //     return color(d.depth);
        //     })
            // .attr("stroke-opacity", d => { if (d.depth>1) return 0; else {return 1;}})
        
        const sec_inner_line = cell.filter(function(d) {
                    const temp = d.parent; 
                    if (temp === null) {
                        return false;
                    } else {                
                        return d.children && temp.parent
                    }
                })
                .append("line")
            .attr("x1", 0)
            .attr("x2", d => rectWidth(d))
            .attr("y1", d => (rectHeight(d) + rectHeight(d.parent.parent))*10)
            .attr("y2", d => (rectHeight(d) + rectHeight(d.parent.parent))*10)
            .style("stroke-width", 4)
            // .style("stroke-dasharray", ("3, 3"))
            .attr("stroke", d => {
            d = d.parent.parent;
            if (!d.depth) return color(0);
            // while (d.depth > 1) d = d.parent;
            return color(d.depth);
            })
            .attr("stroke-opacity", d => { if (d.depth>1) return 0; else {return 1;}})

        const text = cell.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 15)
            .attr("y", 30)
            .attr("fill-opacity", function(d) { return +labelVisible(d) });
      
        text.append("tspan")
            .style("font-size", "20px")
            .text(d => d.data.name);
      
        const format = d3.format(",d");
        const tspan = text.append("tspan")
            .attr("fill-opacity", d => labelVisible(d) * 0.7)
            .style("white-space", "pre")
            .style("font-size", "20px")
            .text(d => `\nSales ${format(d.value)}\nProfit Margin ${format(rectHeight(d))}`);
      
        cell.append("title")
            // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
            .text(d => `${d.data.name}\nSales ${format(d.value)}\nProfit Margin ${format(rectHeight(d))}`);

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
            
            line.transition(t).attr("x1", 0);
            line.transition(t).attr("x2", d => rectWidth(d.target));
            line.attr("stroke-opacity", d => { if (d.depth < 2+depth && d.depth > depth-1) { return 1; } else { return 0; } });

            inner_node_line.transition(t).attr("x1", 0);
            inner_node_line.transition(t).attr("x2", d => rectWidth(d.target));
            inner_node_line.attr("stroke-opacity", d => { if (d.depth < 2+depth && d.depth > depth-1) { return 1; } else { return 0; } });

            // leaf_line.transition(t).attr("x1", 0);
            // leaf_line.transition(t).attr("x2", d => rectWidth(d.target));
            // leaf_line.attr("stroke-opacity", d => { if (d.depth < 2+depth && d.depth > depth-1) { return 1; } else { return 0; } });

            sec_inner_line.transition(t).attr("x1", 0);
            sec_inner_line.transition(t).attr("x2", d => rectWidth(d.target));
            sec_inner_line.attr("stroke-opacity", d => { if (d.depth < 2+depth && d.depth > depth-1) { return 1; } else { return 0; } });

            text.attr("fill-opacity", function(d) { return +labelVisible(d.target, d.depth-depth) });
            tspan.attr("fill-opacity", d => labelVisible(d.target, d.depth-depth) * 0.7);
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
                    position += rectHeight(ancestor) * 10;
                }
            } 
            return position;
        }
    
        function labelVisible(d, depth = d.depth) {
            return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 150 && depth < 3;
          }

        svg.selectAll("g")
          .sort((a, b) => d3.ascending(a.height, b.height))
        
      },
      [hierarchical_data]
    );

    return (
    //   <div style={{ position: "relative" }}>
        <svg
          ref={ref}
        //   style={{
        //     height: 1650,
        //     width: 1800,
        //     marginTop: "20px"
        //   }}
        >
        </svg>
    // </div>
    );
  }
  
  
  export default StalactitePlot;
  
