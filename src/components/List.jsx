import { Pen, TrashIcon, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import ModalAdd from "./ModalAdd";
import SortList from "./SortList";

function List(props) {
  const [newTasks, setNewTasks] = useState([...props.items]);
  const [sortValue, setSortValue] = useState(0);

  useEffect(() => {
    setNewTasks([...props.items]);
  }, [props.items]);

  function colorText(expense) {
    if (expense < 0) {
      return "text-red-600 ";
    } else if (expense > 0) {
      return "text-blue-600";
    }
  }

  function result() {
    return props.items
      .reduce((total, item) => parseFloat(total) + parseFloat(item.expense), 0)
      .toFixed(2);
  }

  return (
    <div className="space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col overflow-auto max-h-150">
      <h2 className="text-3xl text-slate-700 font-bold text-center">
        Lista de Transação
      </h2>

      <table className="table-fixed w-full text-left border-separate border border-gray-400">
        <thead className="bg-slate-300 text-slate-800">
          <tr>
            <th className="px-2">
              <div className="flex items-center">
                <p className="max-sm:text-xs">Data</p>
                <SortList
                  value={sortValue}
                  setSortValue={setSortValue}
                  items={props.items}
                  setNewTasks={setNewTasks}
                  column={"title".toLowerCase()}
                >
                  <ArrowUpDown size={15} className="text-gray-600" />
                </SortList>
              </div>
            </th>
            <th className="px-2">
              <div className="flex items-center ">
                <p className="max-sm:text-xs">Titulo</p>
                <SortList
                  value={sortValue}
                  setSortValue={setSortValue}
                  items={props.items}
                  setNewTasks={setNewTasks}
                  column={"title".toLowerCase()}
                >
                  <ArrowUpDown size={15} className="text-gray-600" />
                </SortList>
              </div>
            </th>

            <th className=" px-2 ">
              <div className="text-right flex items-center justify-end ">
                <p className="max-sm:text-xs">Despesa</p>
                <SortList
                  value={sortValue}
                  setSortValue={setSortValue}
                  items={props.items}
                  setNewTasks={setNewTasks}
                  column={"expense"}
                >
                  <ArrowUpDown size={15} className="text-gray-600" />
                </SortList>
              </div>
            </th>

            <th className="w-24 text-center max-sm:text-xs">Ação</th>
          </tr>
        </thead>
        <tbody>
          {newTasks.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-slate-200 "
              title={`Descrição: ${item.description}`}
            >
              <td className="text-slate-700 font-semibold border border-gray-300 px-2">
                <p className={`text-xs ${colorText(item.expense)}`}>
                  {new Date(item.dataSelecionando).toLocaleDateString()}
                </p>
              </td>
              <td className="text-slate-700 font-semibold border border-gray-300 px-2">
                <p className={colorText(item.expense)}>{item.title}</p>
              </td>
              <td
                className={`text-right text-slate-700 border border-gray-300 px-2`}
              >
                <p className={colorText(item.expense)}>
                  R$ {parseFloat(item.expense).toFixed(2)}
                </p>
              </td>
              <td className="border border-gray-300 space-x-2 flex justify-center p-2">
                <ModalAdd
                  item={item}
                  icon={<Pen />}
                  buttonClassName="text-blue-500 p-2 hover:text-blue-600 hover:bg-blue-100 rounded-md"
                  buttonDescription={"Alterar"}
                  onEditTaskClick={props.onEditTaskClick}
                />

                <button
                  onClick={() => props.onDeleteTaskClick(item.id)}
                  className="text-red-500 max-sm:p-2 hover:text-red-600  hover:bg-red-100 rounded-md"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <thead className="bg-slate-300 text-slate-800">
          <tr>
            <th className="px-2">Total</th>
            <th className="px-2"></th>
            <th className="text-right px-2">
              <p className={colorText(result())}>R$ {result()}</p>
            </th>
            <th className="w-24 text-center"></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default List;
