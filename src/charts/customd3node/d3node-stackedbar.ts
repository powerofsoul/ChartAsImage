import D3Node = require('d3-node');

export function stackedBarbar({
  data = [],
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Bar Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 500,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 30, left: 40 },
  barColor: _barColor = '#2f5597',
  barHoverColor: _barHoverColor = 'brown',
} = {}) {
  const _svgStyles = `
    .bar { fill: ${_barColor}; }
    .bar2 {fill: #e5f0f9}
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

  const svg = d3n.createSVG(_width, _height)
    .append('g')
    .attr('transform', `translate(${_margin.left}, ${_margin.top})`);

  x.domain(data.map((d) => d.key));
  y.domain([0, d3.max(data, (d) => parseInt(d.max))]);

  const yTicks = 15;

  svg.selectAll('.hline')
    .data(d3.range(yTicks)).enter()
    .append('line')
    .attr('y1', function (d) { return height / yTicks * d - _margin.top; })
    .attr('y2', function (d) { return height / yTicks * d - _margin.top; })
    .attr('x1', function (d) { return -_margin.left; })
    .attr('x2', function (d) { return width - _margin.left; })
    .style('stroke', '#e8ebef')
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

  svg.selectAll(".mytext")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) { return d.max; })
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("font-family", "Arial")
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
    .style("font-family", "Arial")
    .style("font-size", 25)
    .style("font-weight", "bold")
    .attr("x", function (d) { return x(d.key) + x.bandwidth() / 2 })
    .attr("y", function (d) { return y(d.value - d.value / 2); });

  // add the x Axis
  svg.append('g')
    .style("font", "14px times")
    .style("font-weight", "bold")
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append('g')
    .call(d3.axisLeft(y));

  return d3n;
}