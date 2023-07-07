let url ="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

let req = new XMLHttpRequest;

let data; //store data from json request
let values; //store the data in the array

let heightScale; //the scale used to determine height of the bars
let xScale; //the scale used to determine where the bars are placed horizontally on the axis
let xAxisScale; //scale used for drawing the bottom axis (x axis)
let yAxisScale; //scale used for drawing the left axis (y axis)

let width = 800;
let height = 600;
let padding = 80;

let svg = d3.select("svg");

let generateTitle = () => {
    d3.select("svg")
       .append("text")
       .attr("id", "title")
       .text("United States GDP")
       .attr("x", "320")
       .attr("y", "60")
}

let drawCanvas = () => {
    svg.attr("width", width)
       .attr("height", height)
}

let generateScales = () => {
    heightScale = d3.scaleLinear()
                    .domain([0, d3.max(values, (item) => {
                        return item[1]
                    })])
                    .range([0, height - (2 * padding)])

    xScale = d3.scaleLinear()
                    .domain([0, values.length - 1])
                    .range([padding, width - padding])

    let datesArray = values.map((item) => {
        return new Date (item[0])
    })

    xAxisScale = d3.scaleTime()
                    .domain([d3.min(datesArray), d3.max(datesArray)])
                    .range([padding, width - padding])

    yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(values, (item => {
                        return item[1]
                    }))])
                    .range([height - padding, padding])
}

let drawBars = () => {

    let tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("width", "auto")
                    .style("height", "auto")
                    .style("visibility", "hidden")
                        

    svg.selectAll("rect")
       .data(values)
       .enter()
       .append("rect")
       .attr("class", "bar")
       .attr("width", (width - (2 * padding)) / values.length)
       .style("fill", "#c92929")
       .attr("data-date", (item) => {
            return item[0]
       })
       .attr("data-gdp", (item) => {
            return item[1]
       })
       .attr("height", (item, index) => {
            return heightScale(item[1])
       })
       .attr("x", (item, index) => {
            return xScale(index)
        })
        .attr("y", (item, index) => {
            return (height - padding - heightScale(item[1]) )
        })
        .on("mouseover", (item) => {
            tooltip.transition()
                   .style("visibility", "visible")

            tooltip.text(item[0])

            document.querySelector("#tooltip").setAttribute("data-date", item[0])
        })
        .on("mouseout", (item) => {
            tooltip.transition()
                   .style("visibility", "hidden")
        })
    
}


let generateAxes = () => {
    let xAxis = d3.axisBottom(xAxisScale)
    let yAxis = d3.axisLeft(yAxisScale)

    svg.append("g")
       .call(xAxis)
       .attr("id", "x-axis")
       .attr("transform", "translate(0, " + (height - padding) + ")")

    svg.append("g")
       .call(yAxis)
       .attr("id", "y-axis")
       .attr("transform", "translate(" + (padding) + ",0)")
}



req.open("GET", url, true)
req.onload = function(){
    data = JSON.parse(req.responseText);
    values = data.data;
    // console.log(values)
    generateTitle();
    drawCanvas();
    generateScales();
    drawBars();
    generateAxes();
}
req.send()