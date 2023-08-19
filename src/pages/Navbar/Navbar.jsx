import { Link, NavLink, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import UseSharedContact from "../../hooks/UseSharedContact";

const Navbar = () => {
  const [sharedContact] = UseSharedContact();
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  const navItem = (
    <div className="space-x-5 flex items-center">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "text-blue-600" : "text-neutral"
          } font-[500] text-[17px]`
        }
        to="/"
      >
        Home
      </NavLink>
      {user && (
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-600" : "text-neutral"
            } font-[500] text-[17px]`
          }
          to="/addContact"
        >
          Add Contact
        </NavLink>
      )}
      {user && (
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-600" : "text-neutral"
            } font-[500] text-[17px]`
          }
          to="/allContact"
        >
          All Contact
        </NavLink>
      )}
      {user && (
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-600" : "text-neutral"
            } font-[500] text-[17px] `
          }
          to="/sharedContact"
        >
          Shared Contact{" "}
          <span className="badge badge-secondary">+{sharedContact.length}</span>
        </NavLink>
      )}
      {!user && (
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-600" : "text-neutral"
            } font-[500] text-[17px]`
          }
          to="/login"
        >
          Login
        </NavLink>
      )}
      {!user && (
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-600" : "text-neutral"
            } font-[500] text-[17px]`
          }
          to="/signUp"
        >
          Sign Up
        </NavLink>
      )}
      {user && (
        <button
          onClick={() => {
            logOut();
            navigate("/");
          }}
          className="font-[500] text-[17px] bg-blue-600 px-2 py-1 rounded-sm text-gray-100 hover:bg-blue-700"
        >
          Logout
        </button>
      )}
    </div>
  );
  return (
    <div className="navbar bg-gray-100 shadow-md max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItem}
          </ul>
        </div>
        <Link to="/" className="font-[500] text-[17px]">
          Contact Management
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>
      <div className="navbar-end">
        {user && user?.email && (
          <div className="avatar online">
            <div className="w-12 bg-red-400 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
