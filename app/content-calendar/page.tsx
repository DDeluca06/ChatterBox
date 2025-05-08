"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // ISO string
  description?: string;
}

function getMonthMatrix(date: Date) {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
  const endDate = endOfWeek(endMonth, { weekStartsOn: 0 });
  const matrix = [];
  let curr = startDate;
  while (curr <= endDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(curr);
      curr = addDays(curr, 1);
    }
    matrix.push(week);
  }
  return matrix;
}

export default function ContentCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const monthMatrix = getMonthMatrix(currentMonth);

  // Fetch events on mount
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/calendar-events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    }
    fetchEvents();
  }, []);

  function openAddDialog(date: Date) {
    setSelectedDate(date);
    setEditEvent(null);
    setForm({ title: "", description: "" });
    setDialogOpen(true);
  }

  function openEditDialog(event: CalendarEvent) {
    setSelectedDate(new Date(event.date));
    setEditEvent(event);
    setForm({ title: event.title, description: event.description || "" });
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setEditEvent(null);
    setForm({ title: "", description: "" });
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (!selectedDate || !form.title.trim()) return;
    const dateISO = selectedDate.toISOString();
    if (editEvent) {
      // Update event
      const updated: CalendarEvent = {
        ...editEvent,
        title: form.title,
        description: form.description,
        date: dateISO,
      };
      setEvents(events.map(ev => ev.id === editEvent.id ? updated : ev));
      await fetch("/api/calendar-events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editEvent.id, title: form.title, description: form.description, date: dateISO }),
      });
    } else {
      // Create event
      const res = await fetch("/api/calendar-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, description: form.description, date: dateISO }),
      });
      if (res.ok) {
        const newEvent = await res.json();
        setEvents([...events, newEvent]);
      }
    }
    handleDialogClose();
  }

  async function handleDelete(eventId: number) {
    setEvents(events.filter(ev => ev.id !== eventId));
    await fetch("/api/calendar-events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: eventId }),
    });
    handleDialogClose();
  }

  function renderDayCell(date: Date) {
    const dayEvents = events.filter(ev => format(new Date(ev.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
    return (
      <div className={"relative h-24 border rounded-lg p-1 " + (!isSameMonth(date, currentMonth) ? "bg-muted" : "bg-background")}
        onClick={() => openAddDialog(date)}
        tabIndex={0}
        role="button"
        aria-label={`Add event for ${format(date, "MMM d")}`}
      >
        <div className={"text-xs font-semibold " + (isSameDay(date, new Date()) ? "text-blue-600" : "")}>{format(date, "d")}</div>
        <div className="space-y-1 mt-1">
          {dayEvents.map(ev => (
            <div key={ev.id} className="flex items-center bg-blue-100 text-blue-900 rounded px-1 py-0.5 text-xs cursor-pointer hover:bg-blue-200"
              onClick={e => { e.stopPropagation(); openEditDialog(ev); }}
            >
              <span className="truncate flex-1">{ev.title}</span>
              <Pencil className="w-3 h-3 ml-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Content Calendar</h1>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>&lt; Prev</Button>
        <div className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</div>
        <Button variant="outline" onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>Next &gt;</Button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="text-xs font-medium text-center text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {monthMatrix.flat().map((date, i) => (
          <div key={i}>{renderDayCell(date)}</div>
        ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editEvent ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <Input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleFormChange}
            className="mb-2"
            autoFocus
          />
          <Textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleFormChange}
            className="mb-2"
          />
          <div className="text-xs text-muted-foreground mb-2">{selectedDate ? format(selectedDate, "PPP") : ""}</div>
          <DialogFooter>
            {editEvent && (
              <Button variant="destructive" onClick={() => handleDelete(editEvent.id)} className="mr-auto" size="sm">
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            )}
            <Button variant="outline" onClick={handleDialogClose} size="sm">Cancel</Button>
            <Button onClick={handleSave} size="sm">{editEvent ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 