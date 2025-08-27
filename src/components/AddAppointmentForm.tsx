import React, { useState } from "react";
import { Card, Button } from "@/components/ui/index";

interface AddAppointmentFormProps {
  onSubmit: (date: string, time: string) => void;
  onCancel: () => void;
  loading: boolean;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({
  onSubmit,
  onCancel,
  loading,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      alert("يرجى اختيار التاريخ والوقت");
      return;
    }
    onSubmit(date, time);
    setDate("");
    setTime("");
  };

  return (
    <Card className="mb-8">
      <h2
        className="text-xl font-semibold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        إضافة موعد متاح
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              التاريخ
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              الوقت
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="filled"
            disabled={loading}
            className="px-6 py-3"
          >
            {loading ? "جاري الإضافة..." : "إضافة الموعد"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            className="px-6 py-3"
          >
            إلغاء
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddAppointmentForm;
