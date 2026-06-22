"use client";

import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";

interface EventItem {
  id: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
  date: string;
}

const sampleEvents: EventItem[] = [
  {
    id: "1",
    title: "Morning Briefing",
    time: "08:30",
    location: "Ruang Diskusi",
    description: "Update pasar modal & agenda harian",
    date: dayjs().format("YYYY-MM-DD"),
  },
  {
    id: "2",
    title: "Workshop Analisis Saham",
    time: "13:00",
    location: "Lab Komputer",
    description: "Pendalaman fundamental & teknikal",
    date: dayjs().format("YYYY-MM-DD"),
  },
  {
    id: "3",
    title: "Sesi Mentoring",
    time: "15:30",
    location: "Zoom",
    description: "Mentoring kelompok riset",
    date: dayjs().add(1, "day").format("YYYY-MM-DD"),
  },
  {
    id: "4",
    title: "Kunjungan Emiten",
    time: "10:00",
    location: "Gedung Bursa",
    description: "Sharing bersama perwakilan emiten",
    date: dayjs().add(2, "day").format("YYYY-MM-DD"),
  },
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildCalendar(month: Dayjs) {
  const startOfMonth = month.startOf("month");
  const startWeekday = startOfMonth.day();
  const gridStart = startOfMonth.subtract(startWeekday, "day");
  return Array.from({ length: 42 }, (_, idx) => gridStart.add(idx, "day"));
}

export default function EventPage() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  const calendarDays = useMemo(
    () => buildCalendar(currentMonth),
    [currentMonth],
  );

  const eventsByDate = useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    sampleEvents.forEach((evt) => {
      map[evt.date] = map[evt.date] ? [...map[evt.date], evt] : [evt];
    });
    return map;
  }, []);

  const selectedEvents = eventsByDate[selectedDate] ?? [];

  const handleDayClick = (date: Dayjs) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-5xl px-6">
        <motion.header
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setCurrentMonth((prev) => prev.subtract(1, "month"))}
            className="text-sm font-semibold text-blue-600"
          >
            &lt; Prev
          </button>
          <h1 className="text-3xl font-bold text-slate-900">
            {currentMonth.format("MMMM YYYY")}
          </h1>
          <button
            onClick={() => setCurrentMonth((prev) => prev.add(1, "month"))}
            className="text-sm font-semibold text-blue-600"
          >
            Next &gt;
          </button>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.section
            className="rounded-2xl border border-slate-200 p-4 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-3 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {dayNames.map((name) => (
                <div key={name}>{name}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const key = day.format("YYYY-MM-DD");
                const isCurrentMonth = day.month() === currentMonth.month();
                const isSelected = key === selectedDate;
                const hasEvents = Boolean(eventsByDate[key]);
                return (
                  <button
                    key={key}
                    onClick={() => handleDayClick(day)}
                    className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm font-semibold transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-600 shadow"
                        : "border-slate-200 bg-white"
                    } ${isCurrentMonth ? "text-slate-900" : "text-slate-400"}`}
                  >
                    <span>{day.date()}</span>
                    {hasEvents && (
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="rounded-2xl border border-slate-200 p-4 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Event {dayjs(selectedDate).format("DD MMM YYYY")}
            </h2>
            <div className="space-y-3">
              {selectedEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
                  Tidak ada event.
                </div>
              ) : (
                selectedEvents.map((evt, index) => (
                  <motion.div
                    key={evt.id}
                    className="rounded-xl border border-slate-200 p-4 shadow-sm"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <p className="text-sm text-slate-500">{evt.time}</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {evt.title}
                    </p>
                    {evt.location && (
                      <p className="text-sm text-slate-500">{evt.location}</p>
                    )}
                    {evt.description && (
                      <p className="mt-1 text-sm text-slate-600">
                        {evt.description}
                      </p>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
