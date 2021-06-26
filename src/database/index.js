import { getEnv } from "../utils";

const USERNAME = getEnv('MONGO_USERNAME');
const PASSWORD = getEnv('MONGO_PASSWORD')
export const dbConnection = {
    // url: `mongodb://${host}:${port}/${database}`, // docker setup
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qscnl.mongodb.net/policeData-db?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  };