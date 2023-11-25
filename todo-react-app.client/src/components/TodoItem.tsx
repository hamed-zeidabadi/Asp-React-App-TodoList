import React, { useState } from "react";

interface TodoItemProps {
  item: { title: string; isCompleted: boolean };
  onDelete: (item: { title: string; isCompleted: boolean }) => void;
  onSave: (
    oldItem: { title: string; isCompleted: boolean },
    newName: string
  ) => void;
  toggleComplete: (clickedItem: {
    title: string;
    isCompleted: boolean;
  }) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onDelete,
  onSave,
  toggleComplete,
}) => {
  const [editing, setEditing] = useState(false);

  const renderTodoItem = () => {
    const isCompleted = item.isCompleted;

    if (editing) {
      return (
        <form className="todo-item-wrapper" onSubmit={handleSave}>
          <input
            className="editing-form-input"
            type="text"
            defaultValue={item.title}
            onFocus={handleFocus}
            autoFocus
          />
          {renderButtons()}
        </form>
      );
    }

    return (
      <div className="todo-item-wrapper">
        <p
          className={
            isCompleted ? "todo-item-name--completed" : "todo-item-name"
          }
          onClick={() => toggleComplete(item)}
        >
          {item.title}
        </p>
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    if (editing) {
      return (
        <div>
          <button className="button" type="button" onClick={handleSave}>
            ذخیره{" "}
          </button>
          <button className="button" type="button" onClick={onCancel}>
            لغو
          </button>
        </div>
      );
    }

    return (
      <div>
        <button className="button" type="button" onClick={onEdit}>
          ویرایش{" "}
        </button>
        <button className="button" type="button" onClick={() => onDelete(item)}>
          حذف{" "}
        </button>
      </div>
    );
  };

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    onSave(
      item,
      (document.getElementById("editingItem") as HTMLInputElement)?.value || ""
    );
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return <li className="todo-item">{renderTodoItem()}</li>;
};

export default TodoItem;
