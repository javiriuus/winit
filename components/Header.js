// components/Header.js
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow">
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={120} height={40} />
      </div>
    </header>
  );
}
