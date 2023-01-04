const DATA_PATH = '../data.json';

d3.json(DATA_PATH).then((data) => {
    const days = data.map((el) => el.day);
    const amount = data.map((el) => el.amount);

    const maxAmount = Math.max(...amount);

    const svgHeight = 280;
    const svgWidth = 410;

    const yScale = d3.scaleLinear().domain([0, maxAmount]).range([svgHeight, 100]);

    // append svg element to div
    const svg = d3
        .select('.visualisation')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    //  create bars
    svg.selectAll('rect')
        .data(amount)
        .join('rect')
        .attr('class', 'bar')
        .attr('width', 50)
        .attr('height', (d) => {
            return 0;
        })
        .attr('x', (d, i) => {
            return i * 60;
        })
        .attr('y', (d, i) => {
            return svgHeight - 30;
        })
        .attr('height', (d) => svgHeight - yScale(0))
        .attr('rx', '5px');

    //  transition bars on load
    svg.selectAll('rect')
        .transition()
        .duration(1000)
        .attr('y', (d) => {
            return yScale(d) - 30;
        })
        .attr('height', (d) => {
            return svgHeight - yScale(d);
        });

    // click event for changing color of bar
    svg.selectAll('rect').on('click', (e) => {
        d3.selectAll('rect').attr('class', 'bar');
        d3.select(e.target).attr('class', 'bar active');
    });

    // create day labels
    svg.selectAll('text.days')
        .data(days)
        .join('text')
        .text((d) => d)
        .attr('x', (d, i) => i * 60 + 10)
        .attr('y', svgHeight - 10)
        .attr('font-size', '15px')
        .attr('class', 'dayText');
});
