const expenditure = {
    mon: 32.25,
    tue: 32.32,
    wed: 52.36,
    thu: 31.07,
    fri: 90.04,
    sat: 40.04,
    sun: 44.97,
};

const keys = Object.keys(expenditure);
const values = Object.values(expenditure);

const svgHeight = 280;
const svgWidth = 440;

const svg = d3
    .select('.visualisation')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

svg.selectAll('rect')
    .data(values)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('width', 50)
    .attr('height', (d) => {
        return +((d / Math.max(...values)) * svgHeight);
    })
    .attr('x', (d, i) => {
        return i * 60;
    })
    .attr('y', (d, i) => {
        return svgHeight - (d / Math.max(...values)) * svgHeight - 30;
    });

svg.selectAll('text')
    .data(values)
    .enter()
    .append('text')
    .text('test')
    .attr('x', (d, i) => i * 60)
    .attr('y', svgHeight)
    .attr('fill-color', 'white')
    .attr('font-size', '24px');
