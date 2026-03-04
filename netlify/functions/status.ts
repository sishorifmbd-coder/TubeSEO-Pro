export const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "TubeSEO Pro Engine Online",
      timestamp: new Date().toISOString(),
      environment: "Netlify Serverless"
    }),
  };
};