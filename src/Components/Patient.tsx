import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Check, Calendar as CalendarIcon, User, Image } from "lucide-react";
import { format, isToday, isBefore, startOfDay } from "date-fns";

const Patient: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [takenDates, setTakenDates] = useState<Set<string>>(new Set());

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const isTodaySelected = isToday(selectedDate);

  const handleMarkTaken = (date: string, imageFile?: File) => {
    setTakenDates((prev) => new Set(prev).add(date));
    console.log("Medication marked as taken for:", date);
    if (imageFile) {
      console.log("Proof image uploaded:", imageFile.name);
    }
  };

  const getStreakCount = () => {
    let streak = 0;
    let currentDate = new Date(today);
    while (takenDates.has(format(currentDate, "yyyy-MM-dd")) && streak < 30) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
  };

  type Medication = {
    id: number;
    name: string;
    time: string;
    taken: boolean;
  };

  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedName, setNewMedName] = useState("");
  const [newMedTime, setNewMedTime] = useState("");
  const addMedication = () => {
    if (!newMedName || !newMedTime) return;
    const newMed: Medication = {
      id: Date.now(),
      name: newMedName,
      time: newMedTime,
      taken: false,
    };
    setMedications([...medications, newMed]);
    setNewMedName("");
    setNewMedTime("");
  };

  const markMedicationAsTaken = (id: number) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: true } : med))
    );
  };

  const deleteMedication = (id: number) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  const updateMedication = (id: number, name: string, time: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, name, time } : med))
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              Good{" "}
              {new Date().getHours() < 12
                ? "Morning"
                : new Date().getHours() < 18
                ? "Afternoon"
                : "Evening"}
              !
            </h2>
            <p className="text-white/90 text-lg">
              Ready to stay on track with your medication?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{getStreakCount()}</div>
            <div className="text-white/80">Day Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">
              {takenDates.has(todayStr) ? "✓" : "○"}
            </div>
            <div className="text-white/80">Today's Status</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">
              {Math.round((takenDates.size / 30) * 100)}%
            </div>
            <div className="text-white/80">Monthly Rate</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                Today's Medication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isTodaySelected && takenDates.has(todayStr) ? (
                <>
                  <div className="border-2 border-green-300 bg-green-50 text-center rounded-xl p-6 space-y-2">
                    <div className="flex justify-center">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-700">
                      Medication Completed!
                    </h3>
                    <p className="text-sm text-green-600">
                      Great job! You've taken your medication for{" "}
                      {format(today, "MMMM d, yyyy")}.
                    </p>
                  </div>

                  <div className="border-2 border-green-400 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="text-lg font-semibold text-green-700">
                          Daily Medication Set
                        </div>
                        <div className="text-sm text-green-600">
                          Complete set of daily tablets
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-green-600">🕗 8:00 AM</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">
                        Daily Medication Set
                      </div>
                      <div className="text-sm text-gray-500">
                        Complete set of daily tablets
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">🕗 8:00 AM</div>
                  </div>

                  <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Image className="w-8 h-8 text-gray-500" />
                      <p className="text-sm font-medium text-gray-600">
                        Add Proof Photo (Optional)
                      </p>
                      <p className="text-xs text-gray-400">
                        Take a photo of your medication or pill organizer as
                        confirmation
                      </p>

                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleMarkTaken(todayStr, file);
                          }
                        }}
                      />
                      <label
                        htmlFor="photo-upload"
                        className="mt-2 px-4 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        📷 Take Photo
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMarkTaken(todayStr)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold text-lg"
                  >
                    ✓ Mark as Taken
                  </button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Medication Calendar</CardTitle>
            </CardHeader>

            <CardContent>
              {/* <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="w-full"
                modifiersClassNames={{
                  selected: "bg-blue-600 text-white hover:bg-blue-700",
                }}
              /> */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="w-full"
                modifiers={{
                  taken: (date) => takenDates.has(format(date, "yyyy-MM-dd")),
                  missed: (date) =>
                    isBefore(date, startOfDay(today)) &&
                    !takenDates.has(format(date, "yyyy-MM-dd")),
                  today: (date) => isToday(date),
                }}
                modifiersClassNames={{
                  taken: "bg-green-500 text-white m-1",
                  missed: "bg-red-400 text-white m-1",
                  today: "ring-2 ring-blue-500 m-1",
                }}
              />

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Medication taken</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <span>Missed medication</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span>Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📋 My Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border p-3 rounded-lg"
              >
                <div className="flex flex-col gap-1">
                  <input
                    value={med.name}
                    onChange={(e) =>
                      updateMedication(med.id, e.target.value, med.time)
                    }
                    className="text-base font-semibold border p-1 rounded"
                  />
                  <input
                    type="time"
                    value={med.time}
                    onChange={(e) =>
                      updateMedication(med.id, med.name, e.target.value)
                    }
                    className="text-sm text-muted-foreground border p-1 rounded"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => markMedicationAsTaken(med.id)}
                    disabled={med.taken}
                    className={`px-3 py-1 rounded-md text-sm ${
                      med.taken
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {med.taken ? "✓ Taken" : "Mark as Taken"}
                  </button>
                  <button
                    onClick={() => deleteMedication(med.id)}
                    className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add new medication form */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="text"
              placeholder="Medication name"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="time"
              value={newMedTime}
              onChange={(e) => setNewMedTime(e.target.value)}
              className="w-36 p-2 border rounded"
            />
            <button
              onClick={addMedication}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Add
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patient;
