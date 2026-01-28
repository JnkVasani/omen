import logo from "../assets/omen-logo.png";

export default function TopBar({ runCode, toggleTheme, theme }) {
  return (
    <div className="topbar">
      <div className="brand">
        <img src={logo} alt="omen logo" />
        <span>omen</span>
      </div>

      <div className="actions">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "🌑 Darker" : "🌘 Dark"}
        </button>

        <button className="run-btn" onClick={runCode}>
          ▶ Run
        </button>
      </div>
    </div>
  );
}