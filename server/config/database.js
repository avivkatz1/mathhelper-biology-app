import { CosmosClient } from "@azure/cosmos";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({ endpoint, key });

const databaseId = "biologyDB";
const containerId = "user";

const database = client.database(databaseId);
const container = database.container(containerId);

export { client, database, container, databaseId, containerId };
