import { Link, useNavigate } from "react-router-dom";
import Button from "./common/Button";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/Authcontext";
import { ThemeContext } from "../context/ThemeProvider";
import { useSelector } from "react-redux";
import "../App.css";
import { AddTodo } from "../redux/counter/CounterSlice";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const { theme, togglTheme } = useContext(ThemeContext);
  const { setuser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    setuser({ isLogin: false });
    localStorage.removeItem("id");
    navigate("/login");
  };
  const data = useSelector((state) => state.items.card) || [];
  
  const quantity = data.reduce((accu, item) => accu + item.quantity, 0);
  // const isLogin = localStorage.getItem("id");

  // const [input, setInput] = useState({
  //   text: "",
  // });
  // const dispatch = useDispatch();
  // const AddTodoHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(AddTodo(input));
  // };
  // const data = useSelector((state) => state.todos.todos);
  // console.log(data);
  // console.log(input);
  // const onChangehandler = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };

  return (
    <div className="main">
      {/*<form onSubmit={AddTodoHandler}>
        <input
      //     type=""
      //     placeholder="text"
      //     name="text"
      //     onChange={onChangehandler}
      //   />
      //   <button type="submit">AddTodo</button>
      // </form>

      // <div>Todos</div>
      // {Array.isArray(data) &&
      //   data.map((todo) => (
      //     <div key={todo.id}>
      //       <li>{todo.text}</li>
      //     </div>
      //   ))}
      */}

      <nav className="navbar">
        <Link to="/" className="left">
          MyApp
        </Link>
        <div className="hamburger" onClick={() => setHamburger(!hamburger)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`right ${hamburger ? "open" : ""} `}>
          {/* <>
              <Link to="/profile" className="">
                👤
              </Link>
              <Button title="Signout" onClick={logout} className="" />
            </>
         */}
          <Link className="cart" to="/shopingcard">
            {" "}
            <FaCartShopping color="gold" className="cart-iner" />
            {quantity > 0 && <span className="cart-badge">{quantity}</span>}
          </Link>

          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/signup" className="signup">
            Signup
          </Link>

          <button onClick={togglTheme} className="logo-b">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
