import ChatBox, { type Message } from "./components/ChatBox";
import DocumentList from "./components/DocumentList";
import FileList from "./components/FileList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default async function DashboardPage() {
  // 🔹 Aqui futuramente você buscará dados do Prisma
  // Por enquanto, dados seedados simulados
  const documents = [
    { id: "1", title: "Documento Demo", updatedAt: new Date() },
  ];

  const files = [{ id: "1", name: "exemplo.pdf", type: "pdf", size: 123456 }];

  const messages: Message[] = [
    { id: "1", role: "user", content: "Olá, IA!" },
    {
      id: "2",
      role: "assistant",
      content: "Claro! Estou aqui para te ajudar. 😊",
    },
  ];

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto">
          <section>
            <h2 className="text-xl font-bold mb-2">📄 Documentos</h2>
            <DocumentList documents={documents} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">📂 Arquivos</h2>
            <FileList files={files} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">💬 Chat com IA</h2>
            <ChatBox messages={messages} />
          </section>
        </main>
      </div>
    </div>
  );
}
