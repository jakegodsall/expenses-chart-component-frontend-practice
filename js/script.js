const bars = document.querySelectorAll('.bar');

// dummy expenditure values
const expenditure = {
	mon: 32.25,
	tue: 32.32,
	wed: 52.36,
	thu: 31.07,
	fri: 90.04,
	sat: 40.04,
	sun: 44.97,
};

// renders weekly total to the UI
const renderWeeklyExpenditure = () => {
	const balance = document.querySelector('.balance-amount');
	// total amount in weekly expenditure
	const totalAmount = Object.values(expenditure).reduce((total, el) => {
		return total + el;
	}, 0);

	const formattedAmount = totalAmount.toLocaleString('en-GB');
	balance.innerText = `£${formattedAmount}`;
	return totalAmount;
};

// dynamically generate the height of the bars in the visualisation
const setBarHeights = bar => {
	const highestExpenditure = Math.max(...Object.values(expenditure));
	const day = bar.parentNode.classList[0];
	const barHeight =
		Math.round((expenditure[day] / highestExpenditure) * 65) + '%';
	const thisBar = document.querySelector(`.${day}__bar`);
	console.log(thisBar);
	thisBar.style.height = barHeight;
};

// adds 'active' class to bar on click
const onClick = bar => {
	bar.addEventListener('click', () => {
		// remove all 'active' classes
		bars.forEach(bar => {
			if (bar.classList.contains('active')) {
				bar.classList.remove('active');
			}
		});
		bar.classList.add('active');
	});
};

const onHover = bar => {
	bar.addEventListener('mouseover', e => {
		e.target.value;
		renderDailyExpenditure(bar);
	});
	bar.addEventListener('mouseout', () => {
		removeDailyExpenditure(bar);
	});
};

// create and insert the daily expenditure element into the DOM
const renderDailyExpenditure = bar => {
	// create daily expenditure element
	const div = document.createElement('div');
	div.classList.add('daily-amount');

	const day = bar.parentNode.classList[0];
	const value = expenditure[day];

	div.innerText = `£${value}`;

	// insert the daily expenditure element into the correct location
	bar.parentNode.insertBefore(div, bar);

	// get bar height
	const highestExpenditure = Math.max(...Object.values(expenditure));
	const barHeight = Math.round((expenditure[day] / highestExpenditure) * 65);

	// position the daily amount 20 pixels above the top of the bar
	div.style.bottom = bar.getBoundingClientRect().height + 20 + 'px';
};

// remove the daily expenditure element from the DOM
const removeDailyExpenditure = bar => {
	const parent = bar.parentNode;
	const dailyAmount = document.querySelector('.daily-amount');
	console.log(bar);
	parent.removeChild(dailyAmount);
};

renderWeeklyExpenditure();

// loop through all bars and apply event listeners
bars.forEach(bar => {
	setBarHeights(bar);
	onClick(bar);
	onHover(bar);
});
