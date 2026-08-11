import { useEffect, useRef, useState } from "react";
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const toggleNotifications = () => {
    setNotificationsOpen((current) => !current);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((current) => !current);
    setNotificationsOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

        <button
          className="nav-icon"
          onClick={() =>
            setDarkMode(!darkMode)
          }
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        <div ref={notificationsRef} className="notification-wrapper">
          <button
            className="nav-icon"
            onClick={toggleNotifications}
            type="button"
            aria-expanded={notificationsOpen}
            aria-label="Show notifications"
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>

          {notificationsOpen && (
            <div className="notification-panel">
              <div className="panel-header">
                Notifications
              </div>
              <div className="notification-item">
                New payout request submitted.
              </div>
              <div className="notification-item">
                3 payouts are pending review.
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="profile-wrapper">
          <button
            className={`admin-profile ${profileOpen ? "open" : ""}`}
            onClick={toggleProfile}
            type="button"
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <div className="profile-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>

            <ChevronDown size={15} />
          </button>

          {profileOpen && (
            <div className="profile-menu">
              <button type="button">My Profile</button>
              <button type="button">Settings</button>
              <button type="button">Sign Out</button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;