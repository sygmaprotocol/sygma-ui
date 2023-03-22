const getConfigFromConfigServer = () => {
  return null;
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
    sharedConfig = getLocalSharedConfig();
  }

  return sharedConfig;
}
