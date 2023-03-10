import React from "react";
import "./ExpenseRecord.css";

function ExpenseRecord(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.id}</td>
            <td>{props.date}</td>
            <td>{props.item}</td>
            <td>{props.payee}</td>
            <td>{props.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseRecord;
