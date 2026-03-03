import {
  ChartBarStacked,
  LayoutDashboard,
  ShoppingCart,
  SquareDashedTopSolid,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = ({ isopen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-60 bg-gray-900 text-white transform transition-transform duration-200 ${
        isopen ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div className="p-4 text-center font-bold text-xl border-b flex justify-between items-center">
        <span>Admin Dashboard</span>
      </div>
      <ul className="space-y-2 p-4">
        <li>
          <NavLink
            to="/admindashboard"
            className="flex items-center p-2 rounded hover:bg-gray-800"
          >
            <LayoutDashboard className=" mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/activelist"
            className="flex items-center  p-2 rounded hover:bg-gray-800"
          >
            <User className=" mr-2" />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category"
            className="flex items-center p-2 rounded hover:bg-gray-800"
          >
            <ChartBarStacked className=" mr-2" />
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/product"
            className="flex items-center p-2 rounded hover:bg-gray-800"
          >
            <ShoppingCart className=" mr-2" />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/order"
            className="flex items-center p-2 rounded hover:bg-gray-800"
          >
            <SquareDashedTopSolid className="mr-2" />
            Order
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
