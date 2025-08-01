// components/MissionCalendar.jsx
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Liste des événements
const events = [
  {
    title: '🌀 Kickoff Projet',
    start: new Date(2025, 7, 1, 9, 0),
    end: new Date(2025, 7, 1, 10, 0),
  },
  {
    title: '🎨 Réunion Design',
    start: new Date(2025, 7, 2, 14, 0),
    end: new Date(2025, 7, 2, 15, 0),
  },
  {
    title: '🍕 Lunch Team',
    start: new Date(2025, 7, 3, 12, 0),
    end: new Date(2025, 7, 3, 13, 0),
  },
  {
    title: '🎉 Happy Hour',
    start: new Date(2025, 7, 4, 16, 0),
    end: new Date(2025, 7, 4, 17, 0),
  },
];

// Fonction pour colorier les événements
const eventStyleGetter = (event) => {
  let bgColor = '#3b82f6'; // par défaut : bleu Tailwind

  if (event.title.includes('Design')) bgColor = '#22d3ee'; // cyan
  else if (event.title.includes('Lunch')) bgColor = '#facc15'; // jaune
  else if (event.title.includes('Happy')) bgColor = '#ef4444'; // rouge
  else if (event.title.includes('Kickoff')) bgColor = '#6366f1'; // indigo

  const style = {
    backgroundColor: bgColor,
    color: 'white',
    borderRadius: '0.5rem',
    padding: '4px 8px',
    border: 'none',
    fontSize: '0.875rem',
  };

  return { style };
};

export default function MissionCalendar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📅 Calendrier des missions</h2>
      <div className="rounded-lg shadow bg-white overflow-hidden h-[80vh]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['week', 'day', 'month']}
          culture="fr"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
}
