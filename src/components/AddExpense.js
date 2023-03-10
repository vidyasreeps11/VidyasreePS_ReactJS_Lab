import axios from "axios";
import React, { useState } from "react";
import "./AddExpense.css";

function AddExpense(props) {
  const [cancelClicked, setCancelClicked] = useState("no");

  /*   const [payee, setPayee] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(""); */

  //Setting Maximum Date as today's date in DatePicker while adding expense

  var today = new Date();
  var maxDate = `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
    -2
  )}-${("0" + today.getDate()).slice(-2)}`;

  const url = "http://localhost:4000/items/";

  const [data, setData] = useState({
    expenseDescription: "",
    payeeName: "",
    price: 0,
    date: "",
  });

  //posting new data to json server/expense.json file
  const saveExpense = (e) => {
    e.preventDefault();

    axios
      .post(url, {
        expenseDescription: data.expenseDescription,
        payeeName: data.payeeName,
        price: data.price,
        date: data.date,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    /*   setPayee("");
    setPrice("");
    setProduct("");
    setDate(""); */

    document.getElementById("payeeName").value = "";
    document.getElementById("expenseDescription").value = "";
    document.getElementById("price").value = "";
    document.getElementById("date").value = "";
  };

  //executes when cancel button is clicked
  const closeClickHandler = (e) => {
    e.preventDefault();
    setCancelClicked("yes");
    props.sendMessage(cancelClicked);
  };

  //executes when form data changes
  const handleChange = (e) => {
    const newData = { ...data };

    if (e.target.id === "price")
      newData[e.target.id] = parseInt(e.target.value);
    else newData[e.target.id] = e.target.value;

    setData(newData);
  };

  return (
    <form onSubmit={saveExpense}>
      <div id="heading_div">Add New Expense</div>
      <br></br>

      <label>Name : </label>
      <select id="payeeName" required onChange={(e) => handleChange(e)}>
        <option></option>
        <option>Ramesh</option>
        <option>Rahul</option>
      </select>

      <br></br>
      <br></br>

      <label>Product Purchased : </label>
      <br></br>
      <input
        id="expenseDescription"
        type="text"
        required
        onChange={(e) => handleChange(e)}
      ></input>

      <br></br>
      <br></br>

      <label>Price : </label>
      <br></br>
      <input
        id="price"
        type="number"
        required
        onChange={(e) => handleChange(e)}
      ></input>

      <br></br>
      <br></br>

      <label>Date : </label>
      <br></br>
      <input
        id="date"
        type="date"
        min={"2022-01-01"}
        max={maxDate}
        required
        onChange={(e) => handleChange(e)}
      ></input>

      <br></br>
      <br></br>
      <br></br>
      <button type="submit">Submit</button>
      <button onClick={closeClickHandler}>Close</button>
    </form>
  );
}

export default AddExpense;
