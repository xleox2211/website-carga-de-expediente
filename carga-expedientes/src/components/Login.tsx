import BlueButton from "./BlueButton";
import GenericBox from "./GenericBox";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 w-full max-w-xl">
      <GenericBox styles="w-full max-w">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>

        <form className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            />
          </div>

          <BlueButton onClick={() => { console.log("Login clicked"); }}>
            Ingresar
          </BlueButton>
        </form>
      </GenericBox>
    </div>
  );
}

export default Login;
