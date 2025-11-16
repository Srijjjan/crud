import React, { useEffect, useMemo, useState } from "react";

const App = () => {
  const [input, setInput] = useState({
    class: "",
    name: "",
    section: "",
    school: "",
    id: null,
  });

  const [register, setRegister] = useState([]);
  const [update, setUpdate] = useState(null);
  const [search, setSerach] = useState("");
  const [querry, setQuerry] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuerry(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  function handleAddOrUpdate() {
    if (!input.class.trim()) return;
    if (!update) {
      const _id = Date.now();
      setRegister([...register, { ...input, id: _id }]);
    } else {
      setRegister(
        register.map((itm) =>
          itm.id === update.id ? { ...input, id: update.id } : itm
        )
      );
      setUpdate(null);
    }
    clearFields();
  }

  function clearFields() {
    setInput({ class: "", name: "", section: "", school: "", id: "" });
  }
  function handleEdit(itm) {
    setUpdate(itm);
    setInput(itm);
  }

  function handleDelete(delId) {
    setRegister(register.filter((itm) => itm.id !== delId));
  }

  const newarr = useMemo(() => {
    return register.filter((itm) =>
      querry ? itm.class.toLowerCase().includes(querry.toLowerCase()) : true
    );
  }, [querry, register]);

  return (
    <div className=" bg-gray-900 h-screen w-screen text-white ">
      <div>
        <input
          onChange={(e) => setSerach(e.target.value)}
          placeholder="Search"
          value={search}
          className="rounded p-3 border"
          type="text"
        />
        <div>
          <input
            name="class"
            onChange={handleChange}
            placeholder="class"
            value={input.class}
            className="rounded p-2 border"
            type="text"
          />
          <input
            name="name"
            onChange={handleChange}
            placeholder="name"
            value={input.name}
            className="rounded p-2 border"
            type="text"
          />
          <input
            name="section"
            onChange={handleChange}
            placeholder="section"
            value={input.section}
            className="rounded p-2 border"
            type="text"
          />
          <input
            name="school"
            onChange={handleChange}
            placeholder="school"
            value={input.school}
            className="rounded p-2 border"
            type="text"
          />
          <button
            className="bg-green-400 p-2 rounded"
            onClick={handleAddOrUpdate}
          >
            {!update ? "add" : "update"}
          </button>
        </div>
      </div>
      <div>
        {newarr.map((itm) => (
          <div key={itm.id} className="p-2 border bg-teal-500">
            <button onClick={() => handleEdit(itm)} className="bg-pink-500 p-2">
              edit
            </button>
            <button
              onClick={() => handleDelete(itm.id)}
              className="bg-red-500 p-2"
            >
              x
            </button>
            <h2>class : {itm.class}</h2>
            <h2>name :{itm.name}</h2>
            <h2>section :{itm.section}</h2>
            <h2>school : {itm.school}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
