import { ReactNode, useEffect } from "react";

function GenericBox({
  children,
  styles = "",
  padding = 24
}: {
  children: ReactNode;
  styles?: string;
  padding?: number;
}) {

  const paddinProportion = padding / 3/4
  
  useEffect(
    () => {
      const root = document.documentElement;
      root.style.setProperty("--padding", `${window.matchMedia("(min-width:640px)").matches ? padding : padding / 3/4}px`);
    },
    [paddinProportion]
  )

  return (
    <div
      className={`bg-white rounded-md shadow-2xl mx-4 ${styles}`}
      style={
        {
          padding: `${padding}px`,

        }
      }
    >
      {children}
    </div>
  );
}
export default GenericBox;
