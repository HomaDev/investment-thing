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
const resultsContainerElem = document.getElementById('results-tbody');

calculateButtonElem.addEventListener('click', function(event) {
    event.preventDefault();
    
    const barsToDelete = document.querySelectorAll('.bar-placeholder');
    barsToDelete.forEach(elem => {
        elem.remove();
    });
    
    const yearBrakedownElementsToDelete = document.querySelectorAll('.bg-gray-800.border-b.border-gray-700');
    yearBrakedownElementsToDelete.forEach(elem => {
        elem.remove();
    });

    startSum = parseInt(startSumElem.value);
    monthlyInvestment = parseInt(monthlyInvestmentElem.value);
    interestRate = parseInt(interestRateElem.value);
    years = parseInt(yearsElem.value);
    let totalSum = startSum;
    let thisYearInterestErned = totalSum * (interestRate / 100);
    let startingBalance = 0;
    let totalInterestErned = 0;
    let finalBalance = 0;
    let totalContribution = 0;
    const finalSum = [...Array(years)].reduce((balance, _) => balance * (1 + interestRate / 100) + (monthlyInvestment * 12), startSum);

    for (let year = 1; year <= years; year += 1) {
        startingBalance = totalSum;
        thisYearInterestErned = totalSum * (interestRate / 100);
        totalSum += thisYearInterestErned;
        totalInterestErned += Math.round(thisYearInterestErned);
        totalSum += monthlyInvestment * 12;
        totalContribution += monthlyInvestment * 12;
        totalSum = Math.round(totalSum);
        finalBalance = totalSum;

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

        // Create year brakedown elements

        let newWrapElem = document.createElement('tr');
        newWrapElem.className = 'bg-gray-800 border-b border-gray-700';

        let newRawElem = document.createElement('th');
        newRawElem.className = 'px-6 py-4 font-medium text-white whitespace-nowrap';
        newRawElem.innerHTML = year;
        
        let newStartingBalanceElem = document.createElement('td');
        newStartingBalanceElem.className = 'px-6 py-4';
        newStartingBalanceElem.innerHTML = startingBalance.toLocaleString();

        let newTotalContributionElem = document.createElement('td');
        newTotalContributionElem.className = 'px-6 py-4';
        newTotalContributionElem.innerHTML = totalContribution.toLocaleString();
        
        let newInterestEarnedElem = document.createElement('td');
        newInterestEarnedElem.className = 'px-6 py-4 text-green-400';
        newInterestEarnedElem.innerHTML = totalInterestErned.toLocaleString();

        let newEndingBalanceElem = document.createElement('td');
        newEndingBalanceElem.className = 'px-6 py-4 font-semibold text-white';
        newEndingBalanceElem.innerHTML = finalBalance.toLocaleString();

        newWrapElem.appendChild(newRawElem);
        newWrapElem.appendChild(newStartingBalanceElem);
        newWrapElem.appendChild(newTotalContributionElem);
        newWrapElem.appendChild(newInterestEarnedElem);
        newWrapElem.appendChild(newEndingBalanceElem);

        resultsContainerElem.appendChild(newWrapElem);
        console.log('here');
    };
})

// TODO: Consider populating the "Year-by-Year Breakdown" table here as well.

document.addEventListener('click', function(event) {
    let currentTooltipElem = Array.from(event.target.getElementsByClassName('bar-value-tooltip tooltip-visible'));

    let tooltipElemSet = document.getElementsByClassName('bar-value-tooltip tooltip-visible');
    let tootlipArray = Array.from(tooltipElemSet);
    tootlipArray.forEach(function(tooltip) {
        if (currentTooltipElem[0] != tooltip) {
            tooltip.className = 'bar-value-tooltip';
        };
    });
});
