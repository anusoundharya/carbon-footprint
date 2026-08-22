import React from "react";

function History() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Carbon Footprint History</h2>
      <button
  onClick={() => {
    localStorage.removeItem("history");
    window.location.reload();
  }}
>
  Clear History
</button>

<br />
<br />
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Travel (km)</th>
            <th>Electricity (kWh)</th>
            <th>Food</th>
            <th>Total CO₂ (kg)</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.travel}</td>
              <td>{item.electricity}</td>
              <td>{item.food}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;