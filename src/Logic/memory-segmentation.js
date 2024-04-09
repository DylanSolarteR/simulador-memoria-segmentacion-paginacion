export default function initSegmentation(segmentBits, offsetBits) {
  if (segmentBits + offsetBits != 24) return { success: false, memory: [] };

  const memory = {
    size: 16777216,
    partitions: [
      {
        name: "Sistema Operativo",
        pid: "SO",
        lo: true,
        initial_position: 0,
        final_position: 1048575,
        size: 1048576,
      },
    ],
    freeMemory: 15728640, //Restar Size - FullMemory y luego Restar el resultado - FreeMemoryPartitions para obtener el espacio totalmente libre (sin particiones)
    freeMemoryPartitions: 0, //Sumar todos los Size de cada Partition con lo = False
    fullMemory: 1048576, //Sumar todos los Size de cada Partition con lo = True
  };

  return { success: true, memory: memory };
}
