import ExpedienteItem from "./expedienteItem"

interface ExpedienteTableProps {
    expedientes: Expediente[];
    onDelete: (CI: number) => void;
    onView?: (expediente: Expediente) => void;
}

export default function ExpedienteTable({ expedientes, onDelete, onView }: ExpedienteTableProps) {
    return (
         <table className="w-full min-w-[800px]">
              {" "}
              {/* Ancho mínimo para evitar compresión */}
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr className="h-12 select-none">
                  <th className="px-4 text-center">Cedula</th>
                  <th className="px-4 text-center">Alumno</th>
                  <th className="px-4 text-center">Tutor Académico</th>
                  <th className="px-4 text-center">Creado / Modificado</th>
                  <th className="px-4 text-center">Carrera</th>
                  <th className="px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                
                {
                    expedientes.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center text-gray-500 select-none">No hay expedientes disponibles</td>
                        </tr>
                    ) :
                  expedientes.map((expediente, index) => (
                    <ExpedienteItem
                      deleteFunction={onDelete}
                      viewFunction={onView}
                      key={index}
                      {...expediente}
                    />
                  ))
                }
              </tbody>
            </table>
    )
}