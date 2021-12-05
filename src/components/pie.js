import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Pie(props){
    const pieChart = useRef();
    
    useEffect(() => {
        
        const piedata = d3.pie().value(d => d.powerUsage.value)(props.c);
        const arc = d3.arc().innerRadius(0).outerRadius(100);
        const colors = d3.scaleOrdinal(["#f5a641", "#ef604d", "#52c0c6", "#dee1e5", "#1a5071"])
        const svg = d3.select(pieChart.current)
                        .attr("width", 400)
                        .attr("height", 400)
                        .style("background-color", "white")
                        .append("g")
                            .attr("transform", "translate(200,100)");

        const tooldiv = d3.select("#canvas")
                            .append("div")
                            .style("visibility", "hidden")
                            .style("position", "absolute")
                            .style("background-color", "white")

        svg.append("g")
            .selectAll("path")
            .data(piedata)
            .join("path")
                .attr("d", arc)
                .attr("fill", (d,i)=>colors(i))
                .attr("stoke", "white")
                .on("mouseover", (e,d)=>{
                    tooldiv.style("visibility", "visible")
                            .text(`${d.data.name}: ${d.data.powerUsage.value} KwH`)
                })
                .on("mousemove", (e,d)=>{
                    tooldiv.style("top", (e.pageY-50) + "px")
                            .style("left", (e.pageX-50) + "px")
                })
                .on("mouseout", ()=>{
                    tooldiv.style("visibility", "hidden");
                })
    })

    return(
        <div id="canvas">
            <svg ref={pieChart}></svg>
        </div>
    )
}

export default Pie;