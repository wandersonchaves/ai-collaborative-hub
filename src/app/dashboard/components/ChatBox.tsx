export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
};

export default function ChatBox({ messages }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-64 overflow-y-auto space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-lg ${
            msg.role === "user"
              ? "bg-blue-100 text-blue-900 self-end"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <strong>{msg.role === "user" ? "Você:" : "IA:"}</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}
