import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DropdownCalendar({ setDataSelecionando, dataSelecionando }) {
  const [selectedDate, setSelectedDate] = useState(
    dataSelecionando ? new Date(dataSelecionando) : new Date()
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Atualiza selectedDate se dataSelecionando mudar
  useEffect(() => {
    if (dataSelecionando) {
      const novaData = new Date(dataSelecionando);
      if (!isNaN(novaData)) setSelectedDate(novaData);
    }
  }, [dataSelecionando]);

  useEffect(() => {}, [dataSelecionando]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 px-4 py-2 rounded-md w-48 text-left hover:border-blue-400"
      >
        {selectedDate.toLocaleDateString()}
      </button>

      {isOpen && (
        <div className="mt-2 p-2 rounded-md shadow-lg bg-white z-50">
          <Calendar
            onChange={(date) => {
              setSelectedDate(date);
              setIsOpen(false);
              setDataSelecionando(date);
            }}
            value={selectedDate}
          />
        </div>
      )}
    </div>
  );
}

export default DropdownCalendar;
