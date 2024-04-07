import { useState } from "react";
import ProcessList from "./ProcessList";
import { useGlobalState } from "../context/GlobalState";
import { Slider } from "./ui/slider";

function Management() {
  const [memSchemeSelected, setMemSchemeSelected] = useState("");
  const {
    memMapBuild,
    changeMemMapBuild,
    resetProcessListColor,
    setOffsetBits,
    memorySchemeBits,
    setMemorySchemeBits,
    initMemory,
    clearPrograms,
  } = useGlobalState();

  const handleSelectChange = (event) => {
    resetProcessListColor();
    setMemSchemeSelected(event.target.value);
    if (event.target.value == "paging") {
      changeMemMapBuild("paging");
    } else {
      changeMemMapBuild("segmentation");
    }
  };

  return (
    <div
      id="parameters"
      className="md:overflow-auto max-h-full h-full w-full md:w-1/4 flex flex-col align-top border-2 border-white"
    >
      <section
        id="config"
        className="w-full h-auto flex flex-col items-center justify-around align-top"
      >
        <section
          id="wrapper-tipo-mem"
          className="w-full h-auto flex flex-col gap-4 items-center justify-around align-top p-2"
        >
          <h2 className="max-w-full w-[90%] font-semibold text-white text-xl mb-2">
            Memory Management Scheme
          </h2>
          <select
            name="mem-scheme"
            value={memSchemeSelected}
            onChange={handleSelectChange}
            className="max-w-full w-[90%] rounded text-teal-600 text-center h-8"
          >
            <option value="" disabled defaultValue hidden>
              Select the memory scheme
            </option>
            <option value="segmentation">Segmentation</option>
            <option value="paging">Paging</option>
          </select>
          <div className="px-4 w-full flex flex-row">
            <div className="flex flex-col justify-center items-center text-sm text-center">
              <p>{memorySchemeBits}</p>
              <span className="">Scheme Bits</span>
            </div>
            <Slider
              defaultValue={[memorySchemeBits]}
              min={3}
              max={14}
              step={1}
              onValueChange={(value) => {
                setMemorySchemeBits(value[0]);
                setOffsetBits(24 - value[0]);
              }}
              onValueCommit={(value) => {
                initMemory(memMapBuild);
              }}
              className="px-2"
            />
            <div className="flex flex-col justify-center items-center text-sm text-center">
              <p>{24 - memorySchemeBits}</p>
              <span className="">Offset Bits</span>
            </div>
          </div>
        </section>
      </section>
      <section
        id="executed-processes"
        className="w-full h-full flex flex-col items-center justify-top p-2 border border-t-white"
      >
        <h2 className="max-w-full w-[90%] font-semibold text-white text-xl mb-2">
          Program List
        </h2>
        <div className="w-full flex justify-center items-center h-full">
          <ProcessList />
        </div>

        <div
          id="clear"
          className="w-full max-w-full flex flex-row justify-center p-4 gap-2 lg:gap-16 flex-wrap text-white"
        >
          <input
            type="button"
            value="Clear"
            onClick={() => {
              clearPrograms();
              initMemory(memMapBuild);
            }}
            className="max-w-22 w-24 border-2 border-white p-2 rounded-md hover:bg-teal-600 hover:scale-105"
          />
        </div>
      </section>
    </div>
  );
}

export default Management;
