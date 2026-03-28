import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Emily Gerard's Eclectic Goldfish ~ ITIS 3135</h1>

      <nav aria-label="Primary">
        <ul>
          <li>
            <NavLink to="itis3135/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">ITIS 3135 Page</NavLink>
          </li>
          <li>
            <NavLink to="/introduction">Introduction</NavLink>
          </li>
          <li>
            <NavLink to="/projects/survey">Survey</NavLink>
          </li>
          <li>
            <NavLink to="/projects/cards">Playing Cards</NavLink>
          </li>
          <li>
            <NavLink to="/projects/inventory">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/projects/documentation">Documentation</NavLink>
          </li>
          <li>
            <NavLink to="/projects/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/intro-form">Introduction Form</NavLink>
          </li>
          <li>
            <NavLink to="/contract">Contract</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
