let url ="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

let req = new XMLHttpRequest;

let data = []

let width = 800;
let height = 600;
let padding = 100;

let svg = d3.select("svg")

let xScale
let yScale
let specifier = "%M:%S"
let timeArray = []

// let tooltip = svg.append("div")
//                  .attr("class", "tooltip")
//                  .style("visibility", "hidden")

let tooltip = d3.select('#tooltip');

let drawCanvas = () => {
  svg.attr("width", width)
     .attr("height", height)
     .style("background", "#fff")
     .attr("viewbox", "0 0 800 600")
    .attr("preserveAspectRatio", "xMidYMid meet")
    
}

let generateTitle = () => {
  svg.append("text")
     .attr("id", "title")
     .text("Doping in Professional Bicycle Racing")
     .style("font-size", "1.65rem")
     .attr("transform", "translate(180, 55)")

  svg.append("text")
     .attr("id", "subtitle")
     .text("35 Fastest times up Alpe d'Huez")
     .style("font-size", "1.25rem")
     .attr("transform", "translate(250, 80)")
}

let generateScales = () => {
  yearArray = data.map((item) => {
    return item["Year"]
  })

  timeArray = data.map((item) => {
    return d3.timeParse(specifier)(item["Time"])
  })

  // console.log(timeArray)

  xScale = d3.scaleLinear()
             .domain([d3.min(data, (item) => {
              return item["Year"] - 1
             }), d3.max(data, (item) => {
              return item["Year"] + 1
             })])
             .range([padding, (width - padding)])

  yScale = d3.scaleTime()
             .domain([d3.min(data, (item) => {
              // return d3.timeParse(specifier)(item["Time"])
              return new Date(item["Seconds"] * 1000)
             }), d3.max(data, (item) => {
              // return d3.timeParse(specifier)(item["Time"])
              return new Date(item["Seconds"] * 1000)
             })])
             .range([padding, height - padding])

}

let generateAxes = () => {
  let xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format("d"))

  let yAxis = d3.axisLeft(yScale)
                .tickFormat(d3.timeFormat(specifier))

  svg.append("g")
     .call(xAxis)
     .attr("id", "x-axis")
     .attr("transform", "translate(0," + (height - padding) + ")" )

  svg.append("g")
     .call(yAxis)
     .attr("id", "y-axis")
     .attr("transform", "translate(" + padding + ",0)" )

  svg.append("text")
     .attr("id", "axis-title")
     .text("Time in Minutes")
     .attr("x", "-120")
     .attr("y", "50")
     .attr("transform", "rotate(-90)")
     .attr("text-anchor", "end")
     .style("font-size", "1.1rem")
}

let drawPoints = () => {
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("class", "dot")
     .attr("r", "5")
     .attr("data-xvalue", (item) => {
      return item["Year"]
     })
     .attr("data-yvalue", (item) => {
      // return d3.timeParse(specifier)(item["Time"])
      return new Date(item["Seconds"] * 1000)
     })
     .attr("cx", (item) => {
      return xScale(item["Year"])
     })
     .attr("cy", (item) => {
      // return yScale(d3.timeParse(specifier)(item["Time"]))
      return yScale(new Date(item["Seconds"] * 1000))
     })
     .style("fill", (item) => {
      return item["Doping"] !== "" ? "blue" : "orange"
     })
    //  .on("mouseover", (item) => {
    //   tooltip.transition()
    //     .style("visibility", "visible")

    //   if(item["Doping"] != "") {
    //     tooltip.text( item["Name"] + ": " + item["Nationality"]
    //       // item["Name"] + ": " + item["Nationality"] + "Year: " + item["Year"] + ", Time: " + item["Time"] + "Allegations: " + item["Doping"]
    //       )
    //   } else {
    //     tooltip.text(item["Name"] + ": " + item["Nationality"]
    //       // item["Name"] + ": " + item["Nationality"] 
    //       // // + </br>
    //       // + "Year: " + item["Year"] + ", Time: " + item["Time"]
    //     )
    //   }
    //       tooltip.attr("data-year", item["Year"])
    //  })
    //  .on("mouseout", (item) => {
    //   tooltip.transition()
    //          .style("visibility", "hidden")
    //  })
    .on("mouseover", (item) => {
      tooltip.transition().style("visibility", "visible");

      if (item["Doping"] != "") {
        tooltip.text(
          item["Year"] +
            // <br> +
            " - " +
            item["Name"] +
            " - " +
            item["Time"] +
            " - " +
            item["Doping"]
        );
      } else {
        tooltip.text(
          item["Year"] +
            " - " +
            item["Name"] +
            " - " +
            item["Time"] +
            " - " +
            "No Allegations"
        );
      }

      tooltip.attr("data-year", item["Year"]);
    })
    .on("mouseout", (item) => {
      tooltip.transition().style("visibility", "hidden");
    });

     

}

let generateLegend = () => {
  // svg.select("div")
  // svg.select("div")
  d3.select("svg")
     .append("g")
     .attr("transform", "translate(600,300)")
     .append("text")
     .attr("id", "legend")
     .text("No doping allegations")
     .style("font-size", ".6rem")
  
  d3.select("svg")
     .append("g")
     .attr("transform", "translate(565,320)")
     .append("text")
     .attr("id", "legend")
     .text("Riders with doping allegations")
     .style("font-size", ".6rem")
  
  d3.select("svg")
    .append("rect")
    .attr("width", "15")
    .attr("height", "15")
    .attr("transform", "translate(700, 290)")
    .attr("fill", "orange")

  d3.select("svg")
    .append("rect")
    .attr("width", "15")
    .attr("height", "15")
    .attr("transform", "translate(700, 310)")
    .attr("fill", "blue")




}



req.open("GET", url, true);
req.onload = function() {
  data = JSON.parse(req.responseText);
  console.log(data)
  drawCanvas();
  generateTitle();
  generateScales();
  generateAxes();
  drawPoints();
  generateLegend();
}
req.send();