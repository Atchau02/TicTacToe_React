import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  function clickHandler() {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      onNameChange(symbol, name);
    }
  }

  function changeHandler(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && (
          <input
            type="text"
            required
            value={name}
            onChange={changeHandler}
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={clickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
