import { Link } from "react-router-dom";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/resume-bank", label: "Resume Bank" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <Link to="/" className="nav-logo text-[0.95rem]">
          WILDGOOSECHASE
        </Link>

        <nav className="flex items-center sm:gap-8">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
