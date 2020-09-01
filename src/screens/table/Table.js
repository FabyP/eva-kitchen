import React, { useEffect, useState } from "react";
import axios from "axios";
var QRCode = require('qrcode.react');


const Table = () => {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    await axios
      .get("http://localhost:9000/tables")
      .then(function (response) {
        setTables(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="container">
      {tables.map((table) => (
        <p key={table._id}>{table.TableName} <QRCode value={table.QRCodeLink} /></p>
      ))}
    </div>
  );
};

export default Table;
