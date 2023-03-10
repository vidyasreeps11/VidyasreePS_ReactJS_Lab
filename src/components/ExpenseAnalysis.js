import "./ExpenseAnalysis.css";

function ExpenseAnalysis(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th className="analysis_heading">Total Amount Spent :</th>
            <td id="amt_spent">{props.total_amt}</td>
          </tr>
          <tr>
            <th className="analysis_heading">Amount Spent By Rahul :</th>
            <td id="amt_rahul">{props.total_rahul}</td>
          </tr>
          <tr>
            <th className="analysis_heading">Amount Spent By Ramesh :</th>
            <td id="amt_ramesh">{props.total_ramesh}</td>
          </tr>
          <tr>
            <th className="analysis_heading">
              Amount to be paid by {props.balance_payee} :
            </th>
            <td id="amt_pay">{props.balance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseAnalysis;
