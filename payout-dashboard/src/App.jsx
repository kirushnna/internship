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

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selected, setSelected] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 8;

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
    return payoutData.filter((item) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.requestNo
          .includes(searchValue) ||
        item.userId
          .toLowerCase()
          .includes(searchValue);

      return matchesSearch;
    });
  }, [search]);

  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  );

  const currentData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const approveSelected = () => {
    if (selected.length === 0) {
      alert(
        "Please select at least one payout request."
      );
      return;
    }

    alert(
      `${selected.length} payout request(s) selected for approval.`
    );

    setSelected([]);
  };

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

              <h1>
                Regular Payouts
              </h1>

              <p>
                Monitor, review and manage
                member payout requests.
              </p>
            </div>

            <div className="header-actions">

              <button className="export-btn" onClick={handleExport}>
  ↓ Export
</button>

              <button
                className="primary-btn"
                onClick={approveSelected}
              >
                <Check size={17} />
                Approve Selected
              </button>

            </div>

          </section>

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
                  )
                )}

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