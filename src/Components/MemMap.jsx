import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";

function MemMap() {
  const { memMapBuild, partitionsArray } = useGlobalState();

  const [sizeOcuppied, setSizeOcuppied] = useState(0);
  const [sizeFree, setSizeFree] = useState(0);
  const [totalMemMapSize, setTotalMemMapSize] = useState(0);

  useEffect(() => {
    if (partitionsArray) {
      const occupied = partitionsArray.reduce((acc, obj) => {
        return acc + (obj.lo ? obj.size : 0);
      }, 0);

      const free = partitionsArray.reduce((acc, obj) => {
        return acc + (obj.lo ? 0 : obj.size);
      }, 0);

      const totalSize = partitionsArray.reduce((acc, obj) => {
        return acc + obj.size;
      }, 0);

      setSizeOcuppied(occupied);
      setSizeFree(free);
      setTotalMemMapSize(totalSize);
    }
  }, [partitionsArray]);

  const DIVSIZE = {
    SUPERSMALL: "max-h-8",
    SMALL: "max-h-20",
    NORMAL: "max-h-32",
    BIG: "max-h-44",
    GIANT: "max-h-56",
  };

  function numHex(s) {
    let a = s.toString(16);
    if (a.length % 2 > 0) {
      a = "0" + a;
    }
    return a;
  }

  const memoryCanvas = () => {
    return (
      <>
        <div
          id="Memory"
          className="mt-4 w-full max-w-[90%] h-[40rem] max-h-[40rem] max-h- flex flex-col items-center justify-center outline outline-white py-4 overflow-auto"
        >
          {partitionsTable}
          {totalMemMapSize != 16777216 &&
            totalMemMapSize != 0 &&
            memMapBuild != "Dinamic" && (
              <div
                className={`max-h-8 flex flex-row w-full w-max-full h-full justify-center items-center text-white`}
              >
                <div className="w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center">
                  <div className="text-xs pr-1 ">16384 KiB</div>
                </div>
                <div className="w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center">
                  <div className="text-xs pr-1 ">16777216 B</div>
                </div>
                <div className="w-full max-w-[50%] h-full border border-white flex flex-row justify-center items-center text-center bg-teal-600">
                  None
                </div>
              </div>
            )}
        </div>
        <div
          id="MemoryState"
          className="mb-4 flex flex-row w-full max-w-[90%] justify-start items-center outline outline-white text-white"
        >
          <div className="flex flex-row h-full justify-center items-center border-r border-white">
            <p className="text-center p-2">Estado de la memoria</p>
          </div>
          <div className="flex flex-col h-full justify-start items-start grow">
            <div className="flex flex-row border-b border-white w-full">
              <span className="p-2 w-24">Ocuppied:</span>
              <p className="p-2">
                {sizeOcuppied || ""} Bytes || {sizeOcuppied / 1024} kiB
              </p>
            </div>
            <div className="flex flex-row ">
              <span className="p-2 w-24">Free:</span>
              <p className="p-2">
                {sizeFree || ""} Bytes || {sizeFree / 1024} kiB
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const partitionsTable = partitionsArray?.map((partition, i) => {
    return (
      <div
        key={i}
        className={`${divSize(
          partition.size
        )} flex flex-row w-full w-max-full h-full justify-center items-center text-white`}
      >
        <div className="w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center">
          {parseInt(partition.initial_position) == 0 && (
            <div className="text-xs pr-1">
              {" "}
              {Math.floor(parseInt(partition.initial_position) / 1024)}
              {" KiB "}
            </div>
          )}

          <div className="text-xs pr-1 ">
            {Math.floor(parseInt(partition.final_position) / 1024)}
            {" KiB "}
          </div>
        </div>
        <div className="w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center">
          {parseInt(partition.initial_position) == 0 && (
            <div className="text-xs pr-1"> {partition.initial_position} B </div>
          )}

          <div className="text-xs pr-1 ">{partition.final_position} B </div>
        </div>
        <div className="w-full max-w-[50%] h-full border border-white flex flex-row justify-center items-center text-center">
          {partition.pid || ""}{" "}
        </div>
      </div>
    );
  });

  function divSize(size) {
    if (size <= 3145728) return DIVSIZE.SUPERSMALL;
    if (size > 3145728 && size <= 3145728 * 2) return DIVSIZE.SMALL;
    if (size > 3145728 * 2 && size <= 3145728 * 3) return DIVSIZE.NORMAL;
    if (size > 3145728 * 3 && size <= 3145728 * 4) return DIVSIZE.BIG;
    if (size > 3145728 * 4 && size <= 3145728 * 5) return DIVSIZE.GIANT;
  }

  const renderComponent = () => {
    switch (memMapBuild) {
      case "Fixed":
        return (
          <div className="max-w-full w-full flex flex-col h-full max-h-full items-center justify-between">
            {memoryCanvas()}
          </div>
        );
      case "Variable":
        return (
          <div className="max-w-full w-full flex flex-col h-full max-h-full items-center justify-between">
            {memoryCanvas()}
          </div>
        );
      case "Dinamic":
        return (
          <div className="max-w-full w-full flex flex-col h-full max-h-full items-center justify-between">
            {memoryCanvas()}
          </div>
        );

      case "Default":
        return (
          <div className="flex flex-col items-center gap-2 w-full text-center text-white justify-center">
            <p className="font-medium text-3xl">
              Choose a Memory type and save the parameters
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="h-full w-2/4 flex flex-col items-center justify-center outline outline-2 outline-white border-l-2 border-white overflow-auto"
      id="mem-map"
    >
      {renderComponent()}
    </div>
  );
}

export default MemMap;
