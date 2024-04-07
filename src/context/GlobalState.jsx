import { createContext, useContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import initPaging from "../Logic/memory-paging";

const initialState = {
  programs: [],
};

export const Context = createContext();

export const useGlobalState = () => {
  const context = useContext(Context);
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [counter, setCounter] = useState(1);

  const [memoryFree, setMemoryFree] = useState([]);
  const [totalSizeMemoryFree, setTotalSizeMemoryFree] = useState(0);

  const [memMapBuild, setMemMapBuild] = useState("default");
  const [addProcessAlgorithm, setAddProcessAlgorithm] = useState("");
  const [memory, setMemory] = useState([]);
  const [offsetBits, setOffsetBits] = useState(16);
  const [memorySchemeBits, setMemorySchemeBits] = useState(8);
  // const [partitionsArray, setPartitionsArray] = useState([]);

  const [redsPIDs, SetRedsPIDs] = useState(new Set());
  const [greensPIDs, SetGreensPIDs] = useState(new Set());
  const [addedPIDs, SetAddedPIDs] = useState(new Set());

  //Color PIDS Management

  const addPIDRED = (PID) => {
    SetRedsPIDs((redsPIDs) => new Set([...redsPIDs, PID]));
  };

  const addPIDGREEN = (PID) => {
    SetGreensPIDs((greensPIDs) => new Set([...greensPIDs, PID]));
  };

  const addADDEDPIDS = (PID) => {
    SetAddedPIDs((addedPIDs) => new Set([...addedPIDs, PID]));
  };

  const removePIDRED = (PID) => {
    SetRedsPIDs((redsPIDs) => new Set([...redsPIDs].filter((x) => x != PID)));
  };

  const removePIDGREEN = (PID) => {
    SetRedsPIDs(
      (greensPIDs) => new Set([...greensPIDs].filter((x) => x != PID))
    );
  };

  const removeADDEDPIDs = (PID) => {
    SetAddedPIDs(
      (addedPIDs) => new Set([...addedPIDs].filter((x) => x != PID))
    );
  };

  const resetProcessListColor = () => {
    SetRedsPIDs(new Set());
    SetGreensPIDs(new Set());
    SetAddedPIDs(new Set());
  };

  //Program list management

  const addProgram = (program) => {
    const ArrayPIDS = state.programs.map((program) => {
      return program.pid;
    });

    const isDuplicated = ArrayPIDS.some((currentPID) => {
      return currentPID == program.pid;
    });
    if (!isDuplicated) {
      dispatch({
        type: "ADD_PROGRAM",
        payload: program,
      });
      setCounter(counter + 1);
    }
  };

  const deleteProgram = (pid) => {
    dispatch({
      type: "DELETE_PROGRAM",
      payload: pid,
    });
  };

  const clearPrograms = () => {
    dispatch({
      type: "CLEAR",
    });
  };

  const initMemory = (scheme) => {
    if (scheme === "paging") {
      let initialMemory = initPaging(memorySchemeBits, offsetBits).memory;
      let freeMemory = initialMemory.filter((frame) => frame.lo == false);
      setMemory(initialMemory);
      setMemoryFree(freeMemory);
      setTotalSizeMemoryFree(
        freeMemory.reduce((acc, frame) => {
          return acc + frame.size;
        }, 0)
      );
    }
    if (scheme === "segmentation") {
      setMemory([]);
    }
  };

  const changeMemMapBuild = (memScheme) => {
    if (memScheme === "paging") {
      setMemMapBuild("paging");
      setAddProcessAlgorithm("paging");
      initMemory("paging");
    }
    if (memScheme === "segmentation") {
      setMemMapBuild("segmentation");
      setAddProcessAlgorithm("segmentation");
      initMemory("segmentation");
    }
  };

  return (
    <Context.Provider
      value={{
        programs: state.programs,
        addProgram,
        deleteProgram,
        memMapBuild,
        changeMemMapBuild,
        offsetBits,
        setOffsetBits,
        memorySchemeBits,
        setMemorySchemeBits,
        memory,
        setMemory,
        initMemory,
        memoryFree,
        setMemoryFree,
        totalSizeMemoryFree,
        setTotalSizeMemoryFree,
        addProcessAlgorithm,
        setAddProcessAlgorithm,
        addPIDRED,
        addPIDGREEN,
        addADDEDPIDS,
        removePIDRED,
        removePIDGREEN,
        removeADDEDPIDs,
        SetRedsPIDs,
        SetGreensPIDs,
        SetAddedPIDs,
        redsPIDs,
        greensPIDs,
        addedPIDs,
        resetProcessListColor,
        clearPrograms,
        counter,
        setCounter,
      }}
    >
      {children}
    </Context.Provider>
  );
};
