function MemberList({ data }) {
  return (
    <div className="table-card">
      <div className="table-heading">
        <div>
          <h3>Member Directory</h3>
          <p>Browse registered members and review their payout activity.</p>
        </div>
        <span className="request-count">{data.length} members</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>User ID</th>
              <th>Latest Request</th>
              <th>Total Withdraw</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              const status =
                index % 5 === 0
                  ? "Pending"
                  : index % 7 === 0
                  ? "Rejected"
                  : "Approved";

              return (
                <tr key={item.requestNo}>
                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{item.name}</strong>
                        <small>Member</small>
                      </div>
                    </div>
                  </td>
                  <td>{item.userId}</td>
                  <td>{item.date}</td>
                  <td>₹{item.withdraw.toLocaleString()}</td>
                  <td>
                    <span className={`status ${status.toLowerCase()}`}>
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

export default MemberList;
