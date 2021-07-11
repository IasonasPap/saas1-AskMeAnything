import React, { useEffect } from 'react';
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeDark2,
  select,
} from 'd3';

const margin = {
  top: 10, right: 30, bottom: 80, left: 60,
};
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const BarChart = ({ id, data }) => {
  useEffect(() => {
    
    const color = scaleOrdinal()
      .domain(data.map(({ label }) => label))
      .range(schemeDark2);

    const svg = select(`#bar-chart-${id}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);
        

    const x = scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.label))
      .padding(0.2);
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const maxValue = Math.max(...data.map(({ value }) => value));
    const y = scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);
    svg.append('g')
      .call(axisLeft(y));

    svg.selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => color(d.label));

    return () => select(svg.node().parentElement).remove();
  }, [data]);

  return (
    <div id={`bar-chart-${id}`} />
  );
};

export default BarChart;