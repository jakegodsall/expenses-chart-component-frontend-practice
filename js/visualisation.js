const DATA_PATH = '../data.json';

const svgHeight = 280;
const svgWidth = 410;

const xScale = d3.scaleBand().range([0, svgWidth]).padding(0.2);
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
        .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

    const day = svg.selectAll('g.item').data(data).join('g').attr('class', 'vis-item');

    //  create bars
    day.append('rect')
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
    day.selectAll('rect.bar')
        .transition()
        .duration(1000)
        .attr('y', (d) => {
            return yScale(d.amount) - 30;
        })
        .attr('height', (d) => {
            return svgHeight - yScale(d.amount);
        });

    // click event for changing color of bar and making tooltip visible
    day.selectAll('rect.bar').on('click', function () {
        // reset all bars to not active state
        d3.selectAll('rect.bar').attr('class', 'bar');
        // set *this* bar to active state
        d3.select(this).attr('class', 'bar active');

        // get the tooltip for this bar
        const thisTooltip = d3.select(d3.select(this).node().nextElementSibling);

        // reset all tooltips to not active state
        d3.selectAll('g.tooltip').attr('class', 'tooltip');
        // set *this* tooltip to active state
        thisTooltip.attr('class', 'tooltip active');
    });

    // mouseover event for making the tooltip visible
    day.selectAll('rect.bar').on('mouseover', function () {
        const thisTooltip = d3.select(d3.select(this).node().nextElementSibling);

        thisTooltip.attr('class', 'tooltip active');
    });

    // mouseout event for making the tooltip not visible
    day.selectAll('rect.bar').on('mouseout', function () {
        const thisBar = d3.select(this).node();

        console.log(thisBar.classList);

        console.log(thisBar);
        const thisTooltip = d3.select(d3.select(this).node().nextElementSibling);

        if (!thisBar.classList.contains('active')) {
            thisTooltip.attr('class', 'tooltip');
        }
    });

    // create tooltips
    const tooltip = day.append('g').join('g').attr('class', 'tooltip');

    // append tooltip background
    tooltip
        .append('rect')
        .join('rect')
        .attr('class', 'tooltip-background')
        .attr('x', (d) => xScale(d.day) - 7)
        .attr('y', (d) => yScale(d.amount) - 65)
        .attr('width', function () {
            return xScale.bandwidth() + 15;
        })
        .attr('height', 30)
        .attr('rx', '5px');

    // append tooltip text
    tooltip
        .append('text')
        .join('text')
        .attr('class', 'tooltip-text')
        .text((d) => `£${d.amount}`)
        .attr('x', function (d) {
            return xScale(d.day) - 3;
        })
        .attr('y', (d) => yScale(d.amount) - 45);

    // create day labels
    day.append('text')
        .join('text')
        .text((d) => d.day)
        .attr('x', function (d) {
            const width = d3.select(this).node().getBBox().width / 2;
            return xScale(d.day) + xScale.bandwidth() / 2 - width;
        })
        .attr('y', svgHeight - 10)
        .attr('font-size', '15px')
        .attr('class', 'dayText');

    // transition tooltip opacity on click of bar
});
