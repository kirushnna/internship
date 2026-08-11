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

function Sidebar({ open, onClose }) {
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

        <a className="nav-link">
          <LayoutDashboard size={18} />
          Dashboard
        </a>

        <div className="nav-title">MEMBERS</div>

        <a className="nav-link">
          <Users size={18} />
          Member List
        </a>

        <div className="nav-title">PAYOUTS</div>

        <a className="nav-link">
          <Wallet size={18} />
          Instant Payout
        </a>

        <a className="nav-link active">
          <CircleDollarSign size={18} />
          Regular Payout
        </a>

        <a className="nav-link">
          <Clock3 size={18} />
          Payout History
        </a>

        <div className="nav-title">OPERATIONS</div>

        <a className="nav-link">
          <FileText size={18} />
          Deposit Management
        </a>

        <a className="nav-link">
          <Activity size={18} />
          Activation Details
        </a>

        <a className="nav-link">
          <ShieldCheck size={18} />
          KYC Documents
        </a>

        <div className="nav-title">SYSTEM</div>

        <a className="nav-link">
          <Bell size={18} />
          Notifications
        </a>

        <a className="nav-link">
          <Settings size={18} />
          Settings
        </a>
      </nav>

      <div className="sidebar-footer">
        <span>PulsePay v1.0</span>
        <span>2026</span>
      </div>
    </aside>
  );
}

export default Sidebar;