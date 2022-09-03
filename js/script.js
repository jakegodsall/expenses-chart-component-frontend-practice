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



const hoverAndClickEffects = (bar) => {
    bar.addEventListener('click', () => {
        bars.forEach(bar => {
            if (bar.classList.contains('active')) {
                bar.classList.remove('active');
            }
        });
        bar.classList.add('active');
    });
};

const renderWeeklyExpenditure = () => {
    const balance = document.querySelector('.balance-amount');
    
    // total amount in weekly expenditure
    const totalAmount = Object.values(expenditure).reduce((total, el) => {
        return total + el;
    }, 0);

    balance.innerText = `$${totalAmount}`;

    return totalAmount
};

const renderDailyExpenditure = (bar) => {
    const div = document.createElement('div');
    div.classList.add('daily-amount');

    const day = bar.parentNode.classList[0];
    const value = expenditure[day];

    div.innerText = `$${value}`;
    
    bar.parentNode.insertBefore(div, bar);
};

const removeDailyExpenditure = (bar) => {
    const parent = bar.parentNode;
    const dailyAmount = document.querySelector('.daily-amount');
    parent.removeChild(dailyAmount);
}

const onHover = (bar) => {
    bar.addEventListener('mouseover', e => {
        bar.classList.add('bar-hover');
        renderDailyExpenditure(bar);
    });
    bar.addEventListener('mouseout', e => {
        bar.classList.remove('bar-hover');
        removeDailyExpenditure(bar);
    });
};


const totalAmount = renderWeeklyExpenditure();

const setBarHeights = (bar) => {
    const highestExpenditure = Math.max(...Object.values(expenditure));
    

    const day = bar.parentNode.classList[0];
    const barHeight = Math.round((expenditure[day] / highestExpenditure) * 80) + '%';
    const thisBar = document.querySelector(`.${day}__bar`);
    console.log(thisBar);
    thisBar.style.height = barHeight;
}

bars.forEach(bar => {
    setBarHeights(bar);
    onHover(bar);
    hoverAndClickEffects(bar);
    console.log(bar);
    setBarHeights
    
});