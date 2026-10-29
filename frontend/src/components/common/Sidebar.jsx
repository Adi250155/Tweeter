
import { Link } from "react-router-dom";
import {
  FaRegBell,
  FaRegEnvelope,
  FaRegUser,
  FaEllipsisH,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import XSvg from "../svgs/XSvg.jsx";

function Sidebar() {
  return (
    <aside className="flex h-screen w-20 flex-col border-r border-base-content/20 px-2 py-4 lg:w-64 lg:px-4">
      <Link to="/" className="mb-5 w-fit rounded-full p-2 hover:bg-base-content/10">
        <XSvg className="h-8 w-8" />
      </Link>

      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-4 rounded-full p-3 hover:bg-base-content/10"
        >
          <HiHome className="h-7 w-7" />
          <span className="hidden text-xl lg:inline">Home</span>
        </Link>

        <button className="flex items-center gap-4 rounded-full p-3 hover:bg-base-content/10">
          <IoSearchOutline className="h-7 w-7" />
          <span className="hidden text-xl lg:inline">Explore</span>
        </button>

        <button className="flex items-center gap-4 rounded-full p-3 hover:bg-base-content/10">
          <FaRegBell className="h-6 w-6" />
          <span className="hidden text-xl lg:inline">Notifications</span>
        </button>

        <button className="flex items-center gap-4 rounded-full p-3 hover:bg-base-content/10">
          <FaRegEnvelope className="h-6 w-6" />
          <span className="hidden text-xl lg:inline">Messages</span>
        </button>

        <Link
          to="/signup"
          className="flex items-center gap-4 rounded-full p-3 hover:bg-base-content/10"
        >
          <FaRegUser className="h-6 w-6" />
          <span className="hidden text-xl lg:inline">Profile</span>
        </Link>

        <button className="flex items-center gap-4 rounded-full p-3 hover:bg-base-content/10">
          <FaEllipsisH className="h-6 w-6" />
          <span className="hidden text-xl lg:inline">More</span>
        </button>
      </nav>

      <button className="btn btn-primary mt-5 rounded-full lg:w-full">
        <span className="lg:hidden">Post</span>
        <span className="hidden lg:inline">Post</span>
      </button>
    </aside>
  );
}

export default Sidebar;
