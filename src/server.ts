import cors from "cors";
import dotenv from "dotenv";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

// base route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
