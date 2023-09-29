
// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch UK bank holiday data
//     fetch('https://www.gov.uk/bank-holidays.json')
//         .then(response => response.json())
//         .then(data => {
//             const ukHolidays = data['england-and-wales'].events;

//             // Filter holidays for the year 2023
//             const holidays2023 = ukHolidays.filter(event => event.date.includes('2023'));

//             // Create an HTML list of bank holidays
//             const holidayList = document.getElementById('holidayList');
//             holidays2023.forEach(holiday => {
//                 const listItem = document.createElement('li');
//                 listItem.innerHTML = `<strong>${holiday.title}</strong>: ${holiday.date}`;
//                 holidayList.appendChild(listItem);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching bank holidays:', error);
//         });
// });

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the bank holiday data
    fetch('https://www.gov.uk/bank-holidays.json')
        .then(response => response.json())
        .then(data => {
            const holidays = data['england-and-wales']['events'];

            // Generate the holiday list table
            const holidayTable = document.getElementById('holiday-table');
            holidays.forEach(holiday => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${holiday.date}</td><td>${holiday.title}</td>`;
                holidayTable.appendChild(row);
            });

            // Generate the calendar
            // const calendar = document.getElementById('calendar');
            // const currentDate = new Date();
            // const currentYear = currentDate.getFullYear();
            // const currentMonth = currentDate.getMonth();

            for (let month = 0; month < 12; month++) {
                const monthDiv = document.createElement('div');
                monthDiv.className = 'month';
                const monthName = new Date(currentYear, month, 1).toLocaleDateString('en-US', { month: 'long' });
                monthDiv.innerHTML = `<h2>${monthName}</h2>`;

                const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(currentYear, month, day).toLocaleDateString('en-GB');
                    const isBankHoliday = holidays.find(holiday => holiday.date === date);
                    const dayDiv = document.createElement('div');
                    dayDiv.className = `day${isBankHoliday ? ' bank-holiday' : ''}`;
                    dayDiv.textContent = day;
                    monthDiv.appendChild(dayDiv);
                }

                calendar.appendChild(monthDiv);
            }
        })
        .catch(error => {
            console.error(error);
        });
});
