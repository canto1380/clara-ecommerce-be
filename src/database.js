import mongoose from "mongoose";
import dotenv from 'dotenv'
import signale from 'signale'
import seedersUp from "./utils/seeders.js";

dotenv.config({path: '.env'})

const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_PASS, MONGO_USER } = process.env

// const connUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const connUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
mongoose.connect(connUrl, (err) => {
  if(err) signale.error(err)
  else signale.success('Database connected')
    seedersUp()
});



const connection = mongoose.connection;
  connection.once("open", () => {
    console.log(`Conectado a la DB: *** ${MONGO_DB} ***`);
  });

