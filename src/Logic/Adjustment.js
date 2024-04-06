export function FirstFit(program, partitions) {
  let resultBool = true;
  let numberPartitionsT = partitions.length;
  let prMemorysz = program.size;
  for (var i = 0; i < numberPartitionsT; i++) {
    if (partitions[i].lo == false && partitions[i].size >= prMemorysz) {
      partitions[i].pid = program.PID;
      partitions[i].lo = true;
      break;
    }
    if (i == numberPartitionsT - 1)
      if (i == numberPartitionsT - 1) resultBool = false;
  }

  return { result: resultBool, memory: partitions };
}

export function WorstFit(program, partitions) {
  let resultBool = true;
  let numberPartitionsT = partitions.length;
  let prMemorysz = program.size;
  let rPartitions = partitions.reverse();
  for (var i = 0; i < numberPartitionsT; i++) {
    if (rPartitions[i].lo == false && partitions[i].size >= prMemorysz) {
      rPartitions[i].pid = program.PID;
      rPartitions[i].lo = true;
      break;
    }
    if (i == numberPartitionsT - 1) resultBool = false;
  }
  partitions = rPartitions.reverse();
  return { result: resultBool, memory: partitions };
}

export function BestFit(program, partitions) {
  let resultBool = true;
  let numberPartitionsT = partitions.length;
  let prMemorysz = program.size;
  for (var i = 0; i < numberPartitionsT; i++) {
    if (partitions[i].lo == false && partitions[i].size >= prMemorysz) {
      partitions[i].pid = program.PID;
      partitions[i].lo = true;
      break;
    }
    if (i == numberPartitionsT - 1) resultBool = false;
  }
  var indSO = partitions.findIndex(function (obj) {
    return obj.pid === "SO";
  });

  // Mueve el objeto encontrado al principio del array
  if (indSO !== -1) {
    var objSO = partitions.splice(indSO, 1)[0];
    partitions.unshift(objSO);
  }
  return { result: resultBool, memory: partitions };
}

export function DinamicFit(program, partitions) {
  let tamPartition = program.size;

  let position = partitions[partitions.length - 1].initial_position;
  let positionI = position;
  let positionF = 0;

  if (partitions.length > 2) {
    let dinamicPartition = partitions.pop();

    let { result, memory } = BestFit(program, partitions);
    if (result) {
      memory.push(dinamicPartition);
      return { result: result, memory: memory };
    } else {
      memory.push(dinamicPartition);
    }
  }
  let objPartitions = [];
  positionF = positionI + tamPartition;
  objPartitions = {
    name: "",
    pid: program.PID,
    lo: true,
    initial_position: positionI,
    final_position: positionF,
    size: positionF - positionI + 1,
  };
  positionI = positionF + 1;

  //memory dinamic
  var indMD = partitions.length - 1;
  partitions[indMD].initial_position = positionF + 1;
  partitions[indMD].size -= tamPartition;

  partitions.splice(indMD, 0, objPartitions);

  return { result: true, memory: partitions };
}

export function DinamicCompaction(partitions) {
  let position = 1048577;
  let positionI = position;
  let positionF = 0;
  let tamPartitions = 0;

  let partitionsC = partitions.filter(function (element) {
    for (let i = 0; i < partitions.length; i++) {
      if (element.lo == false && element.final_position !== 16777216) {
        return false;
      }
    }
    return true;
  });

  for (let i = 1; i < partitionsC.length; i++) {
    tamPartitions = partitionsC[i].size;
    positionF = positionI + tamPartitions;
    partitionsC[i].initial_position = positionI;
    if (i == partitionsC.length - 1) {
      partitionsC[i].final_position = 16777216;
      partitionsC[i].size =
        partitionsC[i].final_position - partitionsC[i].initial_position + 1;
    } else {
      partitionsC[i].final_position = positionF;
      positionI = positionF + 1;
    }
  }
  return { result: true, memory: partitionsC };
}
