defaultPrograms = [
  {
    segments: {
      text: 79524,
      data: 12352,
      bss: 1165,
      heap: 131072,
      stack: 65536,
    },
    size: 229649,
    Name: "Notepad",
    pid: 1,
    PageTable: [],
  },
  {
    segments: {
      text: 77539,
      data: 32680,
      bss: 4100,
      heap: 131072,
      stack: 65536,
    },
    size: 310927,
    Name: "Word",
    pid: 2,
    PageTable: [],
  },
  {
    segments: {
      text: 349000,
      data: 2150000,
      bss: 1000,
      heap: 131072,
      stack: 65536,
    },
    size: 2696608,
    Name: "League of Legends",
    pid: 3,
    PageTable: [],
  },
];

// console.log(defaultPrograms[0]);
function addProcessPaging(program, memory, offsetBits) {
  let memoryFree = memory.filter((frame) => frame.lo == false);
  //revisar si el tamaño del programa es menor a la suma de los tamaños de los elementos de memoryFree

  let totalSizeMemoryFree = memoryFree.reduce((acc, frame) => {
    return acc + frame.size;
  }, 0);

  if (program.size > totalSizeMemoryFree) {
    return { success: false, memory: memory };
  }

  let offset = 2 ** offsetBits;

  //paginas de cada segmento
  let textPages = Math.ceil(program.segments.text / offset);
  let dataPages = Math.ceil(program.segments.data / offset);
  let bssPages = Math.ceil(program.segments.bss / offset);
  let heapPages = Math.ceil(program.segments.heap / offset);
  let stackPages = Math.ceil(program.segments.stack / offset);

  //array de segmentos
  let arraySegments = [
    { segmentName: "text", size: program.segments.text, pages: textPages },
    { segmentName: "data", size: program.segments.data, pages: dataPages },
    { segmentName: "bss", size: program.segments.bss, pages: bssPages },
    { segmentName: "heap", size: program.segments.heap, pages: heapPages },
    { segmentName: "stack", size: program.segments.stack, pages: stackPages },
  ];

  let pages = [textPages, dataPages, bssPages, heapPages, stackPages];

  //un array donde cada item es la suma de los anteriores items de pages
  let segmentsLastPage = [
    textPages,
    textPages + dataPages,
    textPages + dataPages + bssPages,
    textPages + dataPages + bssPages + heapPages,
    textPages + dataPages + bssPages + heapPages + stackPages,
  ];

  let totalPages = pages.reduce((acc, page) => {
    return acc + page;
  }, 0);

  for (let i = 0; i < totalPages; i++) {
    let segment = arraySegments.shift();
    let freeFrameIndex = memoryFree[i].frameNumber;
    let frame = memory[freeFrameIndex];
    frame.pidProgram = program.pid;
    frame.segmentName = segment.segmentName;
    frame.lo = true;

    let fragBites = segment.size % offset;
    //revisar si fragBites es diferente de 0 y si el frame actual es la ultima pagina de algun segmento
    if (fragBites != 0 && segmentsLastPage.includes(i + 1)) {
      frame.isInternalFragmented = true;
      frame.InternalFragmentation.initialPositionIF =
        frame.initialPosition + fragBites - 1;
      frame.InternalFragmentation.processFinalpositionIF =
        frame.InternalFragmentation.initialPositionIF - 1;
    }
    program.PageTable.push({ numPag: i, numMarco: freeFrameIndex });
    memory[freeFrameIndex] = frame;
    segment.pages--;
    if (segment.pages > 0) arraySegments.unshift(segment);
  }
  return { success: false, memory: memory, program: program };
}

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
      InternalFragmentation: {
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
      //if the last page has fragmentation

      frame.isInternalFragmented = true;
      frame.InternalFragmentation.initialPositionIF =
        frame.initialPosition + soFrag - 1;
      frame.InternalFragmentation.processFinalpositionIF =
        frame.InternalFragmentation.initialPositionIF - 1;
    }
    memory[i] = frame;

    SO.frameTable.push({ numPag: i, numMarco: i });
  }

  return { success: true, memory: memory };
}

// let memory = initPaging(8, 16).memory;
// let memoryAddProgram0 = addProcessPaging(defaultPrograms[0], memory, 16).memory;
// let memoryAddProgram1 = addProcessPaging(
//   defaultPrograms[1],
//   memoryAddProgram0,
//   16
// ).memory;
// let memoryAddProgram2 = addProcessPaging(
//   defaultPrograms[2],
//   memoryAddProgram1,
//   16
// ).memory;
// console.log(memory);
