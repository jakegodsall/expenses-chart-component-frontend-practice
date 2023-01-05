const DATA_PATH = '../data.json';

const svgHeight = 280;
const svgWidth = 410;

const xScale = d3.scaleBand().range([0, svgWidth]).padding(0.1);
const yScale = d3.scaleLinear().range([svgHeight, 100]);

d3.json(DATA_PATH).then((data) => {
    data.forEach((d) => (d.amount = +d.amount));
    const maxAmount = d3.max(data.map((d) => d.amount));

    xScale.domain(data.map((d) => d.day));
    yScale.domain([0, maxAmount]);

    // append svg element to div
    const svg = d3
        .select('.visualisation')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    //  create bars
    svg.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => {
            return xScale(d.day);
        })
        .attr('y', (d, i) => {
            return svgHeight - 30;
        })
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => {
            return 0;
        })
        .attr('height', (d) => svgHeight - yScale(0))
        .attr('rx', '5px');

    //  transition bars on load
    svg.selectAll('rect')
        .transition()
        .duration(1000)
        .attr('y', (d) => {
            return yScale(d.amount) - 30;
        })
        .attr('height', (d) => {
            return svgHeight - yScale(d.amount);
        });

    // click event for changing color of bar
    svg.selectAll('rect').on('click', () => {
        d3.selectAll('rect').attr('class', 'bar');
        d3.select(this).attr('class', 'bar active');
    });

    // create day labels
    svg.selectAll('text.day')
        .append('g')
        .data(data)
        .join('text')
        .text((d) => d.day)
        .attr('x', function (d) {
            const width = d3.select(this).node().getBBox().width / 2;
            return xScale(d.day) + xScale.bandwidth() / 2 - width;
        })
        .attr('y', svgHeight - 10)
        .attr('font-size', '15px')
        .attr('class', 'dayText');
});
