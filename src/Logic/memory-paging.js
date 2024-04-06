function initPaging(pagesBits, offsetBits) {
  if (pagesBits + offsetBits != 24) return { success: false, memory: [] };

  let pages = 2 ** pagesBits;
  let offset = 2 ** offsetBits;

  const memory = [];
  let SO = {
    pid: "SO",
    name: "Windows 10",
    size: 1048576,
    frameTable: [],
  };

  //frames table
  for (let i = 0; i < pages; i++) {
    memory.push({
      frameNumber: i,
      pidProgram: undefined,
      size: offset,
      lo: false,
      segmentName: undefined,
      initialPosition: offset * i,
      finalPosition: offset * i + (offset - 1),
      isInternalFragmented: false,
      InternalFramentation: {
        initialPositionIF: undefined,
        processFinalpositionIF: undefined,
      },
    });
  }

  const soPages = Math.ceil(SO.size / offset); // SO process's pages number
  const soFrag = SO.size % offset; //last page's size (bits), if 0 then it has frag

  for (let i = 0; i < soPages; i++) {
    frame = memory[i];
    frame.pidProgram = SO.pid;
    frame.segmentName = SO.name;
    frame.lo = true;
    if (soFrag != 0 && soPages == i + 1) {
      //if thelast page has fragmentation

      frame.isInternalFragmented = true;
      frame.InternalFramentation.initialPositionIF =
        frame.initialPosition + soFrag - 1;
      frame.InternalFramentation.processFinalpositionIF =
        frame.InternalFramentation.initialPositionIF - 1;
    }
    memory[i] = frame;

    SO.frameTable.push({ numPag: i, numMarco: i });
  }
  return { success: true, memory: memory };
}
