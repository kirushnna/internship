import { useMemo, useState } from "react";
import { exportToCSV } from "./utils/exportReport";

import {
  Wallet,
  Users,
  Clock3,
  CircleDollarSign,
  Search,
  Download,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import PayoutChart from "./components/PayoutChart";
import FeeBreakdown from "./components/FeeBreakdown";
import PayoutTable from "./components/PayoutTable";
import MemberList from "./components/MemberList";

import payoutData from "./data/payoutData";

function App() {
  const handleExport = () => {
  exportToCSV(
    payoutData,
    `regular-payout-report-${new Date().toISOString().slice(0, 10)}.csv`
  );
};
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("regular");

  const pageTitle =
    activeSection === "members"
      ? "Member List"
      : activeSection === "instant"
      ? "Instant Payout"
      : activeSection === "history"
      ? "Payout History"
      : "Regular Payouts";

  const pageDescription =
    activeSection === "members"
      ? "Browse and manage registered members."
      : activeSection === "instant"
      ? "Send an immediate payout to a registered member."
      : activeSection === "history"
      ? "Review all payout activity and completed payout requests."
      : "Monitor, review and manage member payout requests.";

  const [instantMemberId, setInstantMemberId] =
    useState("");

  const [instantAmount, setInstantAmount] =
    useState("");

  const [instantNote, setInstantNote] =
    useState("");

  const [instantHistory, setInstantHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selected, setSelected] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 8;

  const getStatus = (index) => {
    if (index % 5 === 0) return "Pending";
    if (index % 7 === 0) return "Rejected";
    return "Approved";
  };

  const [payoutDataWithStatus, setPayoutDataWithStatus] = useState(
    () =>
      payoutData.map((item, index) => ({
        ...item,
        status: getStatus(index),
      }))
  );

  const totalWithdraw = payoutData.reduce(
    (sum, item) => sum + item.withdraw,
    0
  );

  const totalNetPay = payoutData.reduce(
    (sum, item) => sum + item.netpay,
    0
  );

  const totalCharges = payoutData.reduce(
    (sum, item) =>
      sum +
      item.service +
      item.tds +
      item.wallet,
    0
  );

  const filteredData = useMemo(() => {
    return payoutDataWithStatus.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.requestNo.includes(searchValue) ||
        item.userId.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, payoutDataWithStatus]);

  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  );

  const currentData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSendInstantPayout = () => {
    if (!instantMemberId || !instantAmount) {
      alert("Please enter member ID and amount.");
      return;
    }

    setInstantHistory((history) => [
      {
        requestNo: `IP-${Date.now()}`,
        name: instantMemberId,
        userId: instantMemberId,
        date: new Date().toLocaleString(),
        amount: Number(instantAmount),
        note: instantNote || "Instant payout",
      },
      ...history,
    ]);

    setInstantMemberId("");
    setInstantAmount("");
    setInstantNote("");
    alert("Instant payout created successfully.");
  };

  const approveSelected = () => {
    if (selected.length === 0) {
      alert(
        "Please select at least one payout request."
      );
      return;
    }

    setPayoutDataWithStatus((records) =>
      records.map((record) =>
        selected.includes(record.requestNo)
          ? { ...record, status: "Approved" }
          : record
      )
    );

    setSelected([]);
  };

  const rejectSelected = () => {
    if (selected.length === 0) {
      alert(
        "Please select at least one payout request."
      );
      return;
    }

    setPayoutDataWithStatus((records) =>
      records.map((record) =>
        selected.includes(record.requestNo)
          ? { ...record, status: "Rejected" }
          : record
      )
    );

    setSelected([]);
  };

  const clearSelection = () => setSelected([]);

  return (
    <div
      className={`app ${
        darkMode ? "dark" : ""
      }`}
    >

      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }}
      />

      <div className="main-area">

        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="dashboard">

          {/* PAGE HEADER */}

          <section className="page-header">

            <div>
              <span className="eyebrow">
                PAYOUT OPERATIONS
              </span>

              <h1>{pageTitle}</h1>

              <p>{pageDescription}</p>
            </div>

            <div className="header-actions">

              <button className="export-btn" onClick={handleExport}>
  ↓ Export
