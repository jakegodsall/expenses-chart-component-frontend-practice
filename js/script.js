const bars = document.querySelectorAll('.bar');

const expenditure = {
    mon: 32.25,
    tue: 32.32,
    wed: 52.36,
    thu: 31.07,
    fri: 20.00,
    sat: 40.04,
    sun: 44.97
}

// renders weekly total to the UI
const renderWeeklyExpenditure = () => {
    const balance = document.querySelector('.balance-amount');
    
    // total amount in weekly expenditure
    const totalAmount = Object.values(expenditure).reduce((total, el) => {
        return total + el;
    }, 0);

    balance.innerText = `$${totalAmount}`;

    return totalAmount
};

// dynamically generate the height of the bars in the visualisation
const setBarHeights = (bar) => {
    const totalAmount = renderWeeklyExpenditure();
    const highestExpenditure = Math.max(...Object.values(expenditure));
    
    const day = bar.parentNode.classList[0];
    const barHeight = Math.round((expenditure[day] / highestExpenditure) * 80) + '%';
    const thisBar = document.querySelector(`.${day}__bar`);
    console.log(thisBar);
    thisBar.style.height = barHeight;
}

// adds 'active' class to bar on click
const onClick = bar => {
    bar.addEventListener('click', () => {
        bars.forEach(bar => {
            if (bar.classList.contains('active')) {
                bar.classList.remove('active');
            }
        });
        bar.classList.add('active');
    });
};

// adds 'hovered' class to bar on hover
const onHover = bar => {
    bar.addEventListener('mouseover', e => {
        bar.classList.add('hovered');
    });
    bar.addEventListener('mouseout', e => {
        bar.classList.remove('hovered');
    });
};


// create and insert the daily expenditure element into the DOM
const renderDailyExpenditure = bar => {
    // create daily expenditure element
    const div = document.createElement('div');
    div.classList.add('daily-amount');

    const day = bar.parentNode.classList[0];
    const value = expenditure[day];

    div.innerText = `$${value}`;
    
    // insert the daily expenditure element into the correct location
    bar.parentNode.insertBefore(div, bar);
};

// remove the daily expenditure element from the DOM
const removeDailyExpenditure = (bar) => {
    const parent = bar.parentNode;
    const dailyAmount = document.querySelector('.daily-amount');
    parent.removeChild(dailyAmount);
}

// loop through all bars and apply event listeners
bars.forEach(bar => {
    setBarHeights(bar);
    onClick(bar);
    onHover(bar);
});