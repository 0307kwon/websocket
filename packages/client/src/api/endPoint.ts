type Url = string;

type Mode = "production" | "development" | "development-with-docker";

const END_POINT: {
  API: Url;
  SOCKET: Url;
} = (() => {
  const nodeEnv = process.env.MODE as Mode;

  if (nodeEnv === "production") {
    return {
      API: process.env.PROD_API_SERVER,
      SOCKET: process.env.PROD_SOCKET_SERVER,
    };
  }

  if (nodeEnv === "development") {
    return {
      API: process.env.DEV_API_SERVER,
      SOCKET: process.env.DEV_SOCKET_SERVER,
    };
  }

  if (nodeEnv === "development-with-docker") {
    return {
      API: process.env.DEV_WITH_DOCKER_API_SERVER,
      SOCKET: process.env.DEV_WITH_DOCKER_SOCKET_SERVER,
    };
  }

  throw new Error("env MODE가 설정되지 않았습니다.");
})();

console.log(END_POINT);

export default END_POINT;
