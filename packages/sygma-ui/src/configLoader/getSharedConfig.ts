const CLOUDFLARE_SHARED_CONFIG_URL =
  process.env.REACT_APP_CLOUDFLARE_SHARED_CONFIG_URL;

const getConfigFromConfigServer = async () => {
  console.log(
    "🚀 ~ CLOUDFLARE_SHARED_CONFIG_URL:",
    CLOUDFLARE_SHARED_CONFIG_URL
  );
  const response = await fetch(`${CLOUDFLARE_SHARED_CONFIG_URL}`);
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
