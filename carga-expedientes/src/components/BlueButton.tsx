function BlueButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children: React.ReactNode;
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }
) {
  return (
    <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold shadow-md transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
            onClick={props.onClick}
          >
        {props.children}
          </button>
  );
}

export default BlueButton;