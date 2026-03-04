export default async (request, context) => {
  return new Response(JSON.stringify({
    message: "TubeSEO Edge Optimization Active",
    geo: context.geo?.city || "Global Distribution"
  }), {
    headers: { "content-type": "application/json" },
  });
};