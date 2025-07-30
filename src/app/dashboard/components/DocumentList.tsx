type Props = {
  documents: { id: string; title: string; updatedAt: Date }[];
};

export default function DocumentList({ documents }: Props) {
  return (
    <ul className="bg-white rounded-lg shadow divide-y">
      {documents.map((doc) => (
        <li key={doc.id} className="p-4 flex justify-between items-center">
          <span>{doc.title}</span>
          <span className="text-xs text-gray-500">
            Atualizado em {doc.updatedAt.toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
