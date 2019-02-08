import D3Node = require('d3-node');

export function pie({
  data=[],
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Pie Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  colorRange: _colorRange = undefined,
  width: _width = 400,
  height: _height = 400,
  radius: _radius = 200,
  legend: _legend = 40 * data.length
} = {}) {
  const _svgStyles = `
    .arc text {font: 10px sans-serif; text-anchor: middle;}
    .arc path {stroke: #fff;}
  `;

  const d3n = new D3Node({
    selector: _selector,
    styles: _svgStyles + _style,
    container: _container
  });

  const d3 = d3n.d3;

  const radius = _radius;

  const color = d3.scaleOrdinal(_colorRange ? _colorRange : d3.schemeCategory10);

  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  const pie = d3.pie()
    .sort(null)
    .value((d) => d.value);

  const svg = d3n.createSVG()
    .attr('width', _width)
    .attr('height', _height + _legend)
    .append('g')
    .attr('transform', `translate( ${_radius} , ${_radius} )`);

  const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

  var legend = svg.selectAll('.legend')
    .data(pie(data))
    .enter();

  legend.append("rect")
    .attr("x", -_radius/2)
    .attr("y", (d, i)=> _radius + 20 + i * 25)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", (d) => color(d.data.label));
  
  legend.append("text")
    .attr("x", -_radius/2 + 30)
    .attr("y", (d, i)=> _radius + 35 + i * 25)
    .text((d) => d.data.label)
    .style("font", "14px times")
    .style("font-family", "Helvetica")
    .style("font-weight", "bold");

  g.append('path')
    .attr('d', arc)
    .style('fill', (d) => color(d.data.label));

  g.append('text')
    .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
    .attr("margin-right", 10)
    .attr('dy', '.35em')
    .text((d) => d.data.value +"%")
    .style("font-family", "Helvetica")
    .style("font-weight", "bold");

  return d3n;
}