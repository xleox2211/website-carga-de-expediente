import { ReactNode } from "react";

function Cajalogin({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-1 to-black w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}
export default Cajalogin;
