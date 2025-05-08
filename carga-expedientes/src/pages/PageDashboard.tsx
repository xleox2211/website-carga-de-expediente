import Header from "../components/Header";
import Footer from "../components/Footer";
import BG from "../components/Bg";
import BlueButton from "../components/BlueButton";

function DashboardPage() {
    return (
        <BG>
            <Header />
            <main className="flex flex-col mx-auto px-4 align-middle w-[65%] min-h-[calc(100vh-70px*2)] ">
                <div className="h-full w-full m-5 bg-white p-5 rounded-lg shadow-md flex flex-col gap-4">
                    <div className="overflow-auto"> {/* Contenedor para el scroll */}
                        <table className="w-full min-w-[800px]"> {/* Ancho mínimo para evitar compresión */}
                            <thead className="bg-gray-200 sticky top-0 z-10">
                                <tr className="h-12">
                                    <th className="px-4 text-center">ID</th>
                                    <th className="px-4 text-center">Alumno</th>
                                    <th className="px-4 text-center">Docente</th>
                                    <th className="px-4 text-center">Creado / Modificado</th>
                                    <th className="px-4 text-center">Carrera</th>
                                    <th className="px-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 17 }, (_, index) => (
                                    <tr key={index} className="h-12 hover:bg-gray-300 transition duration-200 odd:bg-transparent even:bg-gray-200">
                                        <td className="px-4 text-center">{index}</td>
                                        <td className="px-4 text-center">Juan Perez {index}</td>
                                        <td className="px-4 text-center">Prof. Roberto Acosta {index}</td>
                                        <td className="px-4 text-center whitespace-nowrap">Creado: 2023-10-01 Modificado: 12:00:00</td>
                                        <td className="px-4 text-center">Ingeniería de Sistemas</td>
                                        <td className="px-4 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <BlueButton onClick={() => alert("Editar")}>
                                                    Editar
                                                </BlueButton>
                                                <BlueButton onClick={() => alert("Eliminar")}>
                                                    Eliminar
                                                </BlueButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="sticky bottom-0 bg-white pt-4"> {/* Pie fuera de la tabla */}
                        <div className="flex justify-center">
                            <BlueButton onClick={() => alert("Agregar Usuario")}>
                                Agregar Expediente
                            </BlueButton>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </BG>
    )
}

export default DashboardPage;