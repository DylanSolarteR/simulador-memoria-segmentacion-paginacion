import { useState } from "react";
import PartitionConfig from "./PartitionsConfig";
import ProcessList from "./ProcessList";
import { useGlobalState } from "../context/GlobalState";

function Management() {
  const [memTypeSelected, setMemTypeSelected] = useState("");
  const {
    changeMemMapBuild,
    resetProcessListColor,
    setPartitionsArray,
    clearTask,
  } = useGlobalState();

  const handleSelectChange = (event) => {
    resetProcessListColor();
    setPartitionsArray([]);
    setMemTypeSelected(event.target.value);
    if (event.target.value == "Dinamic_Memory") {
      changeMemMapBuild("Dinamic");
    } else {
      changeMemMapBuild("Default");
    }
  };

  return (
    <div
      id="parameters"
      className="h-full w-1/4 flex flex-col align-top gap-4 border-x-2 border-white overflow-auto"
    >
      <div
        id="config"
        className="w-full h-auto flex flex-col items-center justify-around align-top"
      >
        <section
          id="wrapper-tipo-mem"
          className="w-full h-auto flex flex-col items-center justify-around align-top p-2 pb-4"
        >
          <h2 className="max-w-full w-[90%] font-semibold text-white text-xl mb-2">
            Memory Management
          </h2>
          <select
            name="tipo-mem"
            value={memTypeSelected}
            onChange={handleSelectChange}
            className="max-w-full w-[90%] rounded text-teal-600 text-center h-8"
            id="select-mem-type"
          >
            <option value="" disabled defaultValue hidden>
              Select the memory type
            </option>
            <option value="Fixed_Memory">Fixed Memory</option>
            <option value="Variable_Memory">Variable Memory</option>
            <option value="Dinamic_Memory">Dinamic Memory</option>
          </select>
        </section>
        <section className="w-full h-auto p-2 border-y-4 border-white text-white">
          {/* <PartitionConfig memType={memTypeSelected} /> */}
        </section>
      </div>
      <section
        id="executed-processes"
        className="w-full h-full flex flex-col items-center justify-top px-2"
      >
        <h2 className="max-w-full w-[90%] font-semibold text-white text-xl mb-2">
          Processes List
        </h2>
        <ProcessList />
        <div
          id="program-buttons"
          className="w-full max-w-full flex flex-row justify-center p-4 gap-2 lg:gap-16 flex-wrap text-white"
        >
          <input
            type="button"
            value="Clear"
            onClick={clearTask}
            className="max-w-22 w-24 border-2 border-white p-2 rounded-md hover:bg-teal-600 hover:scale-105"
          />
        </div>
      </section>
    </div>
  );
}

export default Management;
