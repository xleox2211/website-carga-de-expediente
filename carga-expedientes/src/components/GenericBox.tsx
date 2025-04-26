import { ReactNode } from "react";

function GenericBox({
  children,
  styles = "",
}: {
  children: ReactNode;
  styles?: string;
}) {
  return (
    <div
      className={`bg-white p-6 sm:p-8 rounded-xl shadow-2xl  w-full max-w-md mx-4 ${styles}`}
    >
      {children}
    </div>
  );
}
export default GenericBox;
