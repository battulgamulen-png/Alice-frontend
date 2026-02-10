import { Bell } from "lucide-react"; // icon library, эсвэл өөр icon ашиглаж болно

export default function HeaderUser() {
  return (
    <header className="w-full bg-black text-white flex items-center justify-between px-6 py-4 shadow-lg sticky top-0 z-50">
      {/* Logo / Title */}
      <div className="flex items-center space-x-3">
        <div>
          <h1 className="text-2xl font-bold">Alice Bank</h1>
          <p className="text-gray-400 text-sm">
            Your digital banking dashboard
          </p>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative p-2 rounded-lg hover:bg-gray-800 transition">
          <Bell className="w-6 h-6 text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-1 ring-black"></span>
        </button>
      </div>
    </header>
  );
}
