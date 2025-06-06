import { useEffect, useState } from "react";
import { getExpedientesPageCount } from "../ExpedienteManage";
import PagButton from "./PagButton";
import PagButtonActive from "./PagButtonActive";

interface PaginadorProps {
    currentPage?: number;
    pageSize?: number;
    setPage?: (page: number) => void;
    updatePageCount?: boolean;
}

export default function Paginador({currentPage = 1, pageSize = 10, setPage = (page: number) => {}, updatePageCount}: PaginadorProps) {
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);

     async function fetchPageCount() {
            try {
                const pageCount = await getExpedientesPageCount(pageSize); 
                console.log("Total de páginas:", pageCount);
                // que el rango de paginas sea de la pagina actual a la pagina actual + 5
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(pageCount, startPage + 4);
                // Asegurate que siempre haya al menos 5 paginas
                if (endPage - startPage < 4) {
                    const diff = 4 - (endPage - startPage);
                    if (startPage - diff > 0) {
                        startPage -= diff;
                    } else if (endPage + diff <= pageCount) {
                        endPage += diff;
                    } else {
                        startPage = Math.max(1, endPage - 4);
                    }
                }
                setPageNumbers(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
            } catch (error) {
                console.error("Error al obtener el número de páginas:", error);
            }
        }

    useEffect(() => {
        // Aquí puedes manejar la lógica de paginación  
        fetchPageCount();
    }, [ currentPage, pageSize, updatePageCount ]);



    return (
        <div className="flex flex-col bg-blue-700 text-center text-white rounded-lg p-3 mr-3">
                      {/* Paginador */}
                      {
                        pageNumbers.length > 0 ? 
                        pageNumbers.map((pageNumber) => (
                          pageNumber === currentPage ? (
                              <PagButtonActive key={pageNumber}>
                                  {pageNumber}
                              </PagButtonActive>
                          ) : (
                              <PagButton key={pageNumber} onClick={() => setPage(pageNumber)}>
                                  {pageNumber}
                              </PagButton>
                          )
                      )):
                        <PagButtonActive>
                           1
                        </PagButtonActive>
                      }
        </div>
    );
}