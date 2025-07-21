// import AddItem from "./components/AddItem";
import List from "./components/List";
import ModalAdd from "./components/ModalAdd";
import { useState } from "react";
import { v4 } from "uuid";

function App() {
  const [list, setList] = useState([
    {
      id: 1,
      title: "Compra no ifood",
      description: "dois big mac e duas batatas fritas grandes",
      expense: 35.5,
    },
    {
      id: 2,
      title: "Compra no mercado",
      description: "compra de frutas e verduras",
      expense: 120.0,
    },
    {
      id: 3,
      title: "Compra no shopping",
      description: "compra de roupas e sapatos",
      expense: 250.0,
    },
    {
      id: 4,
      title: "Compra no restaurante",
      description: "jantar com amigos",
      expense: 180.0,
    },
    {
      id: 5,
      title: "Compra no restaurante",
      description: "jantar com amigos",
      expense: -180.0,
    },
    {
      id: 6,
      title: "Compra no ifood",
      description: "dois big mac e duas batatas fritas grandes",
      expense: 35.5,
    },
    {
      id: 7,
      title: "Compra no mercado",
      description: "compra de frutas e verduras",
      expense: 120.0,
    },
  ]);

  function onAddTransactionSubmit(title, description, expense) {
    const newList = {
      id: v4(),
      title,
      description,
      expense,
    };
    setList([...list, newList]);
  }

  function onDeleteTaskClick(itemId) {
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
  }

  function onEditTaskClick(itemId, title, description, expense) {
    const itemToEdit = list.find((item) => item.id === itemId);
    const newList = list.map((item) =>
      item.id === itemId
        ? {
            ...item,
            title,
            description,
            expense,
          }
        : item
    );
    if (itemToEdit) {
      setList(newList);
    }
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
