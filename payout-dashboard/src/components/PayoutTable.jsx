import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

function PayoutTable({
  data,
  selected,
  setSelected,
}) {
  const allSelected =
    data.length > 0 &&
    data.every((item) =>
      selected.includes(item.requestNo)
    );

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(
        data.map((item) => item.requestNo)
      );
    }
  };

  const toggleOne = (requestNo) => {
    if (selected.includes(requestNo)) {
      setSelected(
        selected.filter(
          (item) => item !== requestNo
        )
      );
    } else {
      setSelected([
        ...selected,
        requestNo,
      ]);
    }
  };

  const getStatus = (index) => {
    if (index % 5 === 0) return "Pending";
    if (index % 7 === 0) return "Rejected";
    return "Approved";
  };

  return (
    <div className="table-card">

      <div className="table-heading">
        <div>
          <h3>Recent Payout Requests</h3>
          <p>
            Review and approve regular payout
            requests
          </p>
        </div>

        <span className="request-count">
          {data.length} requests
        </span>
      </div>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>

              <th>Request</th>
              <th>Member</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Withdraw</th>
              <th>Charges</th>
              <th>Net Pay</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {data.map((item, index) => {

              const status =
                getStatus(index);

              return (
                <tr key={item.requestNo}>

                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(
                        item.requestNo
                      )}
                      onChange={() =>
                        toggleOne(
                          item.requestNo
                        )
                      }
                    />
                  </td>

                  <td>
                    <span className="request-number">
                      #{item.requestNo}
                    </span>
                  </td>

                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">
                        {item.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {item.name}
                        </strong>
                        <small>
                          Member
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="user-id">
                      {item.userId}
                    </span>
                  </td>

                  <td>
                    <span className="date">
                      {item.date}
                    </span>
                  </td>

                  <td>
                    <strong>
                      ₹
                      {item.withdraw.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    ₹
                    {(
                      item.service +
                      item.tds +
                      item.wallet
                    ).toLocaleString()}
                  </td>

                  <td>
                    <strong className="net-pay">
                      ₹
                      {item.netpay.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`status ${status.toLowerCase()}`}
                    >
                      {status ===
                        "Approved" && (
                        <CheckCircle2 size={14} />
                      )}

                      {status ===
                        "Pending" && (
                        <Clock3 size={14} />
                      )}

                      {status ===
                        "Rejected" && (
                        <XCircle size={14} />
                      )}

                      {status}
                    </span>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default PayoutTable;