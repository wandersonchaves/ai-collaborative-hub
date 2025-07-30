import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center gap-3">
        <Image
          src="https://i.pravatar.cc/40?img=1"
          alt="User Avatar"
          className="rounded-full"
          width={40}
          height={40}
        />
        <span className="text-sm">Admin User</span>
        <button className="text-red-500 text-sm">Sair</button>
      </div>
    </header>
  );
}
