import './index.css';
import React, { useState } from 'react';

export default function App() {
  const [leapYear, setLeapYear] = useState(false);
  const [month, setMonth] = useState('12');
  const [day, setDay] = useState(new Date().getDate());
  const [months, setMonths] = useState(
      yearMonths().slice(yearMonths()
      .findIndex((yearMonth) => yearMonth == month))
    );
    const [days, setDays] = useState(
      monthDays(months[0], leapYear).slice(monthDays(months[0], leapYear)
      .findIndex((monthDay) => monthDay == day))
    );
  const [year, setYear] = useState(new Date().getFullYear());


  // const [monthDaysValue, setMonthDays] = useState(null);
  // updateDateInMillisecondsInterval(new Date(), 1000);
  return (
    <div className="app bg-gray-100 min-h-screen">
      <div className="content p-4">
        <h2 className="text-lg font-semibold mb-4">Welcome to the Calendar App!</h2>
        <p className="text-gray-700">This is a simple calendar application built with React and Tailwind CSS.</p>
        <label className="block mt-4">Change date:</label>
        <input type="date" className="mt-1 p-2 border border-gray-300 rounded" onChange={(e) => { 
           const date = e.target.value
           changeDate({date, setDay, setMonth, setYear})
           } } />
        <h1 className="mt-6 text-2xl font-bold text-center"><CalendarDate date={new Date()} /></h1>
        <button onClick={() => updateDate({setDays})} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Check Month Days</button>
        <p className="mt-4 text-center text-gray-700">{days.length > 0 ? days[0].toString().padStart(2, '0') 
        : updateMonth({setDays, months, setMonths, setMonth, leapYear, setYear})} 
        {months.length > 0 ? `/${months[0]}/` : ''}{year}
        </p>
      </div>
    </div>
  );
}

function changeDate({date, setDay, setMonth, setYear}){
  const [year, month, day] = date.toString().split('-');

  setDay(day)
  setMonth(month)
  setYear(year)
}

function updateMonth({setDays, months, setMonths, setMonth, leapYear, setYear}) {
  const newMonths = months.slice(1)
  if(newMonths.length === 0) {
    updateYear({setYear, setMonths})
    return
  }
  setMonths(newMonths);
  setMonth(newMonths[0]);
  setDays(monthDays(newMonths[0], leapYear));
}

function updateYear({ setYear, setMonths}) {
  setYear(prev => prev + 1)
  const months = yearMonths()
  setMonths(['00', ...months])
}


function updateDate({setDays}) {
  setDays(prev => prev.slice(1));
}

function yearMonths(){
  const normalUnits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let monthTens = ['0', '1'];
  const monthsInYear = monthTens.flatMap(tens => {
    let units = [...normalUnits];
    if(tens === '1') {
      units = units.slice(0, 3);
    }
    return units.map(unit => `${tens}${unit}`);
}).slice(1); // Remove '00' from the list of months
  return monthsInYear;
}

// Set the month days based on the month and leap year status
function monthDays(month, leapYear) {
  console.log('Calculating month days for month:', month, 'leap year:', leapYear);
  let normalUnits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let dayTens = ['0', '1', '2', '3'];
  const thirtyDaysMonths = ['04', '06', '09', '11'];

  if(month.toString().padStart(2, '0') === '02') {
    dayTens = ['0', '1', '2'];
  }
  
  const daysInMonth = dayTens.flatMap(tens => {
    let units = [...normalUnits];

    // February days based on leap year status
    if(month === '02' && !leapYear && tens === '2') {
      units = units.slice(0, 9);
    }
    
    if(tens === '3') {
      if(thirtyDaysMonths.includes(month)) { 
        units = units.slice(0, 1); // 30-days month
      } else {
        units = units.slice(0, 2); // 31-days month
      }
    }
    return units.map(unit => `${tens}${unit}`);
}).slice(1); // Remove '00' from the list of days

  return daysInMonth;
}


// Checks if the year is a leap year and updates the leap year state accordingly
function isLeapYear({ date, setLeapYear }) {
  // const [dayCount, setDayCount] = useState(Array(9).fill(0));
  const [day, month, year] = dateStr.split('/').map(Number);
  const dateStr = '04/01/2026'; // DD/MM/YYYY
  const monthTenUnits = ['0', '1', '2'];
  const monthTens = ['0', '1'];

  const normalDayTens = ['0', '1', '2'];
  const febDayTens = ['0', '1', '2'];

  if(day.split('')[0] in normalDayTens) {
    // setDayCount(normalUnits);
  }


  console.log(day, month, year);
  const [yearHundreds, yearUnits] = [Number(year.toString().slice(0, 2)), Number(year.toString().slice(2))];
  const yearUnit = Number(yearUnits.toString().slice(1));
  const yearTen = Number(yearUnits.toString().slice(0, 1));
  const yearHundred = Number(yearHundreds.toString().slice(1));
  const yearThousand = Number(yearHundreds.toString().slice(0, 1));
  const yearUnitOrHundredEvenTensLeap = [0, 4, 8]
  const yearEvenTenOrThousandLeap = [0, 2, 4, 6, 8]
  const yearUnitOdds = [1, 3, 5, 7, 9]
  const yearOddTenOrThousandLeap = [1, 3, 5, 7, 9]
  const yearUnitOrHundredOddTensLeap = [2, 6]
  
  // Not a leap year if the unit is odd
  if (yearUnit in yearUnitOdds) {
    setLeapYear(false);
    return
  }

  if(yearUnits.toString() in ['00']) {
    if(yearHundred in yearUnitOrHundredEvenTensLeap) {
      if(yearThousand in yearEvenTenOrThousandLeap) {
        setLeapYear(true);
        return
      }
    }
      if(yearHundred in yearUnitOrHundredOddTensLeap) {
        if(yearThousand in yearOddTenOrThousandLeap) {
          setLeapYear(true);
          return
        }
    }
    setLeapYear(false);
    return
  }


  
  // Leap year calculation when the tens are even
  if (yearUnit in yearUnitOrHundredEvenTensLeap) {
    if(yearTen in yearEvenTenOrThousandLeap) {
    setLeapYear(true);
    return
  }
  setLeapYear(false);
  return
}

// Leap year calculation when the tens are odd
  if (yearUnit in yearUnitOrHundredOddTensLeap) {
    if(yearTen in yearOddTenOrThousandLeap) {
    setLeapYear(true);
    return
  } 
  setLeapYear(false);
  return
}

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function CalendarDate({ date, setLeapYear }) {

}


export function Header() {
  return (
    <div className="header bg-blue-500 text-white p-4 justify-center flex">
      <h1 className="text-xl font-bold items-center">Calendar</h1>
    </div>
  );
}
export function Footer() {
  return (
    <div className="footer bg-blue-500 text-white p-4 justify-center flex">
      <h1 className="text-sm items-center">Copyright {new Date().getFullYear()}. All rights reserved.</h1>
    </div>
  );
}

