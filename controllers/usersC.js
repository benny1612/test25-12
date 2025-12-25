import { readData } from "../utils/dbFunc.js";

import fs from "fs/promises";

const addNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const js_File = await readData("users");
    const new_user = { username: username, password: password };
    js_File.push(new_user);
    const myText = JSON.stringify(js_File);
    await fs.writeFile("./data/users.json", myText);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

const BuyTickets = async (req, res) => {
  try {
    const { username, password, eventName, quantity } = req.body;
    const eventsDB = await readData("events");
    const receiptsDB = await readData("receipts");
    const findevent = eventsDB.findIndex(
      (element) => element.eventName.toLowerCase() == eventName.toLowerCase()
    );
    if (findevent != -1 && eventsDB[findevent]["ticketsForSale"] >= quantity) {
      const newReceipt = {
        username: username,
        eventName: eventName,
        ticketsBought: parseInt(quantity),
      };
      eventsDB[findevent].ticketsForSale -= quantity;
      receiptsDB.push(newReceipt);
      const myeventsDBText = JSON.stringify(eventsDB);
      const myreceiptsDBText = JSON.stringify(receiptsDB);
      await fs.writeFile("./data/events.json", myeventsDBText);
      await fs.writeFile("./data/receipts.json", myreceiptsDBText);
      res.json({ message: "Tickets purchased successfully" });
    } else {
      res.json({ error: "There are not enough tickets for sale." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

const UserPurchaseSummary = async (req, res) => {
  try {
    const  username  = req.params.username
    const usersDB = await readData("receipts");
    const findUser = usersDB.filter((user) => user.username == username);
    


var eventsarray = Object.keys(findUser.reduce((r,{eventName}) => (r[eventName]='', r) , {}))


 const sum = findUser.reduce(
  (accumulator, currentValue) => accumulator +parseInt(currentValue.ticketsBought),
  0,
);


  
    if (findUser.length > 0) {
      const Summary = {
        totalTicketsBought: sum,
        events: eventsarray,
        averageTicketsPerEvent: sum/eventsarray.length,
      };
      res.json(Summary);
    } else {
      res.json("0");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

export { addNewUser, BuyTickets, UserPurchaseSummary };
