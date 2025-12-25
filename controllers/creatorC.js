import { readData } from "../utils/dbFunc.js";

import fs from "fs/promises";


const CreateEvent = async (req, res) => {
  try {
    const { eventName, ticketsForSale,username,password} = req.body;
    const js_File = await readData("events");
    const new_event = { eventName:eventName,ticketsForSale:ticketsForSale,username:username ,password: password };
    js_File.push(new_event);
    const myText = JSON.stringify(js_File);
    await fs.writeFile("./data/events.json", myText);
    res.json({"message": "Event created successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};
export {CreateEvent};
