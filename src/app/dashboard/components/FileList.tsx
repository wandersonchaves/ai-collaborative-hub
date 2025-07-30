type Props = {
  files: { id: string; name: string; type: string; size: number }[];
};

export default function FileList({ files }: Props) {
  return (
    <ul className="bg-white rounded-lg shadow divide-y">
      {files.map((file) => (
        <li key={file.id} className="p-4 flex justify-between items-center">
          <span>
            {file.name} ({file.type})
          </span>
          <span className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </li>
      ))}
    </ul>
  );
}
