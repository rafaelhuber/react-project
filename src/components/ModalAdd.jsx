import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import DropdownCalendar from "./DropdownCalendar ";

export default function Example(props) {
  const [open, setOpen] = useState(false);
  const [id] = useState(props.item ? props.item.id : "");
  const [title, setTitle] = useState(props.item ? props.item.title : "");
  const [description, setDescription] = useState(
    props.item ? props.item.description : ""
  );
  const [expense, setExpense] = useState(props.item ? props.item.expense : "");
  const [colorText, setColorText] = useState("");
  const [dataSelecionando, setDataSelecionando] = useState(
    props.item ? props.item.dataSelecionando : new Date()
  );

  useEffect(() => {
    setColorText(() => {
      if (expense < 0) {
        return "text-base font-semibold text-red-500";
      } else if (expense > 0) {
        return "text-base font-semibold text-blue-500";
      } else {
        return "text-base text-gray-400";
      }
    });
  }, [expense]);

  const handleChange = (e) => {
    let input = e.target.value;

    input = input
      .replace(",", ".")
      .replace(/[^0-9/./-]/g, "")
      .replace(/(\..*)\./g, "$1");
    if (input.includes("-")) {
      // Remove todos os hífens
      input = input.replace(/-/g, "");
      // Coloca hífen de volta no início, se o valor era negativo
      input = "-" + input;
    }

    setExpense(input);
  };

  function handleSubmit() {
    // Verifica se o título e a descrição não estão vazios
    setOpen(false);
    if (id === null || id === "") {
      if (!title.trim() || !expense.trim()) {
        return alert(
          "Por favor, preencha o título, descrição e o valor da transação."
        );
      }
      props.onAddTransactionSubmit(
        title,
        description,
        expense,
        dataSelecionando
      );
      setTitle("");
      setDescription("");
      setExpense("");
      return;
    } else {
      props.onEditTaskClick(id, title, description, expense, dataSelecionando);
      return;
    }
  }

  function buttonClassName() {
    if (props.buttonClassName) {
      return props.buttonClassName;
    } else {
      return "rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-gray-200 hover:bg-amber-300 hover:text-gray-800";
    }
  }

  useEffect(() => {
    if (props.item?.date) {
      setDataSelecionando(new Date(props.item.date));
    }
  }, [props.item]);

  return (
    <div>
      <button onClick={() => setOpen(true)} className={buttonClassName()}>
        {props.icon ? props.icon : "Adicionar Transação"}
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
                <h2 className="text-2xl text-center text-slate-700 font-bold">
                  Alterar Transação
                </h2>
                <input
                  type="text"
                  placeholder={
                    id !== null ? "Difite o título da Transação" : ""
                  }
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="bg-green-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder={
                    id !== null ? "Difite a descrição da Transação" : ""
                  }
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="bg-green-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="mt-2">
                  <div className="bg-green-50 flex items-center rounded-md px-3 py-1 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div
                      className={`bg-green-50 shrink-0 text-base  select-none sm:text-sm/6 ${colorText}`}
                    >
                      R$
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder={id !== null ? "0.00" : ""}
                      value={expense}
                      onChange={handleChange}
                      className={`bg-green-50 block min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${colorText}`}
                    />
                  </div>

                  <div>
                    <div className="p-10">
                      <h1 className="text-2xl mb-4">Selecionar Data</h1>

                      <DropdownCalendar
                        setDataSelecionando={setDataSelecionando}
                        dataSelecionando={dataSelecionando}
                        value={dataSelecionando}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 sm:ml-3 sm:w-auto"
                >
                  {props.buttonDescription
                    ? props.buttonDescription
                    : "Adicionar"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
