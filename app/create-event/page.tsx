"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type EventFormValues = {
  title: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  organizer: string;
  tags: string;
  agenda: string;
  description: string;
};

const initialFormValues: EventFormValues = {
  title: "",
  overview: "",
  venue: "",
  location: "",
  date: "",
  time: "",
  mode: "online",
  audience: "",
  organizer: "",
  tags: "",
  agenda: "",
  description: "",
};

const CreateEventPage = () => {
  const [formValues, setFormValues] =
    useState<EventFormValues>(initialFormValues);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tagsArray = formValues.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const agendaArray = formValues.agenda
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !formValues.title ||
      !formValues.overview ||
      !formValues.venue ||
      !formValues.location ||
      !formValues.date ||
      !formValues.time ||
      !formValues.mode ||
      !formValues.audience ||
      !formValues.organizer ||
      !formValues.description ||
      !imageFile ||
      tagsArray.length === 0 ||
      agendaArray.length === 0
    ) {
      return;
    }

    try {
      const requestFormData = new FormData();
      requestFormData.append("title", formValues.title);
      requestFormData.append("overview", formValues.overview);
      requestFormData.append("venue", formValues.venue);
      requestFormData.append("location", formValues.location);
      requestFormData.append("date", formValues.date);
      requestFormData.append("time", formValues.time);
      requestFormData.append("mode", formValues.mode);
      requestFormData.append("audience", formValues.audience);
      requestFormData.append("organizer", formValues.organizer);
      requestFormData.append("description", formValues.description);
      requestFormData.append("tags", JSON.stringify(tagsArray));
      requestFormData.append("agenda", JSON.stringify(agendaArray));
      requestFormData.append("image", imageFile);

      for (const [key, value] of requestFormData.entries()) {
        console.log(key, value);
      }

      const response = await fetch("/api/events", {
        method: "POST",
        body: requestFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      console.log("Event created successfully");
      setFormValues(initialFormValues);
      setImageFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create Event
          </h1>
          <p className="text-sm text-white/70 sm:text-base">
            Fill in the details below to draft a new event.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-white/80"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formValues.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
                placeholder="Enter event title"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="venue"
                className="text-sm font-medium text-white/80"
              >
                Venue
              </label>
              <input
                id="venue"
                name="venue"
                type="text"
                value={formValues.venue}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
                placeholder="Enter event venue"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="overview"
              className="text-sm font-medium text-white/80"
            >
              Overview
            </label>
            <textarea
              id="overview"
              name="overview"
              value={formValues.overview}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
              placeholder="Provide an overview"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-medium text-white/80"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formValues.location}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
                placeholder="Enter event location"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="time"
                className="text-sm font-medium text-white/80"
              >
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={formValues.time}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="text-sm font-medium text-white/80"
              >
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formValues.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mode"
                className="text-sm font-medium text-white/80"
              >
                Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={formValues.mode}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/25 focus:bg-white/15"
              >
                <option value="online" className="bg-zinc-900 text-white">
                  Online
                </option>
                <option value="offline" className="bg-zinc-900 text-white">
                  Offline
                </option>
                <option value="hybrid" className="bg-zinc-900 text-white">
                  Hybrid
                </option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="audience"
                className="text-sm font-medium text-white/80"
              >
                Audience
              </label>
              <input
                id="audience"
                name="audience"
                type="text"
                value={formValues.audience}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
                placeholder="Who is this event for?"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="organizer"
                className="text-sm font-medium text-white/80"
              >
                Organizer
              </label>
              <input
                id="organizer"
                name="organizer"
                type="text"
                value={formValues.organizer}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
                placeholder="Organizer name"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="text-sm font-medium text-white/80"
              >
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formValues.tags}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
                placeholder="react, node, conference"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-medium text-white/80"
              >
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setImageFile(event.target.files?.[0] ?? null)
                }
                required
                className="block w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="agenda"
              className="text-sm font-medium text-white/80"
            >
              Agenda (one item per line)
            </label>
            <textarea
              id="agenda"
              name="agenda"
              value={formValues.agenda}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15"
              placeholder={"Introduction\nTech Talk\nQ&A"}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-white/80"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/15 md:rows-6"
              placeholder="Describe the event"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-white/90"
          >
            Create Event
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateEventPage;
