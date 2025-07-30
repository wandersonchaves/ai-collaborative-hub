export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">🚀 Poppy Clone</h1>
      <nav className="space-y-4">
        <a href="#docs" className="block text-gray-700 hover:text-blue-600">
          Documentos
        </a>
        <a href="#files" className="block text-gray-700 hover:text-blue-600">
          Uploads
        </a>
        <a href="#chat" className="block text-gray-700 hover:text-blue-600">
          Chat com IA
        </a>
      </nav>
    </aside>
  );
}
