const CONFIG_SERVER_HOST = process.env.REACT_APP_CONFIG_SERVER_HOST;
const CONFIG_SERVER_PORT = process.env.REACT_APP_CONFIG_SERVER_PORT;

const getConfigFromConfigServer = async () => {
  const response = await fetch(
    `//${CONFIG_SERVER_HOST}:${CONFIG_SERVER_PORT}/share/`
  );
  return await response.json();
};

const getLocalSharedConfig = async () => {
  const response = await fetch("/sygma-shared-config.json");
  return await response.json();
};

export async function getSharedConfig() {
  let sharedConfig;

  if (process.env.NODE_ENV === "production") {
    sharedConfig = await getConfigFromConfigServer();
  } else {
    sharedConfig = await getLocalSharedConfig();
  }

  return sharedConfig;
}
