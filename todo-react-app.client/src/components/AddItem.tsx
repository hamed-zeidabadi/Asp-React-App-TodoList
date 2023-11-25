import React, { useState } from "react";

interface AddItemProps {
  onAdd: (newTaskName: string) => void;
  items: { title: string }[];
}

const AddItem: React.FC<AddItemProps> = ({ onAdd, items }) => {
  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItemValue = (
      document.getElementById("newItem") as HTMLInputElement
    )?.value;

    if (!newItemValue) {
      setInfoMessage("You want to add an empty task?");
    } else if (items.some((item) => item.title === newItemValue)) {
      setInfoMessage("This task already exists!");
    } else {
      onAdd(newItemValue);
      (document.getElementById("newItem") as HTMLInputElement).value = "";
      setInfoMessage("");
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        className="add-item-input"
        type="text"
        placeholder="یادداشت جدید را اینجا بنویسید ..."
        id="newItem"
      />
      <input className="add-item-button" type="submit" value="ذخیره" />
      <p className="add-item-info">{infoMessage}</p>
    </form>
  );
};

export default AddItem;
