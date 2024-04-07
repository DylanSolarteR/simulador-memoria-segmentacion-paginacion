export default function addProcessPaging(
  program,
  memory,
  offsetBits,
  totalSizeMemoryFree,
  memoryFree
) {
  //revisar si el tamaño del programa es meno
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

  if (totalPages > memoryFree.length) {
    return { success: false, memory: memory };
  }

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
      frame.InternalFragmentation.processSize = fragBites;
      frame.InternalFragmentation.fragSize =
        frame.finalPosition - frame.InternalFragmentation.initialPositionIF + 1;
    }
    program.PageTable.push({ numPag: i, numMarco: freeFrameIndex });
    memory[freeFrameIndex] = frame;
    segment.pages--;
    if (segment.pages > 0) arraySegments.unshift(segment);
  }
  return { success: true, memoryResult: memory, pageTable: program.pageTable };
}
