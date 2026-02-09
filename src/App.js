import './index.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [day, setDay] = useState('24');
  const [leapYear, setLeapYear] = useState(false);
  const [month, setMonth] = useState('12');
  const [autoRun, setAutoRun] = useState(false)
  const [months, setMonths] = useState(
    yearMonths().slice(yearMonths()
    .findIndex((yearMonth) => yearMonth == month))
  );
  const [days, setDays] = useState(
    monthDays(months[0], leapYear).slice(monthDays(months[0], leapYear)
    .findIndex((monthDay) => monthDay == day))
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [milliseconds, setMilliseconds] = useState(1000)


  useEffect(() => {
    
    const interval = setInterval(() => {
      if(autoRun){

        setDays(prevDays => {
          if(prevDays.length <= 1){
            updateMonth({setDays, months, setMonths, setMonth, leapYear, setLeapYear, setYear, year});
            return prevDays;
          }
          return prevDays.slice(1)
        })
      }
    }, milliseconds)
    return () => clearInterval(interval)
  }, [autoRun, months, leapYear, year])

  return (
    <div className="app bg-gray-100 min-h-screen">
      <div className="content p-4">
        <h2 className="text-lg font-semibold mb-4">Welcome to the Calendar App!</h2>
        <p className="text-gray-700">This is a simple calendar application built with React and Tailwind CSS.</p>
        <label className="block mt-4">Change date:</label>
        <input type="date" className="mt-1 p-2 border border-gray-300 rounded" onChange={(e) => { 
          const date = e.target.value
           changeDate({date, setDays, setMonths, setYear, setLeapYear})
           } } />
        <h1 className="mt-6 text-2xl font-bold text-center"><CalendarDate date={new Date()} /></h1>
        <p className='mt-4 text-gray-700' >The interval will be updated at the start of the next month. If you want it to be updated now, stop and start the autorun</p>
        <input type="number" className="mt-1 mr-4 p-2 border border-gray-300 rounded" id="millisInterval" 
        placeholder='Set the update interval (in milliseconds)'></input>
        <button onClick={() => {
          if(autoRun){
            setAutoRun(false);
            setMilliseconds(
              document.getElementById('millisInterval').value)
              setAutoRun(true);
            } else setMilliseconds(document.getElementById('millisInterval').value)
            }} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Set</button><br></br>
        <br></br><p className='mt-4 text-gray-700 font-bold'>Auto-run</p>
        <button onClick={() => setAutoRun(true)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Start</button><br></br>
        <button onClick={() => setAutoRun(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Stop</button>
        <p className="mt-4 text-center text-gray-700">
          {/* {days.length > 0 ? days[0].padStart(2, '0') : '00'} */}
          {days[0]}/{months[0]}/{year}
        </p>
      </div>
    </div>
  );
}

function changeDate({date, setDays, setMonths, setYear, setLeapYear}){
  const [year, month, day] = date.toString().split('-');
  setYear(year)
  const leapYear = isLeapYear({year})
  setLeapYear(leapYear)
  const months = yearMonths().slice(yearMonths().findIndex(x => x == month))
  const days = monthDays(months[0], leapYear).slice(monthDays(months[0], leapYear).findIndex(x => x == day));
  setDays(days)
  setMonths(months)
}

function updateMonth({setDays, months, setMonths, setMonth, leapYear, setLeapYear, setYear, year}) {
  const newMonths = months.slice(1)
  if(newMonths.length === 0) {
    updateYear({setYear, setMonths, setDays, setLeapYear, year})
    return
  }
  setDays(monthDays(newMonths[0], leapYear));
  setMonths(newMonths);
  setMonth(newMonths[0]);
}

function updateYear({ setYear, setMonths, setDays, setLeapYear, year}) {
  const newYear = year + 1
  setYear(newYear)
  const months = yearMonths()
  setMonths(['01', ...months])
  const leapYear = isLeapYear({year})
  setDays(monthDays(months[0], leapYear));
  setLeapYear(leapYear)
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
function isLeapYear({ year }) {
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
  if (yearUnit in yearUnitOdds) return false

  if(yearUnits.toString() in ['00']) {
    if(yearHundred in yearUnitOrHundredEvenTensLeap &&
      yearThousand in yearEvenTenOrThousandLeap) return true
     
    if(yearHundred in yearUnitOrHundredOddTensLeap &&
      yearThousand in yearOddTenOrThousandLeap) return true
    
    return false
  }

  // Leap year calculation when the tens are even
  if (yearUnit in yearUnitOrHundredEvenTensLeap) {
    
    if(yearTen in yearEvenTenOrThousandLeap) return true

    return false
  }

// Leap year calculation when the tens are odd
  if (yearUnit in yearUnitOrHundredOddTensLeap) {
    
    if(yearTen in yearOddTenOrThousandLeap) return true
    
    return false
}

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

