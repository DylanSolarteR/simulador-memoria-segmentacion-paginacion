# simulador-memoria-segmentacion-paginacion

Computer memory simulator using segmentation and paging methods.

Requisitos

• 16MiB
• Segmentacion
o Tabla de segmentos
 Num segmento
 Base
 Limite
o Algoritmo Dinámico
 Con fragmentación externa
 Recordar el condicional de tamaño de memoria máximo vs programa

• Paginacion
o Algoritmo fijas
o Fragmentacion interna
o Bits de paginas(num de pags/marcos) y offset(tamaño de cada pag/marco) a elección, su suma no mayor a 24

• Programas detallados

Programa{
Size: number
Segments:{
text: number,
data: number,
bss: number,
heap: number,
stack: number,
}
name: string
pid: string (id dinámica, no fija)
pageTable: [{numpag, nummarco}]
}

MapaMemoria(paginación fijas)[{
frameNumber: number
pidProgram: string
size: number
lo: bool
segmentName: string
initialPosition: number
final_position: number
isInternalFragmented: Bool
InternalFramentation:{
initialPositionIF: number,
processFinalpositionIF: number,
}}]
