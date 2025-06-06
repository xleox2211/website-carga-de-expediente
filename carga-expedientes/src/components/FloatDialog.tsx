import {useEffect, useRef} from "react";

interface FloatDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export default function FloatDialog({ children,isOpen, setOpen }: FloatDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setOpen]);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
    <dialog
      id="modal-agregar-expediente"
      className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        ref={dialogRef}
      open={isOpen}
    >
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </dialog>
  </div>
    )
}