//Función para asignar particiones a la memoria
export default async function assignmentSegmentation(
  memory,
  program,
  offset,
  memoryFree
) {
  //Ver si hay memoria RAM disponible para almacenar el programa
  if (
    memory.freeMemoryPartitions >= program.size ||
    memory.freeMemory >= program.size
  ) {
    let counter = 0; //Variable contadora para asignar al segment de la NewPartition
    // console.log("Entre al If: Si hay RAM disponible para todo el programa");

    let totalSegmentsPartitions = Math.ceil(program.size / offset);

    //Recorrer todos los atributos del objeto Segments del Program
    for (let segmentName in program.segments) {
      //ME FALTA UN IF DONDE ANALICE SI EL TAMAÑO DEL SEGMENTNAME ALCANZA PARA REALIZARSE EN UNA SOLA PARTITION O SI SE DEBEN CREAR VARIAS

      let segmentPartitions = Math.ceil(program.segments[segmentName] / offset);
      //   console.log(segmentPartitions);
      let segmentSpareSize = program.segments[segmentName] % offset;
      //   console.log(segmentSpareSize);

      //partition.size / offset;
      //   console.log("Entre al atributo de Segments: " + segmentName);

      //Si no hay libres, crear Partition en la FreeMemory
      if (memoryFree.length === 0) {
        for (let i = 0; i < segmentPartitions; i++) {
          //   console.log("Analizando la Memory sin particionar");
          let sizePartition =
            segmentSpareSize && i === segmentPartitions - 1
              ? segmentSpareSize
              : offset;
          //   console.log(sizePartition);
          let newPartition = {
            name: `${program.pid + " (" + segmentName + ")"}`,
            pid: `${program.pid}`,
            segment: counter,
            lo: true,
            initial_position: memory.fullMemory, //Final Position Anterior + 1
            final_position: memory.fullMemory + offset, //Sumar Initial Position + Size
            size: sizePartition,
          };

          memory.partitions.push(newPartition);
          //   newPartitions.push(newPartition);
          memory.fullMemory += sizePartition;
          memory.freeMemory =
            memory.size - memory.fullMemory - memory.freeMemoryPartitions;
          counter += 1;
        }
      } else {
        //Si hay particiones libres suficientes para las particiones
        if (
          !(
            memoryFree.length >= totalSegmentsPartitions &&
            program.size <= memory.freeMemoryPartitions
          )
        ) {
          return { success: false, memory: memory };
        }
        let i = 0;
        let freeMemoryCounter = 0;

        while (i < segmentPartitions) {
          let sizePartition =
            segmentSpareSize && i === segmentPartitions - 1
              ? segmentSpareSize
              : offset;
          if (sizePartition <= memoryFree[freeMemoryCounter].size) {
            // console.log(memoryFree[freeMemoryCounter].initial_position);
            let newPartition = {
              name: `${program.pid + " (" + segmentName + ")"}`,
              pid: `${program.pid}`,
              segment: counter,
              lo: true,
              initial_position: memoryFree[freeMemoryCounter].initial_position, //Final Position Anterior + 1
              final_position:
                memoryFree[freeMemoryCounter].initial_position +
                sizePartition -
                1, //Sumar Initial Position + Size-1
              size: sizePartition,
            };
            memory.partitions.push(newPartition);
            memory.fullMemory += sizePartition;
            memory.freeMemory =
              memory.size - memory.fullMemory - memory.freeMemoryPartitions;
            counter += 1;
            memoryFree[freeMemoryCounter].initial_position += sizePartition;
            memoryFree[freeMemoryCounter].size -= sizePartition;
            i++;
            if (memoryFree[freeMemoryCounter].size == 0) {
              freeMemoryCounter++;
            }
          } else {
            freeMemoryCounter++;
            if (freeMemoryCounter === memoryFree.length) {
              i = segmentPartitions;
            }
          }
        }
      }
    }
  } else {
    return { success: false, memory: memory };
  }

  //Eliminar particiones con size == 0 de memory.partitions
  memory.partitions = memory.partitions.filter(
    (partition) => partition.size !== 0
  );

  //Calcular los valores de FreeMemory, FreeMemoryPartitions y FullMemory de la Memory
  memoryPartitionFreeFull(memory);

  //ordenar por initial_position al array partitions de memory y mostrarlo
  memory.partitions.sort((a, b) => a.initial_position - b.initial_position);
  //   console.log(memory.partitions);
  return { success: true, memoryResult: memory };
}

//Función para saber cuánto espacio hay disponible en las Partitions con lo = false (Libres)
function memoryPartitionFreeFull(memory) {
  let loMemoryPartitionTrue = 0; //Variable para sumar la memoria ocupada de las Partitions
  let loMemoryPartitionFalse = 0; //Variable para sumar la memoria disponible de las Partitions

  //Recorrer Array de Partitions para sumar el espacio libre u ocupado de cada una
  memory.partitions.forEach((partition) => {
    if (partition.lo === true) {
      loMemoryPartitionTrue += partition.size;
    } else if (partition.lo === false) {
      loMemoryPartitionFalse += partition.size;
    }
  });

  memory.freeMemory =
    memory.size - loMemoryPartitionTrue - loMemoryPartitionFalse; //Valor de FreeMemory de la Memory
  memory.freeMemoryPartitions = loMemoryPartitionFalse; //Valor de FreeMemoryPartitions de la Memory
  memory.fullMemory = loMemoryPartitionTrue; //Valor de FullMemory de la Memory
}
