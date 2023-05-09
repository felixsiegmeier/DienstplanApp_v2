export default function MainPage() {
  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-4">
            Willkommen zur Dienstplanerstellung
          </h1>
          <p className="text-lg mb-6">
            Auf dieser Seite können Sie Ihre Dienstpläne verwalten und neue
            erstellen. Wählen Sie einen der folgenden Links, um fortzufahren:
          </p>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="#"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 11H3a1 1 0 0 1 0-2h14.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ärzteverwaltung</span>
            </a>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 11H3a1 1 0 0 1 0-2h14.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Dienstpläne</span>
            </a>
            <a
              href="#"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 11H3a1 1 0 0 1 0-2h14.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Neuer Dienstplan</span>
            </a>
            <a
              href="#"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 11H3a1 1 0 0 1 0-2h14.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Einstellungen</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
