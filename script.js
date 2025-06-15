"use strict"

let startSum;
let monthlyInvestment;
let interestRate;
let years;

// startSum = prompt('How much'); 
// alert(startSum);

const calculateButtonElem = document.getElementById('calculate-btn');
const startSumElem = document.getElementById('starting-sum');
const monthlyInvestmentElem = document.getElementById('monthly-investment');
const interestRateElem = document.getElementById('interest-rate');
const yearsElem = document.getElementById('years');

const graphContainerElem = document.getElementById('graph-container');

calculateButtonElem.addEventListener('click', function(event) {
    event.preventDefault();
    
    const barsToDelete = document.querySelectorAll('.bar-placeholder');
    
    barsToDelete.forEach(bar => {
        bar.remove();
    });
    startSum = parseInt(startSumElem.value);
    monthlyInvestment = parseInt(monthlyInvestmentElem.value);
    interestRate = parseInt(interestRateElem.value);
    years = parseInt(yearsElem.value);
    let totalSum = startSum; 
    const finalSum = [...Array(years)].reduce((balance, _) => balance * (1 + interestRate / 100) + (monthlyInvestment * 12), startSum);

    for (let year = 1; year <= years; year += 1) {
        totalSum += totalSum * (interestRate / 100);
        totalSum += monthlyInvestment * 12;
        totalSum = Math.round(totalSum);

        const newBar = document.createElement('div');
        newBar.className = 'bar-placeholder';
        newBar.style.height = totalSum / finalSum * 95 + '%';

        const tooltipElement = document.createElement('span');
        tooltipElement.className = 'bar-value-tooltip';
        tooltipElement.innerHTML = `$${totalSum.toLocaleString()}<br>Year: ${year}`;
        
        newBar.addEventListener('click', function(event) {
            tooltipElement.className = 'bar-value-tooltip tooltip-visible';
        })

        newBar.appendChild(tooltipElement);
        graphContainerElem.appendChild(newBar);
    };
})

// TODO: Consider populating the "Year-by-Year Breakdown" table here as well.


document.addEventListener('click', function(event) {
    let currentTooltipElem = Array.from(event.target.getElementsByClassName('bar-value-tooltip tooltip-visible'));

    let tooltipElemSet = document.getElementsByClassName('bar-value-tooltip tooltip-visible');
    let tootlipArray = Array.from(tooltipElemSet);
    tootlipArray.forEach(function(tooltip) {
        if (currentTooltipElem[0] != tooltip) {
            tooltip.className = 'bar-value-tooltip'
        };
    });
});