</button>

            </div>

          </section>

          {/* SECTION CONTENT */}

          {activeSection === "regular" ? (
            <>
              {/* STAT CARDS */}
              <section className="stats-grid">

                <StatCard
                  title="Total Withdrawals"
                  value={`₹${totalWithdraw.toLocaleString()}`}
                  subtitle="Across all payout requests"
                  icon={Wallet}
                  trend="+12.8%"
                />

                <StatCard
                  title="Net Payout"
                  value={`₹${totalNetPay.toLocaleString()}`}
                  subtitle="Amount payable to members"
                  icon={CircleDollarSign}
                  trend="+8.4%"
                />

                <StatCard
                  title="Total Requests"
                  value={payoutData.length}
                  subtitle="Regular payout requests"
                  icon={Users}
                  trend="+5.2%"
                />

                <StatCard
                  title="Total Charges"
                  value={`₹${totalCharges.toLocaleString()}`}
                  subtitle="Fees and deductions"
                  icon={Clock3}
                  trend="+3.1%"
                />

              </section>

              {/* CHARTS */}
              <section className="charts-grid">
                <PayoutChart />
                <FeeBreakdown />
              </section>

              {/* TABLE CONTROLS */}
              <section className="table-section">
            
          <div className="toolbar">

            <div className="toolbar-title">
              <h2>
                Payout Requests
              </h2>

              <span>
                Showing{" "}
                {filteredData.length} records
              </span>
            </div>

            <div className="toolbar-actions">

              <div className="search-box">

                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search member, ID or request..."
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );
                    setPage(1);
                  }}
                />

              </div>

              <div className="toolbar-button-group">
                <button
                  className="primary-btn"
                  type="button"
                  onClick={approveSelected}
                  disabled={selected.length === 0}
                >
                  Approve Selected
                </button>

                <button
                  className="secondary-btn"
                  type="button"
                  onClick={rejectSelected}
                  disabled={selected.length === 0}
                >
                  Reject Selected
                </button>

                <button
                  className="secondary-btn"
                  type="button"
                  onClick={clearSelection}
                  disabled={selected.length === 0}
                >
                  Clear Selection
                </button>
              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="filter-select"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

            </div>

          </div>

          <PayoutTable
            data={currentData}
            selected={selected}
            setSelected={setSelected}
          />

          {/* PAGINATION */}

          <div className="pagination">

            <span>
              Page {page} of{" "}
              {totalPages || 1}
            </span>

            <div>

              <button
                disabled={page === 1}
                onClick={() =>
                  setPage(
                    Math.max(
                      page - 1,
                      1
                    )
                  )
                }
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                {
                  length:
                    totalPages || 1,
                },
                (_, index) => (
                  <button
                    key={index}
                    className={
                      page ===
                      index + 1
                        ? "active-page"
                        : ""
                    }
                    onClick={() =>
                      setPage(
                        index + 1
                      )
                    }
                  >
                    {index + 1}
                  </button>
                ))}

              <button
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
              >
                <ChevronRight size={17} />
              </button>

            </div>

          </div>

        </section>
            </>
          ) : activeSection === "members" ? (
            <MemberList data={payoutData} />
          ) : activeSection === "instant" ? (
            <section className="table-section">
              <div className="toolbar">
                <div className="toolbar-title">
                  <h2>Instant Payout</h2>
                  <span>Send instant funds to a member now.</span>
                </div>
              </div>

              <div className="instant-form-card">
                <div className="instant-form-row">
                  <label>Member ID</label>
                  <input
                    type="text"
                    value={instantMemberId}
                    onChange={(e) =>
                      setInstantMemberId(e.target.value)
                    }
                    placeholder="Enter member ID"
                  />
                </div>

                <div className="instant-form-row">
                  <label>Amount</label>
                  <input
                    type="number"
                    value={instantAmount}
                    onChange={(e) =>
                      setInstantAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                  />
                </div>

                <div className="instant-form-row">
                  <label>Note</label>
                  <input
                    type="text"
                    value={instantNote}
                    onChange={(e) =>
                      setInstantNote(e.target.value)
                    }
                    placeholder="Payout note (optional)"
                  />
                </div>

                <button
                  className="primary-btn"
                  onClick={handleSendInstantPayout}
                  type="button"
                >
                  Send Instant Payout
                </button>
              </div>

              {instantHistory.length > 0 && (
                <div className="table-card">
                  <div className="table-heading">
                    <div>
                      <h3>Recent Instant Payouts</h3>
                      <p>Latest instant transfers made during this session.</p>
                    </div>
                    <span className="request-count">
                      {instantHistory.length} records
                    </span>
                  </div>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Request</th>
                          <th>Member ID</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instantHistory.map((item) => (
                          <tr key={item.requestNo}>
                            <td>
                              <span className="request-number">
                                #{item.requestNo}
                              </span>
                            </td>
                            <td>{item.userId}</td>
                            <td>{item.date}</td>
                            <td>
                              <strong>
                                ₹{item.amount.toLocaleString()}
                              </strong>
                            </td>
                            <td>{item.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          ) : (
            <section className="table-section">
              <div className="toolbar">
                <div className="toolbar-title">
                  <h2>Payout History</h2>
                  <span>Review all payout activity and completed payout requests.</span>
                </div>

                <div className="toolbar-actions">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="filter-select"
                  >
                    <option value="All">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <PayoutTable
                data={currentData}
                selected={selected}
                setSelected={setSelected}
              />
            </section>
          )}

        </main>

      </div>

      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

    </div>
  );
}

export default App;