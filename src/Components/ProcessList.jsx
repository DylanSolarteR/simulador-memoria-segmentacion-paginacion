import { Trash, Square, Play } from "lucide-react";
import { useGlobalState } from "../context/GlobalState";
import addProcessPaging from "../Logic/addProcess";
import assignmentSegmentation from "../Logic/Segmentation";

function ProcessList() {
  const {
    programs,
    deleteProgram,
    memory,
    setMemory,
    memoryFree,
    setMemoryFree,
    totalSizeMemoryFree,
    dinamicMemorySize,
    setDinamicMemorySize,
    setTotalSizeMemoryFree,
    offsetBits,
    addProcessAlgorithm,
    addPIDRED,
    addPIDGREEN,
    addADDEDPIDS,
    removePIDRED,
    removePIDGREEN,
    removeADDEDPIDs,
    redsPIDs,
    greensPIDs,
    addedPIDs,
  } = useGlobalState();

  async function addToMemory(pid) {
    let program = programs.find((program) => program.pid == pid);
    if (!memory.length) {
      addPIDRED(pid);
      return;
    }

    if (addProcessAlgorithm == "paging") {
      const { success, memoryResult, pageTable } = addProcessPaging(
        program,
        memory,
        offsetBits,
        totalSizeMemoryFree,
        memoryFree
      );
      if (success) {
        program.pageTable = pageTable;
        let arrayMemory = [...memoryResult];
        let freeMemory = arrayMemory.filter((frame) => frame.lo == false);
        setMemory(arrayMemory);
        setMemoryFree(freeMemory);
        setTotalSizeMemoryFree(
          freeMemory
            .filter((frame) => frame.lo == false)
            .reduce((acc, frame) => {
              return acc + frame.size;
            }, 0)
        );
        addADDEDPIDS(pid);
        removePIDRED(pid);
        addPIDGREEN(pid);
        return;
      } else {
        removePIDGREEN(pid);
        addPIDRED(pid);
        return;
      }
    }
    if (addProcessAlgorithm == "segmentation") {
      const { success, memoryResult } = await assignmentSegmentation(
        {
          size: 16777216,
          partitions: memory,
          freeMemory: dinamicMemorySize,
          freeMemoryPartitions: totalSizeMemoryFree,
          fullMemory: 16777216 - dinamicMemorySize - totalSizeMemoryFree,
        },
        program,
        2 ** offsetBits,
        memoryFree
      );
      if (success) {
        let arrayMemory = [...memoryResult.partitions];
        let freeMemory = arrayMemory.filter((frame) => frame.lo == false);
        setMemory(memoryResult.partitions);
        setMemoryFree(freeMemory);
        setTotalSizeMemoryFree(memoryResult.freeMemoryPartitions);
        setDinamicMemorySize(memoryResult.freeMemory);
        addADDEDPIDS(pid);
        removePIDRED(pid);
        addPIDGREEN(pid);
        return;
      } else {
        removePIDGREEN(pid);
        addPIDRED(pid);
        return;
      }
    }
  }

  function retrieveFromMemory(pid) {
    if (!memory.length) {
      addPIDRED(pid);
      return;
    }

    if (addedPIDs.has(pid)) {
      if (addProcessAlgorithm == "paging") {
        let array = memory.map((frame) => {
          if (frame.pidProgram == pid) {
            frame.pidProgram = undefined;
            frame.lo = false;
            frame.segmentName = undefined;
            frame.isInternalFragmented = false;
            frame.InternalFragmentation = {
              initialPositionIF: undefined,
              processFinalpositionIF: undefined,
              processSize: undefined,
              fragSize: undefined,
            };
          }
          return frame;
        });
        let freeMemory = array.filter((frame) => frame.lo == false);
        setMemory(array);
        setMemoryFree(freeMemory);
        setTotalSizeMemoryFree(
          freeMemory
            .filter((frame) => frame.lo == false)
            .reduce((acc, frame) => {
              return acc + frame.size;
            }, 0)
        );
        removePIDGREEN(pid);
        removeADDEDPIDs(pid);
        removePIDRED(pid);
      }
      if (addProcessAlgorithm == "segmentation") {
        let size = 0;
        let array = memory.map((partition) => {
          if (partition.pid == pid) {
            size += partition.size;
            partition.name = undefined;
            partition.pid = undefined;
            partition.lo = false;
          }
          return partition;
        });
        let freeMemory = array.filter((frame) => frame.lo == false);
        setMemory(array);
        setMemoryFree(freeMemory);

        setTotalSizeMemoryFree(totalSizeMemoryFree + size);
        removePIDGREEN(pid);
        removeADDEDPIDs(pid);
        removePIDRED(pid);
      }
    }
  }

  const listPrograms = programs.map((program, i) => {
    return (
      <tr
        className={` ${
          redsPIDs.has(program.pid) &&
          !addedPIDs.has(program.pid) &&
          " bg-red-500"
        } " "
        ${
          greensPIDs.has(program.pid) &&
          addedPIDs.has(program.pid) &&
          " bg-emerald-700"
        }`}
        key={i}
      >
        <td className="max-w-[15%] w-full border border-white text-center font-normal text-white">
          {program.pid}
        </td>
        <td className="max-w-[30%] w-full border border-white text-center font-normal text-white">
          {program.name}
        </td>
        <td className="max-w-[30%] w-full border border-white text-center font-normal text-white">
          {program.size}
        </td>
        <td className="p-1 border border-white text-center font-normal text-white">
          <button
            onClick={() => addToMemory(program.pid)}
            className="p-1"
            disabled={addedPIDs.has(program.pid)}
          >
            <Play size={14} className="hover:text-teal-600" />
          </button>

          <button
            onClick={() => retrieveFromMemory(program.pid)}
            className="p-1"
          >
            <Square size={14} className="hover:text-teal-600" />
          </button>

          <button
            onClick={() => {
              deleteProgram(program.pid);
              retrieveFromMemory(program.pid);
              removePIDRED(program.pid);
              removePIDGREEN(program.pid);
            }}
            className="p-1"
          >
            <Trash size={14} className="hover:text-teal-600" />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="max-w-[90%] h-5/6 max-h-[90%] w-[90%] rounded outline outline-2 outline-white overflow-auto scroll-smooth snap-y">
      <table className="w-full max-w-full border-collapse ">
        <thead>
          <tr>
            <th className="max-w-[15%] w-[15%] border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">
              P. ID
            </th>
            <th className="max-w-[30%] w-[30%] border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">
              Name
            </th>
            <th className="max-w-[30%] w-[30%] border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">
              Size
            </th>
            <th className="max-w-[25%] w-[25%] border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{listPrograms}</tbody>
      </table>
    </div>
  );
}

export default ProcessList;
