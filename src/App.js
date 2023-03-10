import React, { useEffect, useState } from "react";
import ExpenseRecord from "./components/ExpenseRecord";
import axios from "axios";
import ExpenseHeading from "./components/ExpenseHeading";
import "./App.css";
import AddExpense from "./components/AddExpense";
import ExpenseAnalysis from "./components/ExpenseAnalysis";

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [totalAmount, updateTotalAmount] = useState("");
  const [totalRahul, updateTotalRahul] = useState("");
  const [totalRamesh, updateTotalRamesh] = useState("");
  const [balanceAmount, updateBalanceAmount] = useState("");
  const [balancePayee, updateBalancePayee] = useState("");
  const [addClicked, setAddClicked] = useState("no");

  useEffect(() => {
    axios
      .get("http://localhost:4000/items")
      .then((response) => setExpenseData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    calculateAmount();
  });

  //Calculating total amount spent
  const calculateAmount = () => {
    let total_amount = 0;
    let amt_rahul = 0;
    let amt_ramesh = 0;
    let amt_balance = 0;

    for (let i = 0; i < expenseData.length; i++) {
      total_amount = total_amount + expenseData[i].price;

      if (expenseData[i].payeeName === "Rahul")
        amt_rahul = amt_rahul + expenseData[i].price;
      else if (expenseData[i].payeeName === "Ramesh")
        amt_ramesh = amt_ramesh + expenseData[i].price;
    }
    if (amt_rahul > amt_ramesh) {
      amt_balance = amt_rahul - amt_ramesh;
      updateBalancePayee("Ramesh");
    } else {
      amt_balance = amt_ramesh - amt_rahul;
      updateBalancePayee("Rahul");
    }

    /*   console.log("total ", total_amount);
    console.log("rahul ", amt_rahul);
    console.log("ramesh ", amt_ramesh);
    console.log("balance ", amt_balance);
 */
    updateTotalAmount(total_amount);
    updateTotalRahul(amt_rahul);
    updateTotalRamesh(amt_ramesh);
    updateBalanceAmount(amt_balance);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setAddClicked("yes");
  };

  const getMessage = (msg) => {
    if (msg === "no") setAddClicked("yes");
    else if (msg === "yes") {
      axios
        .get("http://localhost:4000/items")
        .then((response) => setExpenseData(response.data));
      calculateAmount();
      setAddClicked("no");
    }
  };

  return (
    <>
      <div className="heading">EXPENSE TRACKER</div>
      <hr></hr>
      <div>
        <button className="add_button" onClick={clickHandler}>
          Add New Expense
        </button>
      </div>
      <br></br>
      {addClicked === "yes" && (
        <AddExpense sendMessage={getMessage}></AddExpense>
      )}
      {addClicked === "no" && <ExpenseHeading></ExpenseHeading>}
      {addClicked === "no" &&
        expenseData.map((record, i) => (
          <ExpenseRecord
            key={i}
            id={record.id}
            date={record.date}
            item={record.expenseDescription}
            payee={record.payeeName}
            amount={record.price}
          ></ExpenseRecord>
        ))}
      <hr></hr>
      {addClicked === "no" && (
        <ExpenseAnalysis
          total_amt={totalAmount}
          total_rahul={totalRahul}
          total_ramesh={totalRamesh}
          balance={balanceAmount}
          balance_payee={balancePayee}
        ></ExpenseAnalysis>
      )}
      <hr></hr>
    </>
  );
}

export default App;
