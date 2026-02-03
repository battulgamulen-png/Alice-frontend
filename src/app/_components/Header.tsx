import Alice from "./Alice";
import { DropDown } from "../(home)/_components/DropDown";

export default function Header() {
  return (
    <div className="w-full bg-black text-white flex items-center justify-between px-6 h-16 shadow-md">
      <div>
        <Alice />
      </div>
      <DropDown />
    </div>
  );
}
