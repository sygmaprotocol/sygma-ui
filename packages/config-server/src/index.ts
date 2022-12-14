import express, { Application } from "express";
import cors from "cors";
import { secrets } from "docker-secret";

import { SSM } from "@aws-sdk/client-ssm";

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const SSM_PARAMETER_NAME =
  secrets.SSM_PARAMETER_NAME || process.env.SSM_PARAMETER_NAME;

const app: Application = express();
app.use(cors());

const ssm = new SSM({
  region: "us-east-2",
});

const getConfigFromSSM = async () => {
  try {
    const data = await ssm.getParameter({
      Name: SSM_PARAMETER_NAME,
      WithDecryption: true,
    });
    const rawResponse = data.Parameter?.Value;
    if (rawResponse) {
      const parsedResponse = JSON.parse(rawResponse);
      if (parsedResponse && parsedResponse.SYGMA.chains.length > 0) {
        const chains = await Promise.all(
          parsedResponse.SYGMA.chains.map(async (chainParam: string) => {
            const rawChainData = await ssm.getParameter({
              Name: chainParam,
              WithDecryption: true,
            });
            const chainData = JSON.parse(rawChainData.Parameter?.Value!);
            return chainData;
          })
        );
        parsedResponse.SYGMA.chains = chains;
      }
      return parsedResponse;
    }
  } catch (e) {
    console.warn("AWS SSM request failed");
    console.error(e);
    return { error: e };
  }
};

app.get("/config", (req, res) => {
  getConfigFromSSM().then((config) => {
    res.json(config);
  });
});

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://${HOST}:${PORT}`);
});
