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
      updatedTasks.sort((a, b) => a[column].localeCompare(b[column]));
    }
    if (value === 1) {
      updatedTasks.sort((a, b) => a[column].localeCompare(b[column])).reverse();
    }
    setSortValue(value === 0 ? 1 : 0);
    setNewTasks(updatedTasks);
  }

  return (
    <div>
      <button
        className="text-black p-2 hover:text-amber-600 hover:bg-amber-100 rounded-md"
        onClick={() => setRangeValue(value)}
      >
        {children}
      </button>
    </div>
  );
}

export default SortList;
