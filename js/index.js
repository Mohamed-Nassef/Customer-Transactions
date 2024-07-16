// app.js
document.addEventListener("DOMContentLoaded", () => {
  const filterInput = document.getElementById("filter");
  const customerTableBody = document.querySelector("#customer-table tbody");
  const ctx = document.getElementById("transaction-chart").getContext("2d");
  let customers = [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" },
  ];
  let transactions = [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
  ];

  const renderTable = (data) => {
    customerTableBody.innerHTML = "";
    data.forEach((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${customer.name}</td>
              <td>${transaction.date}</td>
              <td>${transaction.amount}</td>
          `;
      customerTableBody.appendChild(row);
    });
  };

  const filterData = () => {
    const filterValue = filterInput.value.toLowerCase();
    const filteredTransactions = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      return (
        customer.name.toLowerCase().includes(filterValue) ||
        transaction.amount.toString().includes(filterValue)
      );
    });
    renderTable(filteredTransactions);
  };

  filterInput.addEventListener("input", filterData);

  const renderChart = () => {
    const selectedCustomerId = customers.find(
      (c) => c.id === parseInt(selectedCustomerId)
    );
    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === selectedCustomerId
    );
    const dates = customerTransactions.map((transaction) => transaction.date);
    const amounts = customerTransactions.map(
      (transaction) => transaction.amount
    );

    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Transaction Amount",
            data: amounts,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      },
    });
  };

  renderTable(transactions);
});
