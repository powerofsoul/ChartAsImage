import D3Node = require('d3-node');

export function stackedBar({
  data = [],
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Bar Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  legend_width: _legend_width = 250,
  width: _width = 500 + _legend_width,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 30, left: 40 },
  barColor: _barColor = '#2f5597',
  barColor2: _barColor2 = '#e5f0f9',
  barHoverColor: _barHoverColor = 'brown',
} = {}) {
  const _svgStyles = `
    .bar { fill: ${_barColor}; }
    .bar2 {fill: ${_barColor2} }
    .bar2:hover {fill: red}
    .bar:hover { fill: ${_barHoverColor}; }
  `;

  const d3n = new D3Node({
    selector: _selector,
    svgStyles: _svgStyles + _style,
    container: _container
  });

  const d3 = d3n.d3;

  const width = _width - _margin.left - _margin.right;
  const height = _height - _margin.top - _margin.bottom;

  // set the ranges
  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0]);

  const svg = d3n.createSVG(_width + _legend_width, _height)
    .append('g')
    .attr('transform', `translate(${_margin.left}, ${_margin.top})`);

  x.domain(data.map((d) => d.key));
  y.domain([0, d3.max(data, (d) => parseInt(d.max))]);

  const yTicks = 7;

  svg.selectAll('.hline')
    .data(d3.range(yTicks)).enter()
    .append('line')
    .attr('y1', function (d) { return height / yTicks * d - _margin.top; })
    .attr('y2', function (d) { return height / yTicks * d - _margin.top; })
    .attr('x1', function (d) { return -_margin.left; })
    .attr('x2', function (d) { return width - _margin.left; })
    .style('stroke', 'lightgray')
    .attr('transform', 'translate(' + _margin.left + ',' + _margin.top + ')');

  svg.selectAll('.bar2')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar2')
    .attr('x', (d) => x(d.key))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d.max))
    .attr('height', (d) => height - y(d.max))
    .attr('opacity', 0.6);

  svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.key))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value))

  var difference = data[0].diff == "true";

  svg.selectAll(".mytext")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) { return difference ? d.max - d.value : d.max;; })
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", 25)
    .style("font-weight", "bold")
    .attr("x", function (d) { return x(d.key) + x.bandwidth() / 2 })
    .attr("y", function (d) { return y(d.max - (d.max - d.value) / 2); });
  
  svg.selectAll(".mytext2")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) { return d.value; })
    .style("text-anchor", "middle")
    .style("fill", "white")
    .style("font-size", 25)
    .style("font-weight", "bold")
    .attr("x", function (d) { return x(d.key) + x.bandwidth() / 2 })
    .attr("y", function (d) { return y(d.value - d.value / 2); });

  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width)
    .attr("y", height/2)
    .attr("height", 100)
    .attr("width", 100);

  legend.append("rect")
    .attr("x", width)
    .attr("y", height/2)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", _barColor);


  legend.append("text")
    .attr("x", width + 30)
    .attr("y", height/2 + 15)
    .style("font-size", 18)
    .text(data[0].legend);

  legend.append("rect")
    .attr("x", width)
    .attr("y", height/2 + 40)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", _barColor2);

  legend.append("text")
    .attr("x", width + 30)
    .attr("y", height/2 + 55)
    .style("font-size", 18)
    .text(data[1].legend);


  svg.append('g')
    .style("font-size", "18px")
    .style("font-weight", "normal")
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append('g')
    .style("font-size", "18px")
    .style("font-weight", "normal")
    .call(d3.axisLeft(y));

  return d3n;
}