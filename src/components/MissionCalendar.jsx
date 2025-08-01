import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { fr: fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function MissionCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#10b981',
      color: 'white',
      borderRadius: '0.5rem',
      padding: '4px 8px',
      fontSize: '0.875rem',
    },
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert('Tous les champs sont requis');
      return;
    }

    const start = new Date(newEvent.start);
    const end = new Date(newEvent.end);

    if (start > end) {
      alert('La date de fin doit être après la date de début');
      return;
    }

    const conflict = events.some(
      (event) =>
        (start <= new Date(event.end) && end >= new Date(event.start))
    );

    if (conflict) {
      alert("Conflit : une autre mission existe sur cette période");
      return;
    }

    setEvents([...events, { ...newEvent, start, end }]);
    setNewEvent({ title: '', start: '', end: '' });
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📆 Planning des missions</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          + Ajouter une mission
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[65vh]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['week', 'month']}
          culture="fr"
          style={{ height: '100%', fontSize: '0.875rem' }}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Nouvelle mission</h3>

            <input
              type="text"
              placeholder="Titre de la mission"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <label className="text-sm text-gray-600">Début</label>
            <input
              type="date"
              value={newEvent.start}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <label className="text-sm text-gray-600">Fin</label>
            <input
              type="date"
              value={newEvent.end}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
