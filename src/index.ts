import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";

const port = process.env.PORT || 4200;

server.on("error", error => {
	return console.log(error);
});

server.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});
