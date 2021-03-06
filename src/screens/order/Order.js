import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import http from "../../http-common";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";

import "./Order.css";

const Row = (order) => {
  const [open, setOpen] = useState(true);
  const date = new Date(order.order.OrderTimeStamp);

  function total(items) {
    let sum = 0;
    items.forEach((item) => {
      sum += parseFloat(item.qty) * parseFloat(item.menuitemprice);
    });

    return sum.toFixed(2).toString();
  }
  function setPayed(id) {
    http
      .patch("/order/" + id, { StatusPayed: true })
      .then(function () {
        console.log("payed");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.order.TableName}
        </TableCell>
        <TableCell component="th" scope="row">
          {date.getHours()}:{date.getMinutes()}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <Button
            variant="contained"
            className="paidBtn"
            onClick={() => setPayed(order.order._id)}
          >
            Bezahlt
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="order-items">
                <TableHead>
                  <TableRow>
                    <TableCell>Gericht</TableCell>
                    <TableCell>Anmerkung</TableCell>
                    <TableCell>Anzahl</TableCell>
                    <TableCell>Preis (€)</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order.OrderItems.map((orderItem) => (
                    <TableRow key={orderItem._id}>
                      <TableCell component="th" scope="row">
                        {orderItem.name}
                      </TableCell>
                      <TableCell>
                      {orderItem.note}
                      </TableCell>
                      <TableCell>{orderItem.qty}</TableCell>
                      <TableCell>{orderItem.menuitemprice}</TableCell>
                      <TableCell align="right">
                        <Checkbox
                          inputProps={{ "aria-label": "OrderItem checkbox" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow rowSpan={4}>
                    <TableCell colSpan={2} />
                    <TableCell colSpan={2}>Gesamtpreis</TableCell>
                    <TableCell align="right">
                      {total(order.order.OrderItems)}€
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const fetchOrders = async () => {
    await http
      .get("/orders")
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchTables = async () => {
    await http
      .get("/tables")
      .then(function (response) {
        setTables(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const mergeById = (orders, tables) =>
    orders.map((itm) => ({
      ...tables.find((item) => item._id === itm.TableId && item),
      ...itm,
    }));

  const mergedTables = mergeById(orders, tables);

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("event", function (data) {
      if (data.order === "updated") {
        fetchOrders();
      } else if (data.table === "updated") {
        fetchTables();
      }
    });
    fetchOrders();
    fetchTables();
  }, []);

  const calledWaiter = async (tableId) => {
    if (tableId !== null) {
      await http
        .patch("/table/" + tableId, {
          waitressCalled: false,
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <Paper>
        <Toolbar className="tableToolbar">
          <Typography
            className="title"
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Bestellungen
          </Typography>
        </Toolbar>
        {tables.map((table) =>
          table.waitressCalled ? (
            <Typography key={table._id} className="waiterText">
              Kellner an {table.TableName} gerufen.
              <Tooltip title="Erledigt?">
                <IconButton
                  aria-label="setDone"
                  className="waiterBtn"
                  onClick={() => calledWaiter(table._id)}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          ) : null
        )}
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Bestellung</TableCell>
                <TableCell>Uhrzeit</TableCell>
                <TableCell align="right">Bezahlt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mergedTables.map((order) =>
                order.StatusPayed === false ? (
                  <Row key={order._id} order={order} />
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Order;
