// import AddItem from "./components/AddItem";
import List from "./components/List";
import ModalAdd from "./components/ModalAdd";
import { useState } from "react";
import { v4 } from "uuid";
import { getProduct, saveProduct } from "./services/storage";

function App() {
  const [list, setList] = useState(getProduct());

  function onAddTransactionSubmit(
    title,
    description,
    expense,
    dataSelecionando
  ) {
    const newList = {
      id: v4(),
      title,
      description,
      expense,
      dataSelecionando,
    };
    setList([...list, newList]);
    saveProduct([...list, newList]);
  }

  function onDeleteTaskClick(itemId) {
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
    saveProduct(newList);
  }

  function onEditTaskClick(
    itemId,
    title,
    description,
    expense,
    dataSelecionando
  ) {
    const itemToEdit = list.find((item) => item.id === itemId);
    const newList = list.map((item) =>
      item.id === itemId
        ? {
            ...item,
            title,
            description,
            expense,
            dataSelecionando,
          }
        : item
    );
    if (itemToEdit) {
      setList(newList);
    }
    saveProduct(newList);
    saveProduct(newList);
  }

  return (
    <div className="w-screen h-screen bg-amber-300 flex  justify-center p-6">
      <div className="w-[600px] space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow">
          <h1 className="text-2xl font-bold text-gray-900">Minhas Finanças</h1>
          <ModalAdd onAddTransactionSubmit={onAddTransactionSubmit} />
        </div>

        <div>
          <List
            items={list}
            onDeleteTaskClick={onDeleteTaskClick}
            onEditTaskClick={onEditTaskClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
