import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";

const locales = {
  fr: fr,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MissionCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMission, setNewMission] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [view, setView] = useState(Views.WEEK);

  const handleAddEvent = () => {
    if (!newMission.title || !newMission.start || !newMission.end) return;

    const newStart = new Date(newMission.start);
    const newEnd = new Date(newMission.end);

    const overlap = events.some(
      (event) =>
        newStart <= new Date(event.end) && newEnd >= new Date(event.start)
    );

    if (overlap) {
      alert("Une mission est déjà assignée à cette date.");
      return;
    }

    const missionToAdd = {
      id: uuidv4(),
      title: newMission.title,
      start: newStart,
      end: newEnd,
      allDay: true,
    };

    setEvents([...events, missionToAdd]);
    setNewMission({ title: "", start: "", end: "" });
    setShowModal(false);
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#2563eb",
        borderRadius: "0.5rem",
        color: "white",
        border: "none",
        display: "block",
        padding: "0.25rem 0.5rem",
      },
    };
  };

  return (
    <div className="p-4 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Planning des Missions</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView(Views.WEEK)}
            className={`px-3 py-1 rounded ${view === Views.WEEK ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView(Views.MONTH)}
            className={`px-3 py-1 rounded ${view === Views.MONTH ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Mois
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-1 bg-green-600 text-white rounded"
          >
            + Ajouter une mission
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={(newView) => setView(newView)}
          views={[Views.WEEK, Views.MONTH]}
          culture="fr"
          defaultDate={new Date()}
          eventPropGetter={eventStyleGetter}
          style={{ height: "100%" }}
          toolbar={false}
          min={new Date(0, 0, 0, 7, 0)}
          max={new Date(0, 0, 0, 18, 0)}
        />
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <Dialog.Title className="text-lg font-medium mb-4">Nouvelle mission</Dialog.Title>
            <input
              type="text"
              placeholder="Titre de la mission"
              className="border p-2 w-full mb-2"
              value={newMission.title}
              onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
            />
            <label className="block text-sm font-medium">Date de début</label>
            <input
              type="date"
              className="border p-2 w-full mb-2"
              value={newMission.start}
              onChange={(e) => setNewMission({ ...newMission, start: e.target.value })}
            />
            <label className="block text-sm font-medium">Date de fin</label>
            <input
              type="date"
              className="border p-2 w-full mb-4"
              value={newMission.end}
              onChange={(e) => setNewMission({ ...newMission, end: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Ajouter
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default MissionCalendar;
