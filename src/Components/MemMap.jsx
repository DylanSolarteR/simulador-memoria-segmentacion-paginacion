import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";

function MemMap() {
  const { memMapBuild, memory, offsetBits, dinamicMemorySize } =
    useGlobalState();

  // const [sizeOcuppied, setSizeOcuppied] = useState(0);
  // const [sizeFree, setSizeFree] = useState(0);
  // const [totalMemMapSize, setTotalMemMapSize] = useState(0);

  // useEffect(() => {
  //   if (memory) {
  //     const occupied = memory.reduce((acc, obj) => {
  //       return acc + (obj.lo ? obj.size : 0);
  //     }, 0);

  //     const free = memory.reduce((acc, obj) => {
  //       return acc + (obj.lo ? 0 : obj.size);
  //     }, 0);

  //     const totalSize = memory.reduce((acc, obj) => {
  //       return acc + obj.size;
  //     }, 0);

  //     setSizeOcuppied(occupied);
  //     setSizeFree(free);
  //     setTotalMemMapSize(totalSize);
  //   }
  // }, [memory]);

  let offset = 2 ** offsetBits;
  const memoryCanvas = (type) => {
    return (
      <>
        <div
          id="Memory"
          className="w-full max-w-full h-full flex flex-col items-center justify-start outline outline-white py-4 overflow-auto"
        >
          {type == "paging" ? partitionsTable : partitionsTableSegmentation}
        </div>
        <div
          id="MemoryState"
          className="flex flex-row w-full max-w-full justify-start items-center outline outline-white text-white"
        >
          {/* <div className="flex flex-row h-full justify-center items-center border-r border-white">
            <p className="text-center p-2">Memory State</p>
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
          </div> */}
        </div>
      </>
    );
  };

  const partitionsTableSegmentation = memory.map((partition, i) => {
    return (
      <div
        key={i}
        className={`flex flex-col w-full w-max-full h-full justify-center gap-0 items-center text-white`}
      >
        <div
          className={`flex flex-row w-full w-max-full h-full py-0 my-0 justify-center items-center text-white`}
        >
          <div
            className={` ${
              i == 0 ? "justify-between" : "justify-end"
            } w-full max-w-[10%] h-full flex flex-col  items-end text-center`}
          >
            {i == 0 && (
              <div className="text-xs pr-1">
                {" "}
                {0}
                {" KiB "}
              </div>
            )}

            <div className="text-xs pr-1 ">
              {Math.round(partition.final_position * 100) / 100}
              {" KiB "}
            </div>
          </div>
          <div
            className={` ${
              i == 0 ? "justify-between" : "justify-end"
            } w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center`}
          >
            {i == 0 && <div className="text-xs pr-1"> {0} B </div>}

            <div className="text-xs pr-1 ">{partition.final_position} B </div>
          </div>
          <div
            className={`w-full max-w-[50%] h-full border-2 border-white flex flex-col justify-center items-center text-center`}
          >
            <div
              className={`w-full h-full border border-white text-center flex flex-row justify-center items-center "max-h-[70%]"
            `}
            >
              {partition.name ? partition.name : ""}
            </div>
          </div>
        </div>

        <div
          className={`${
            i != memory.length - 1 && "hidden"
          } flex flex-row w-full w-max-full h-full justify-center items-center text-white`}
        >
          <div
            className={`justify-end ${
              !dinamicMemorySize && "hidden"
            } w-full max-w-[10%] h-full flex flex-col  items-end text-center`}
          >
            <div className={`${!dinamicMemorySize && "hidden"} text-xs pr-1 `}>
              {16384}
              {" KiB "}
            </div>
          </div>
          <div
            className={`justify-end ${
              !dinamicMemorySize && "hidden"
            } w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center`}
          >
            <div className={`${!dinamicMemorySize && "hidden"} text-xs pr-1 `}>
              {16777215} B{" "}
            </div>
          </div>
          <div
            className={`${
              i != memory.length - 1 && "hidden"
            } w-full max-w-[50%] h-full border-2 border-white flex flex-col justify-center items-center text-center`}
          >
            <div
              className={`w-full h-full border border-white text-center flex flex-row justify-center items-center "max-h-[70%]"
            `}
            >
              {""}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const partitionsTable = memory.map((partition, i) => {
    return (
      <div
        key={i}
        className={`flex flex-row w-full w-max-full h-full justify-center items-center text-white`}
      >
        <div
          className={` ${
            i == 0 ? "justify-between" : "justify-end"
          } w-full max-w-[10%] h-full flex flex-col  items-end text-center`}
        >
          {i == 0 && (
            <div className="text-xs pr-1">
              {" "}
              {0}
              {" KiB "}
            </div>
          )}

          <div className="text-xs pr-1 ">
            {Math.round((offset * (i + 1) - 1 / 1024) * 100) / 100}
            {" KiB "}
          </div>
        </div>
        <div
          className={` ${
            i == 0 ? "justify-between" : "justify-end"
          } w-full max-w-[10%] h-full flex flex-col justify-end items-end text-center`}
        >
          {i == 0 && <div className="text-xs pr-1"> {0} B </div>}

          <div className="text-xs pr-1 ">{offset * (i + 1) - 1} B </div>
        </div>

        <div className="w-full max-w-[50%] h-full border-2 border-white flex flex-col justify-center items-center text-center">
          <div
            className={`w-full h-full border border-white text-center flex flex-row justify-center items-center ${
              !partition.isInternalFragmented ? "max-h-full" : "max-h-[70%]"
            }`}
          >
            {partition.pidProgram
              ? partition.pidProgram + " '" + partition.segmentName + "'"
              : ""}
          </div>
          <div
            className={`w-full h-full border border-white text-center flex flex-row justify-center items-center text-teal-600 ${
              !partition.isInternalFragmented && "hidden"
            } `}
          >
            Internal Fragmentation, Fragmentation size:{" "}
            {partition.InternalFragmentation?.fragSize}{" "}
          </div>
        </div>
        <div className="w-12 h-full border-2 border-white flex flex-col justify-center items-center text-center">
          {i}
        </div>
      </div>
    );
  });

  const renderComponent = () => {
    switch (memMapBuild) {
      case "paging":
        return (
          <div className="max-w-full w-full flex flex-col h-full max-h-full items-center justify-between">
            {memoryCanvas("paging")}
          </div>
        );
      case "segmentation":
        return (
          <div className="max-w-full w-full flex flex-col h-full max-h-full items-center justify-between">
            {memoryCanvas("segmentation")}
          </div>
        );

      case "default":
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
