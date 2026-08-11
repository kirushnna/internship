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

  const rows = data.map((item, index) => [
    index + 1,
    item.requestNo,
    item.date,
    item.name,
    item.userId,
    item.withdrawAmount,
    item.serviceCharge,
    item.tds,
    item.rePurchaseWallet,
    item.netPayout,
  ]);

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