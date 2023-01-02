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

const maxValue = Math.max(...values);

const svgHeight = 280;
const svgWidth = 410;

const yScale = (val) => {
    return (val / maxValue) * (svgHeight - 60);
};

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
        return yScale(d);
    })
    .attr('x', (d, i) => {
        return i * 60;
    })
    .attr('y', (d, i) => {
        return svgHeight - yScale(d) - 30;
    })
    .attr('rx', '5px')
    .on('click', () => {
        d3.select(this).attr('class', 'active');
    });

svg.selectAll('text')
    .data(keys)
    .enter()
    .append('text')
    .text((d) => d)
    .attr('x', (d, i) => i * 60 + 10)
    .attr('y', svgHeight - 10)
    .attr('font-size', '15px')
    .attr('class', 'dayText');
