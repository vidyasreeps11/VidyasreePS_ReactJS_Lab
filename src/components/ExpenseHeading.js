import React from "react";
import "./ExpenseHeading.css";

function ExpenseHeading() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="heading_style">Id</th>
            <th className="heading_style">Date</th>
            <th className="heading_style">Item Description</th>
            <th className="heading_style">Payee</th>
            <th className="heading_style">Amount</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default ExpenseHeading;
