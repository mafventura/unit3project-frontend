import React from 'react'


export default function DisplayDaily({fetchQuicksData, quicks}) {
    console.log("these are the quicks", quicks)

    const today = new Date();
const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

// Filter the array to get objects created today
const objectsFromToday = quicks.filter(quick => {
    const createdAtDate = new Date(quick.createdAt);
    // Extract the date part from createdAt timestamp
    const createdAtDateOnly = new Date(createdAtDate.getFullYear(), createdAtDate.getMonth(), createdAtDate.getDate());
    // Check if createdAtDate is equal to today's date
    return createdAtDateOnly.getTime() === todayDate.getTime();
});

console.log(objectsFromToday);
  return (
    <div>DisplayDaily
          <h1>Daily Checks Created Today</h1>
      {objectsFromToday.length === 0 ? (
        <p>No daily checks created today.</p>
      ) : (
        <ul>
          {objectsFromToday.map((dailyCheck, index) => (
            <li key={index}>
              <p>Water: {dailyCheck.water}</p>
              {/* Add more details to display */}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}
