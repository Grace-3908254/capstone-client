import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link className="header__logo-link" to={"/"}>MY FUZZY BUDDIES 🧸</Link>
      </div>

      <section className="header__navbar">
        <Link className="header__navbar-add header__navbar-button" to={"/add"}>Add A New Buddy</Link>
        <Link className="header__navbar-inactive header__navbar-button" to={"/inactive"}>Reminiscence</Link>
      </section>
    </div>
  );
}
