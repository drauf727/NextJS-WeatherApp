import Image from "next/image";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/sidebar";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 sticky top-0 h-[calc(100vh-64px)] bg-gray-100 p-4">
          <Sidebar />
        </aside>
        <main className="flex-1 p-8">
          {/* Main content will go here */}
        </main>
      </div>
    </div>
  );
}
