import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Nav() {
  const { user, signout } = useUser();
  const navigate = useNavigate();

  const handleSignout = () => {
    signout();
    navigate("/");
  };

  // Let's get the first letter of the username for avatar
  const initial = user?.username.charAt(0).toUpperCase() || "?";
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-teal-900 hover:text-teal-700 transition-colors"
        >
          <span className="w-8 h-8 text-white rounded-md flex items-center justify-center text-base">
            🌍
          </span>
          World Explorer
        </Link>

        {/* User are on the right (only when signed in) */}
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 hidden sm:inline">
              Hello, <strong className="text-gray-900">{user.username}</strong>
            </span>
            <span className="w-9 h-9 bg-teal-800 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {initial}
            </span>
            <button
              onClick={handleSignout}
              className="text-xs text-gray-500 hover:text-gray-900 pl-3 border-l border-gray-200 transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
