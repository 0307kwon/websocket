type Url = string;

type Mode = "production" | "development" | "development_with_jenkins";

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

  if (nodeEnv === "development_with_jenkins") {
    return {
      API: process.env.DEV_WITH_JENKINS_API_SERVER,
      SOCKET: process.env.DEV_WITH_JENKINS_SOCKET_SERVER,
    };
  }

  throw new Error("env MODE가 설정되지 않았습니다.");
})();

console.log(END_POINT, "요고");

export default END_POINT;
