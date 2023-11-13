import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendar = () => {
    const days = [];
    const daysCount = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const startDay = startOfMonth(currentDate);

    for (let i = 0; i < startDay; i++) {
      days.push(null); // Ajouter des espaces vides pour les jours précédents
    }

    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div>
      <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <button onClick={handlePrevMonth}>Mois précédent</button>
      <button onClick={handleNextMonth}>Mois suivant</button>
      <table>
        <thead>
          <tr>
            <th>Dim</th>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mer</th>
            <th>Jeu</th>
            <th>Ven</th>
            <th>Sam</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendar().map((day, index) => (
            <td key={index}>{day}</td>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
