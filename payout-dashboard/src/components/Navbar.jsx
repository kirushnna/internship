import {
  Bell,
  Menu,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

function Navbar({
  onMenuClick,
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="navbar">

      <button
        className="mobile-menu"
        onClick={onMenuClick}
      >
        <Menu size={21} />
      </button>

      <div className="breadcrumb">
        <span>Operations</span>
        <b>/</b>
        <strong>Regular Payout</strong>
      </div>

      <div className="navbar-actions">

        <button className="nav-icon">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <button
          className="nav-icon"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        <div className="admin-profile">

          <div className="profile-avatar">
            A
          </div>

          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

          <ChevronDown size={15} />

        </div>

      </div>

    </header>
  );
}

export default Navbar;