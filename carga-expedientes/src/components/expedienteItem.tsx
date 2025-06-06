interface ExpedienteItemProps {
    CI: number;
    nombre: string;
    profesor: string;
    fechaCreacion: string;
    fechaModificacion: string;
    carrera: string;
    deleteFunction?: (CI: number) => void;
    viewFunction?: (expediente: Expediente) => void;
}

function ExpedienteItem({CI, nombre, profesor, fechaModificacion, fechaCreacion, carrera, deleteFunction, viewFunction}: ExpedienteItemProps)
{

    return (
        <tr
                    key={CI}
                    className="h-12 hover:bg-gray-300 transition duration-200 odd:bg-transparent even:bg-gray-200"
                  >
                    <td className="px-4 text-center">{CI}</td>
                    <td className="px-4 text-center">{nombre}</td>
                    <td className="px-4 text-center">
                      Prof. {profesor}
                    </td>
                    <td className="px-4 text-center whitespace-nowrap">
                      <p className="text-sm"><span className="font-bold">Creado:</span> {fechaCreacion}</p>
                      <p className="text-sm"><span className="font-bold">Modificado:</span> {fechaModificacion}</p>
                    </td>
                    <td className="px-4 text-center">{carrera}</td>
                    <td className="px-4 text-center">
                        <div className="flex justify-center items-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 transition duration-200 w-20">
                          Editar
                        </button>
                        <button onClick={() => viewFunction?.({CI, nombre, profesor, fechaCreacion, fechaModificacion, carrera})} className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition duration-200 w-14">
                          Ver
                        </button>
                        <button onClick={() => deleteFunction?.(CI)} className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition duration-200 w-20">
                          Eliminar
                        </button>
                        </div>
                    </td>
                  </tr>
    )
}

export default ExpedienteItem;