function SortList({
  items,
  setNewTasks,
  column,
  value,
  children,
  setSortValue,
}) {
  function setRangeValue(value) {
    let updatedTasks = [...items];

    if (value === 0) {
      if (column === "expense") {
        updatedTasks.sort(
          (a, b) => parseFloat(a[column]) - parseFloat(b[column])
        );
      } else {
        updatedTasks.sort((a, b) => a[column].localeCompare(b[column]));
      }
    }
    if (value === 1) {
      if (column === "expense") {
        updatedTasks
          .sort((a, b) => parseFloat(a[column]) - parseFloat(b[column]))
          .reverse();
      } else {
        updatedTasks
          .sort((a, b) => a[column].localeCompare(b[column]))
          .reverse();
      }
    }
    setSortValue(value === 0 ? 1 : 0);
    setNewTasks(updatedTasks);
  }

  return (
    <div>
      <button
        className="text-black p-2 max-sm:text-xs hover:text-amber-600 underline"
        onClick={() => setRangeValue(value)}
      >
        {children}
      </button>
    </div>
  );
}

export default SortList;
