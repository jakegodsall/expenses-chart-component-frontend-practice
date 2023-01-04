const DATA = '../data.json';

const balanceAmount = document.getElementById('balance-amount');

const data = fetch(DATA)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const amount = json.map((el) => el.amount);

        const weeklyTotal = amount.reduce((total, el) => (total += el), 0);
        balanceAmount.innerHTML = `£${weeklyTotal}`;
    });
