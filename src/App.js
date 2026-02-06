import './index.css';
import React, { useState } from 'react';

export default function App() {
  const [leapYear, setLeapYear] = useState(false);
  setLeapYear(isLeapYear({ date: new Date(), setLeapYear }));
  console.log('Leap Year:', leapYear);
  return (
    <div className="app bg-gray-100 min-h-screen">
      <div className="content p-4">
        <h2 className="text-lg font-semibold mb-4">Welcome to the Calendar App!</h2>
        <p className="text-gray-700">This is a simple calendar application built with React and Tailwind CSS.</p>
        <label className="block mt-4">Change date:</label>
        <input type="date" className="mt-1 p-2 border border-gray-300 rounded" />
        <h1 className="mt-6 text-2xl font-bold text-center"><CalendarDate date={new Date()} /></h1>
      </div>
    </div>
  );
}

function isLeapYear({ date, setLeapYear }) {
  const dateStr = '04/01/2026'; // DD/MM/YYYY
  const [day, month, year] = dateStr.split('/').map(Number);
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

// function updateDateInMillisecondsInterval(milliseconds) {}
//   return new Date(date.getTime() + 1);
// }

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

