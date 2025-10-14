export function ChatMockup() {
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
      <div className="space-y-4">
        {/* Assistant Message */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bot"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <div className="rounded-lg rounded-tl-none bg-teal-50 p-3">
            <p className="text-sm text-gray-700">
              ¡Hola! ¿Cómo puedo ayudarte a agendar una cita en nuestra clínica dental?
            </p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex items-start justify-end gap-3">
          <div className="rounded-lg rounded-br-none bg-gray-100 p-3">
            <p className="text-sm text-gray-700">
              Quisiera una limpieza para la próxima semana.
            </p>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
          </div>
        </div>

        {/* Assistant Message with Options */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bot"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <div className="rounded-lg rounded-tl-none bg-teal-50 p-3">
            <p className="text-sm text-gray-700">
              ¡Claro! Tengo disponibilidad el martes a las 10 AM o el miércoles a las 2 PM. ¿Cuál prefieres?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}