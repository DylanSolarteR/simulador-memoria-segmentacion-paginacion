import React from "react";
import { useGlobalState } from "../context/GlobalState";

function ProgramsDefault() {
  const { addProgram, counter, setCounter } = useGlobalState();

  const handleClick = (item) => {
    switch (item) {
      case "Brave":
        addProgram({
          pid: "P" + counter,
          name: "Brave",
          segments: {
            text: 59898,
            data: 89847,
            bss: 89848,
            heap: 131072,
            stack: 65536,
          },
          size: 59898 + 89847 + 89848 + 131072 + 65536,
          PageTable: [],
        });

        break;

      case "WSL":
        addProgram({
          pid: "P" + counter,
          name: "WSL",
          segments: {
            text: 45050,
            data: 22525,
            bss: 22525,
            heap: 131072,
            stack: 65536,
          },
          size: 45050 + 22525 + 22525 + 131072 + 65536,
          PageTable: [],
        });

        break;

      case "Valorant":
        addProgram({
          pid: "P" + counter,
          name: "Valorant",
          segments: {
            text: 312500,
            data: 312500,
            bss: 625000,
            heap: 131072,
            stack: 65536,
          },
          size: 312500 + 312500 + 625000 + 131072 + 65536,
          PageTable: [],
        });

        break;

      case "Netbeans":
        addProgram({
          pid: "P" + counter,
          name: "Netbeans",
          segments: {
            text: 475000,
            data: 950000,
            bss: 475000,
            heap: 131072,
            stack: 65536,
          },
          size: 475000 + 950000 + 475000 + 131072 + 65536,
          PageTable: [],
        });

        break;

      case "Inkscape":
        addProgram({
          pid: "P" + counter,
          name: "Inkscape",
          segments: {
            text: 794500,
            data: 476700,
            bss: 317800,
            heap: 131072,
            stack: 65536,
          },
          size: 794500 + 476700 + 317800 + 131072 + 65536,
          PageTable: [],
        });

        break;

      default:
        break;
    }
  };

  const programsDefault = ["Brave", "WSL", "Valorant", "Netbeans", "Inkscape"];

  return (
    <div className="flex flex-col gap-2 p-4 justify-center items-center w-full">
      <h1>Default Programs</h1>
      <div className="border border-white flex justify-center items-center p-4">
        <ul className="w-full max-w-full flex flex-col justify-center gap-3">
          {programsDefault.map((item, index) => (
            <div key={index} className="bg-white flex justify-center px-14">
              <li
                onClick={() => handleClick(item)}
                style={{ cursor: "pointer" }}
                className="text-black w-full text-center"
              >
                {item}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProgramsDefault;
