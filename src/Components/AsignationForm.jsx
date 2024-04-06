import { useState } from "react";
import { useGlobalState } from "../context/GlobalState";

function AsignationForm() {
  const { addProgram, counter, setCounter } = useGlobalState();

  const [ProgramName, setProgramName] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [bss, setBss] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addProgram({
      pid: "P" + counter,
      name: ProgramName,
      segments: {
        text: parseInt(text),
        data: parseInt(data),
        bss: parseInt(bss),
        heap: 131072,
        stack: 65536,
      },
      size: parseInt(text) + parseInt(data) + parseInt(bss) + 131072 + 65536,
      PageTable: [],
    });

    setProgramName("");
    setText("");
    setData("");
    setBss("");
  };

  return (
    <div className="flex flex-col py-4 justify-center w-full">
      <h1 className="px-6 py-2 text-xl font-bold w-fit">Program Asignation</h1>

      <form
        className="flex flex-col justify-center gap-4 items-center"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col px-6 align-middle justify-start">
          <label className="font-normal max-w-full w-full">Name: </label>
          <input
            type="text"
            onChange={(e) => setProgramName(e.target.value)}
            value={ProgramName}
            className="bg-white text-black max-w-full w-full rounded px-4 py-1"
          />
        </div>

        <div className="flex flex-col px-6 align-middle justify-start">
          <label className="font-normal max-w-full w-full">
            Text Size (Bytes):{" "}
          </label>
          <input
            className="bg-white text-black max-w-full w-full rounded px-4 py-1"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>

        <div className="flex flex-col px-6 align-middle justify-start">
          <label className="font-normal max-w-full w-full">
            Data Size (Bytes):{" "}
          </label>
          <input
            className="bg-white text-black max-w-full w-full rounded px-4 py-1"
            onChange={(e) => setData(e.target.value)}
            value={data}
          />
        </div>

        <div className="flex flex-col px-6 align-middle justify-start">
          <label className="font-normal max-w-full w-full">
            Bss Size (Bytes):{" "}
          </label>
          <input
            className="bg-white text-black max-w-full w-full rounded px-4 py-1"
            onChange={(e) => setBss(e.target.value)}
            value={bss}
          />
        </div>

        <div className="flex justify-center">
          <button className="p-2 text-white bg-teal-600 w-20 rounded">
            Assign
          </button>
        </div>
      </form>
    </div>
  );
}

export default AsignationForm;
