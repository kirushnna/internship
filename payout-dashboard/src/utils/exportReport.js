export function exportToCSV(data, filename = "payout-report.csv") {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = [
    "S.No",
    "Request No",
    "Date",
    "Name",
    "User ID",
    "Withdraw Amount",
    "Service Charge",
    "TDS",
    "Re-Purchase Wallet",
    "Net Payout",
  ];

  const formatDate = (value) => {
    if (!value) return "";

    const dateValue =
      typeof value === "string"
        ? new Date(value.replace(/\s+/g, "T"))
        : new Date(value);

    if (Number.isNaN(dateValue.getTime())) {
      return String(value);
    }

    return dateValue.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const rows = data.map((item, index) => {
    const netPayout =
      item.netpay ??
      item.netPayout ??
      (item.withdraw != null
        ? item.withdraw - (item.service || 0) - (item.tds || 0) - (item.wallet || 0)
        : "");

    return [
      item.sno ?? index + 1,
      item.requestNo ?? "",
      formatDate(item.date ?? item.createdAt ?? item.timestamp),
      item.name ?? "",
      item.userId ?? "",
      item.withdraw ?? "",
      item.service ?? "",
      item.tds ?? "",
      item.wallet ?? "",
      netPayout,
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}