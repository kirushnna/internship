import {
  LayoutDashboard,
  Users,
  Wallet,
  CircleDollarSign,
  Clock3,
  FileText,
  Activity,
  ShieldCheck,
  Bell,
  Settings,
  X,
} from "lucide-react";

function Sidebar({ open, onClose, activeSection, onSectionChange }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-logo">P</div>

        <div>
          <h2>PulsePay</h2>
          <span>Admin Console</span>
        </div>

        <button className="close-sidebar" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="workspace">
        <div className="workspace-avatar">A</div>

        <div>
          <strong>Admin Workspace</strong>
          <small>Operations</small>
        </div>
      </div>

      <nav>
        <div className="nav-title">OVERVIEW</div>

        <button
          className={`nav-link payout-link ${activeSection === "dashboard" ? "active" : ""}`}
          onClick={() => onSectionChange("dashboard")}
          type="button"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <div className="nav-title">MEMBERS</div>

        <button
          className={`nav-link payout-link ${activeSection === "members" ? "active" : ""}`}
          onClick={() => onSectionChange("members")}
          type="button"
        >
          <Users size={18} />
          Member List
        </button>

        <div className="nav-title">PAYOUTS</div>

        <button
          className={`nav-link payout-link ${activeSection === "instant" ? "active" : ""}`}
          onClick={() => onSectionChange("instant")}
          type="button"
        >
          <Wallet size={18} />
          Instant Payout
        </button>

        <button
          className={`nav-link payout-link ${activeSection === "regular" ? "active" : ""}`}
          onClick={() => onSectionChange("regular")}
          type="button"
        >
          <CircleDollarSign size={18} />
          Regular Payout
        </button>

        <button
          className={`nav-link payout-link ${activeSection === "history" ? "active" : ""}`}
          onClick={() => onSectionChange("history")}
          type="button"
        >
          <Clock3 size={18} />
          Payout History
        </button>

        <div className="nav-title">OPERATIONS</div>

        <button
          className={`nav-link payout-link ${activeSection === "deposit" ? "active" : ""}`}
          onClick={() => onSectionChange("deposit")}
          type="button"
        >
          <FileText size={18} />
          Deposit Management
        </button>

        <button
          className={`nav-link payout-link ${activeSection === "activation" ? "active" : ""}`}
          onClick={() => onSectionChange("activation")}
          type="button"
        >
          <Activity size={18} />
          Activation Details
        </button>

        <button
          className={`nav-link payout-link ${activeSection === "kyc" ? "active" : ""}`}
          onClick={() => onSectionChange("kyc")}
          type="button"
        >
          <ShieldCheck size={18} />
          KYC Documents
        </button>

        <div className="nav-title">SYSTEM</div>

        <button
          className={`nav-link payout-link ${activeSection === "settings" ? "active" : ""}`}
          onClick={() => onSectionChange("settings")}
          type="button"
        >
          <Settings size={18} />
          Settings
        </button>
      </nav>

      <div className="sidebar-footer">
        <span>PulsePay v1.0</span>
        <span>2026</span>
      </div>
    </aside>
  );
}

export default Sidebar;