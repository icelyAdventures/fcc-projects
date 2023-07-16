let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

let req = new XMLHttpRequest;

let baseTemp
let values = [];

let xScale
let yScale
let tempScale


let width = 1200;
let height = 600;
let padding = 150;

let svg = d3.select("svg");
let legend = d3.select("#legend")
let tooltip = d3.select("#tooltip")


let drawCanvas = () => {
    svg.attr("width", width)
       .attr("height", height)
       .style("background", "#fff")
      //  .attr("viewbox", "0 0 800 600")
      //  .attr("preserveAspectRatio", "xMidYMid meet")
  }


let generateTitle = () => {
  svg.append("text")
     .attr("id", "title")
     .text("Monthly Global Land-Surface Temperature")
     .attr("transform", "translate(350, 70)")
     .style("font-size", "1.8rem")
  
  svg.append("text")
     .attr("id", "description")
     .text("1753 - 2015: Base temperature 8.66℃")
     .attr("transform", "translate(440, 100)")
     .style("font-size", "1.3rem")
  
}

let generateScales = () => {
  let minYear = d3.min(values, (item) => {return item["year"]})
  let maxYear = d3.max(values, (item) => {return item["year"]})
  
  xScale = d3.scaleLinear()
             .domain([minYear, maxYear + 1])
             .range([padding, (width - padding)])
  
  yScale = d3.scaleTime()
             .domain([new Date(0,0,0,0,0,0,0,0), new Date(0, 12, 0, 0, 0, 0, 0)]) 
             .range([padding, (height - padding)])
}


let drawCells = () => {
  let minYear = d3.min(values, (item) => {return item["year"]})
  let maxYear = d3.max(values, (item) => {return item["year"]})
  
  function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}
  
  svg.selectAll("rect")
     .data(values)
     .enter()
     .append("rect")
     .attr("class", "cell")
     .attr("fill", (item) => {
       let variance = item["variance"];
        if(variance <= -4) {
          return "#1a66ff"
        } else if(variance <= -3) {
          return "#6699ff"
        } else if(variance <= -2) {
          return "#b3ccff"
        } else if(variance <= -1){
          return "#e6eeff"
        } else if(variance <= 0) {
          return "#ffeecc"
        } else if(variance <= 1){
          return "#ffcc66"
        } else if(variance <= 2) {
          return "#ff944d"
        } else if(variance <= 3){
          return "#ff5c33"
        } else {
          return "#ff3300"
        }
      })
     .attr("data-month", (item) => {
      return item["month"] - 1
      })
     .attr("data-year", (item) => {
      return item["year"]
      })
     .attr("data-temp", (item) => {
      return baseTemp + item["variance"]
      })
     .attr("height", (height - (2 * padding)) / 12)
     .attr("y", (item) => {
        return yScale(new Date(0, item["month"] - 1, 0, 0, 0, 0, 0,))
      })
     .attr("width", (item) => {
        let numberOfYears = maxYear - minYear;
        return (width - (2 * padding))/numberOfYears 
      })
     .attr("x", (item) => {
        return xScale(item["year"])
      })
     .on("mouseover", (item, d) => {
      tooltip.transition()
       .duration(10)
       .attr("data-year", (item) => {return d["year"]})
       .style("position", "absolute")
       .style("justify-content", "center")
       .style("text-align", "center")
       .style("visibility", "visible")
       .style("background-color", "#000")
       .style("line-height", "5px")
       .style("color", "#fff")
       // .style("border", "solid")
       // .style("border-width", "30px")
       .style("border-radius", "10px")
       .style("padding", "5px")
       .style("border", "solid")
       .style("opacity", 0.8)
       .style("left", (item.pageX - 50) + "px")
       .style("top", (item.pageY - 120) + "px")
       tooltip.html("<p>" + (d["year"]) + " - " +  getMonthName((d["month"])) + "</p>"+ (baseTemp + d["variance"]).toFixed(1) + "<span>&#8451;</span>" + "</p>" + "<p>" + (d["variance"]).toFixed(1) + "<span>&#8451;</span>" + "</p>")
      })
     .on("mouseout", (item) => {
        tooltip.transition()
           .duration(100)
           .style("opacity", 0)    
      })
}

let generateAxes = () => {
  let xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format("d"));
  let yAxis = d3.axisLeft(yScale)
                .tickFormat(d3.timeFormat("%B"));
  
  svg.append("g")
     .call(xAxis)
     .attr("id", "x-axis")
     .attr("transform", "translate(0," + (height - padding) + ")")
  
  svg.append("g")
     .call(yAxis)
     .attr("id", "y-axis")
     .attr("transform", "translate(" + (padding) + ", 0)")
     
}

let generateLegend = () => {
  let minTemp = d3.min(values, (item) => {return baseTemp + item["variance"]})
  let maxTemp = d3.max(values, (item) => {return baseTemp + item["variance"]})
  
  tempScale = d3.scaleLinear()
             .domain([minTemp, maxTemp])
             .range(["125", "400"])
  
  let tempAxis = d3.axisBottom(tempScale)
                    // .tickFormat(d3.format("0.2"));
  
  svg.append("g")
     .call(tempAxis)
     .attr("id", "temp-axis")
     .attr("transform", "translate(0, 530)")
    
  
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "150")
     .attr("y", "510")
     .attr("fill", "#1a66ff")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "175")
     .attr("y", "510")
     .attr("fill", "#6699ff")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "200")
     .attr("y", "510")
     .attr("fill", "#b3ccff")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "225")
     .attr("y", "510")
     .attr("fill", "#e6eeff")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "250")
     .attr("y", "510")
     .attr("fill", "#ffeecc")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "275")
     .attr("y", "510")
     .attr("fill", "#ffcc66")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "300")
     .attr("y", "510")
     .attr("fill", "#ff944d")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "325")
     .attr("y", "510")
     .attr("fill", "#ff5c33")
  legend.append("g")
     .append("rect")
     .attr("width", "25")
     .attr("height", "20")
     .attr("x", "350")
     .attr("y", "510")
     .attr("fill", "#ff3300")
}





req.open("GET", url, true);
req.onload = () => {
    let object = JSON.parse(req.responseText);
    baseTemp = object["baseTemperature"];
    values = object["monthlyVariance"];
    drawCanvas();
    generateTitle();
    generateScales();
    drawCells();
    generateAxes();
    generateLegend();
}
req.send();