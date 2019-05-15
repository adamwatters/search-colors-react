import React, { useState } from "react";
import "./App.css";
import namedColors from "color-name-list";
import Fuse from "fuse.js";

const fuse = new Fuse(namedColors, {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 16,
  minMatchCharLength: 1,
  keys: ["name"]
});

function Color({ color }) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      tabindex="0"
      key={color.hex}
      style={{
        backgroundColor: color.hex,
        height: focus ? 35 : 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "height .2s"
      }}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    >
      {color.name}
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const colors = fuse.search(search).slice(0, 60);

  return (
    <div className="App">
      <input
        style={{ width: 300, height: 60, fontSize: 40, margin: 20 }}
        type="text"
        onChange={handleSearchChange}
        value={search}
      />
      <div>
        {colors.map(color => (
          <Color color={color} />
        ))}
      </div>
      {}
    </div>
  );
}

export default App;
