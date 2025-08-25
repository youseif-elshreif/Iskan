"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaTrash,
  FaCheck,
  FaPause,
  FaEdit,
} from "react-icons/fa";

interface Appointment {
  id: string;
  date: string;
  time: string;
  userName?: string;
  userPhone?: string;
  userMessage?: string;
  status: "available" | "booked" | "completed" | "postponed";
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);
  const [postponingAppointment, setPostponingAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });
  const [postponeData, setPostponeData] = useState({
    date: "",
    time: "",
  });

  // Show message for 3 seconds
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Fetch appointments from JSON Server
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3002/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Add new appointment
  const addAppointment = async (appointmentData: Omit<Appointment, "id">) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3002/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        await fetchAppointments();
        setShowForm(false);
        setFormData({ date: "", time: "" });
        showMessage("تم إضافة الموعد بنجاح", "success");
      } else {
        showMessage("فشل في إضافة الموعد", "error");
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (
    id: string,
    status: Appointment["status"]
  ) => {
    try {
      setLoading(true);
      const appointment = appointments.find((apt) => apt.id === id);
      if (!appointment) return;

      const response = await fetch(`http://localhost:3002/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...appointment, status }),
      });

      if (response.ok) {
        await fetchAppointments();
        showMessage("تم تحديث حالة الموعد بنجاح", "success");
      } else {
        showMessage("فشل في تحديث الموعد", "error");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      showMessage("حدث خطأ أثناء تحديث الموعد", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show delete modal
  const handleShowDeleteModal = (appointment: Appointment) => {
    setDeletingAppointment(appointment);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deletingAppointment) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/appointments/${deletingAppointment.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchAppointments();
        setShowDeleteModal(false);
        setDeletingAppointment(null);
        showMessage("تم حذف الموعد بنجاح", "success");
      } else {
        showMessage("فشل في حذف الموعد", "error");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showMessage("حدث خطأ أثناء حذف الموعد", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show postpone modal
  const handleShowPostponeModal = (appointment: Appointment) => {
    setPostponingAppointment(appointment);
    setPostponeData({
      date: appointment.date,
      time: appointment.time,
    });
    setShowPostponeModal(true);
  };

  // Confirm postpone
  const confirmPostpone = async () => {
    if (!postponingAppointment) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/appointments/${postponingAppointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...postponingAppointment,
          date: postponeData.date,
          time: postponeData.time,
          status: "available" as const, // Reset to available with new date/time
        }),
      });

      if (response.ok) {
        await fetchAppointments();
        setShowPostponeModal(false);
        setPostponingAppointment(null);
        setPostponeData({ date: "", time: "" });
        showMessage("تم تأجيل الموعد بنجاح", "success");
      } else {
        showMessage("فشل في تأجيل الموعد", "error");
      }
    } catch (error) {
      console.error("Error postponing appointment:", error);
      showMessage("حدث خطأ أثناء تأجيل الموعد", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment = {
      date: formData.date,
      time: formData.time,
      status: "available" as const,
    };

    await addAppointment(newAppointment);
  };

  // Filter appointments by status
  const availableAppointments = appointments.filter(
    (apt) => apt.status === "available"
  );
  const bookedAppointments = appointments.filter(
    (apt) => apt.status === "booked"
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed"
  );
  const postponedAppointments = appointments.filter(
    (apt) => apt.status === "postponed"
  );

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Statistics */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              إدارة المواعيد
            </h1>
            <div className="flex gap-4 mt-2 text-sm">
              <span style={{ color: "var(--color-text-muted)" }}>
                المتاحة: {availableAppointments.length}
              </span>
              <span style={{ color: "var(--color-text-muted)" }}>
                المحجوزة: {bookedAppointments.length}
              </span>
              <span style={{ color: "var(--color-text-muted)" }}>
                المكتملة: {completedAppointments.length}
              </span>
              <span style={{ color: "var(--color-text-muted)" }}>
                المؤجلة: {postponedAppointments.length}
              </span>
            </div>
          </div>
          <Button
            variant="filled"
            onClick={() => {
              setShowForm(!showForm);
              setFormData({ date: "", time: "" });
            }}
            disabled={loading}
          >
            <FaPlus className="ml-2" />
            إضافة موعد جديد
          </Button>
        </div>

        {/* Message Notification */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-red-100 border border-red-300 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {showForm && (
          <Card className="mb-8">
            <h2
              className="text-xl font-semibold mb-6"
              style={{ color: "var(--color-secondary)" }}
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
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
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
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
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

              <div className="flex space-x-4 space-x">
                <Button type="submit" variant="filled" disabled={loading}>
                  {loading ? "جاري الحفظ..." : "إضافة الموعد"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => setShowForm(false)}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Appointments */}
          <div>
            <h2
              className="text-2xl font-semibold mb-6 flex items-center"
              style={{ color: "var(--color-secondary)" }}
            >
              <FaCalendarAlt className="ml-3" />
              المواعيد المتاحة ({availableAppointments.length})
            </h2>

            <div className="space-y-4">
              {availableAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt
                          className="ml-2"
                          style={{ color: "var(--color-secondary)" }}
                        />
                        <span style={{ color: "var(--color-text)" }}>
                          {new Date(appointment.date).toLocaleDateString(
                            "ar-EG"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaClock
                          className="ml-2"
                          style={{ color: "var(--color-secondary)" }}
                        />
                        <span style={{ color: "var(--color-text)" }}>
                          {appointment.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 space-x">
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handleShowDeleteModal(appointment)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        disabled={loading}
                      >
                        <FaTrash className="ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {availableAppointments.length === 0 && (
                <div className="text-center py-8">
                  <p style={{ color: "var(--color-text)" }}>
                    لا توجد مواعيد متاحة
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Booked Appointments */}
          <div>
            <h2
              className="text-2xl font-semibold mb-6 flex items-center"
              style={{ color: "var(--color-primary)" }}
            >
              <FaUser className="ml-3" />
              المواعيد المحجوزة ({bookedAppointments.length})
            </h2>

            <div className="space-y-4">
              {bookedAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <FaCalendarAlt
                            className="ml-2"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <span style={{ color: "var(--color-text)" }}>
                            {new Date(appointment.date).toLocaleDateString(
                              "ar-EG"
                            )}
                          </span>
                          <FaClock
                            className="mr-4 ml-2"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <span style={{ color: "var(--color-text)" }}>
                            {appointment.time}
                          </span>
                        </div>
                      </div>

                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-background)",
                        }}
                      >
                        محجوز
                      </span>
                    </div>

                    {appointment.userName && (
                      <div
                        className="border-t pt-3"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <div className="flex items-center mb-2">
                          <FaUser
                            className="ml-2"
                            style={{ color: "var(--color-secondary)" }}
                          />
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {appointment.userName}
                          </span>
                        </div>

                        {appointment.userPhone && (
                          <div className="flex items-center mb-2">
                            <FaPhone
                              className="ml-2"
                              style={{ color: "var(--color-secondary)" }}
                            />
                            <a
                              href={`tel:${appointment.userPhone}`}
                              className="hover:underline"
                              style={{ color: "var(--color-text)" }}
                            >
                              {appointment.userPhone}
                            </a>
                          </div>
                        )}

                        {appointment.userMessage && (
                          <div>
                            <p
                              className="text-sm font-medium mb-1"
                              style={{ color: "var(--color-primary)" }}
                            >
                              الرسالة:
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: "var(--color-text)" }}
                            >
                              {appointment.userMessage}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons for Booked Appointments */}
                    <div
                      className="flex flex-wrap gap-2 pt-3 border-t"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <Button
                        variant="filled"
                        size="sm"
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "completed")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={loading}
                      >
                        <FaCheck className="ml-1" />
                        إتمام
                      </Button>
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handleShowPostponeModal(appointment)}
                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                        disabled={loading}
                      >
                        <FaPause className="ml-1" />
                        تأجيل
                      </Button>
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handleShowDeleteModal(appointment)}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        disabled={loading}
                      >
                        <FaTrash className="ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {bookedAppointments.length === 0 && (
                <div className="text-center py-8">
                  <p style={{ color: "var(--color-text)" }}>
                    لا توجد مواعيد محجوزة
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completed and Postponed Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Completed Appointments */}
          <div>
            <h2
              className="text-2xl font-semibold mb-6 flex items-center"
              style={{ color: "var(--color-accent)" }}
            >
              <FaCheck className="ml-3" />
              المواعيد المكتملة ({completedAppointments.length})
            </h2>

            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <FaCalendarAlt
                            className="ml-2"
                            style={{ color: "var(--color-accent)" }}
                          />
                          <span style={{ color: "var(--color-text)" }}>
                            {new Date(appointment.date).toLocaleDateString(
                              "ar-EG"
                            )}
                          </span>
                          <FaClock
                            className="mr-4 ml-2"
                            style={{ color: "var(--color-accent)" }}
                          />
                          <span style={{ color: "var(--color-text)" }}>
                            {appointment.time}
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        مكتمل
                      </span>
                    </div>

                    {appointment.userName && (
                      <div className="flex items-center">
                        <FaUser
                          className="ml-2"
                          style={{ color: "var(--color-accent)" }}
                        />
                        <span style={{ color: "var(--color-text)" }}>
                          {appointment.userName}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handleShowDeleteModal(appointment)}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        disabled={loading}
                      >
                        <FaTrash className="ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {completedAppointments.length === 0 && (
                <div className="text-center py-8">
                  <p style={{ color: "var(--color-text)" }}>
                    لا توجد مواعيد مكتملة
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Postponed Appointments */}
          <div>
            <h2
              className="text-2xl font-semibold mb-6 flex items-center"
              style={{ color: "var(--color-warning)" }}
            >
              <FaPause className="ml-3" />
              المواعيد المؤجلة ({postponedAppointments.length})
            </h2>

            <div className="space-y-4">
              {postponedAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-yellow-50">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <FaCalendarAlt
                            className="ml-2"
                            style={{ color: "var(--color-warning)" }}
                          />
                          <span style={{ color: "var(--color-text)" }}>
                            {new Date(appointment.date).toLocaleDateString(
                              "ar-EG"
                            )}
                          </span>
                          <FaClock
                            className="mr-4 ml-2"
                            style={{ color: "var(--color-warning)" }}
                          />
                          <span style={{ color: "var(--color-text)" }}>
                            {appointment.time}
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                        مؤجل
                      </span>
                    </div>

                    {appointment.userName && (
                      <div className="flex items-center">
                        <FaUser
                          className="ml-2"
                          style={{ color: "var(--color-warning)" }}
                        />
                        <span style={{ color: "var(--color-text)" }}>
                          {appointment.userName}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="filled"
                        size="sm"
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "booked")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={loading}
                      >
                        <FaEdit className="ml-1" />
                        إعادة جدولة
                      </Button>
                      <Button
                        variant="filled"
                        size="sm"
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "completed")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={loading}
                      >
                        <FaCheck className="ml-1" />
                        إتمام
                      </Button>
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handleShowDeleteModal(appointment)}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        disabled={loading}
                      >
                        <FaTrash className="ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {postponedAppointments.length === 0 && (
                <div className="text-center py-8">
                  <p style={{ color: "var(--color-text)" }}>
                    لا توجد مواعيد مؤجلة
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && deletingAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  تأكيد الحذف
                </h3>
                <p
                  className="mb-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  هل أنت متأكد من حذف هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
                <div className="flex space-x-4 space-x">
                  <Button
                    onClick={confirmDelete}
                    variant="filled"
                    size="md"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={loading}
                  >
                    {loading ? "جاري الحذف..." : "حذف"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletingAppointment(null);
                    }}
                    variant="outlined"
                    size="md"
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Postpone Modal */}
        {showPostponeModal && postponingAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  تأجيل الموعد
                </h3>
                <p
                  className="mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  اختر التاريخ والوقت الجديد للموعد:
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--color-primary)" }}
                    >
                      التاريخ الجديد
                    </label>
                    <input
                      type="date"
                      value={postponeData.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        setPostponeData({ ...postponeData, date: e.target.value })
                      }
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
                      الوقت الجديد
                    </label>
                    <input
                      type="time"
                      value={postponeData.time}
                      onChange={(e) =>
                        setPostponeData({ ...postponeData, time: e.target.value })
                      }
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

                <div className="flex space-x-4 space-x">
                  <Button
                    onClick={confirmPostpone}
                    variant="filled"
                    size="md"
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                    disabled={loading || !postponeData.date || !postponeData.time}
                  >
                    {loading ? "جاري التأجيل..." : "تأجيل"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowPostponeModal(false);
                      setPostponingAppointment(null);
                      setPostponeData({ date: "", time: "" });
                    }}
                    variant="outlined"
                    size="md"
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
