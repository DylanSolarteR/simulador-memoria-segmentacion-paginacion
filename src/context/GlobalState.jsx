import { createContext, useContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";

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
  const [memMapBuild, setMemMapBuild] = useState("Default");
  const [partitionsArray, setPartitionsArray] = useState([]);
  const [fitAlgorithm, setFitAlgorithm] = useState("first");

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

  const changeMemMapBuild = (memType) => {
    if (memType === "Fixed") setMemMapBuild("Fixed");
    if (memType === "Variable") setMemMapBuild("Variable");
    if (memType === "Dinamic") {
      setMemMapBuild("Dinamic");
      setFitAlgorithm("dinamic");
    }
    if (memType === "Default") {
      setMemMapBuild("Default");
      setFitAlgorithm("first");
    }
  };

  return (
    <Context.Provider
      value={{
        programs: state.programs,
        addProgram,
        deleteProgram,
        changeMemMapBuild,
        memMapBuild,
        partitionsArray,
        setPartitionsArray,
        fitAlgorithm,
        setFitAlgorithm,
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
