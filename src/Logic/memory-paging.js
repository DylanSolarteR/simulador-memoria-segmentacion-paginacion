//a
export default function initPaging(pagesBits, offsetBits) {
  if (pagesBits + offsetBits != 24) return { success: false, memory: [] };

  let pages = 2 ** pagesBits;
  let offset = 2 ** offsetBits;

  const memory = [];
  let SO = {
    pid: "SO",
    name: "Sistema Operativo",
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
      InternalFragmentation: {
        initialPositionIF: undefined,
        processFinalpositionIF: undefined,
        processSize: undefined,
        fragSize: undefined,
      },
    });
  }

  const soPages = Math.ceil(SO.size / offset); // SO process's pages number
  const soFrag = SO.size % offset; //last page's size (bits), if 0 then it has frag

  for (let i = 0; i < soPages; i++) {
    memory[i].pidProgram = SO.pid;
    memory[i].segmentName = SO.name;
    memory[i].lo = true;
    if (soFrag != 0 && soPages == i + 1) {
      //if thelast page has fragmentation
      memory[i].isInternalFragmented = true;
      memory[i].InternalFragmentation.initialPositionIF =
        memory[i].initialPosition + soFrag - 1;
      memory[i].InternalFragmentation.processFinalpositionIF =
        memory[i].InternalFragmentation.initialPositionIF - 1;
      memory[i].InternalFragmentation.processSize = soFrag;
      memory[i].InternalFragmentation.fragSize =
        memory[i].finalPosition -
        memory[i].InternalFragmentation.initialPositionIF +
        1;
    }
  }
  return { success: true, memory: memory };
}
