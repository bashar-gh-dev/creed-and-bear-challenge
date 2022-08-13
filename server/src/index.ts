import * as express from "express";
import * as path from "path";
import { delayResponseMiddleware } from "./middlewares/delay-response";
import { authRoute } from "./routes/auth";
import { usersRoute } from "./routes/users";
import * as cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())
app.use(delayResponseMiddleware);
app.use(usersRoute);
app.use(authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
