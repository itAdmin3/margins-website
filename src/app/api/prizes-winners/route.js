export async function POST(req) {
  try {
    const body = await req.json();

    const url = process.env.API_URL
      ? `${process.env.API_URL}/prize-winners`
      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/prize-winners`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          process.env.API_PRIZES_TOKEN || process.env.API_TOKEN
        }`,
      },
      body: JSON.stringify({ data: body }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: "Failed to send data", error: responseData },
        { status: response.status }
      );
    }

    return Response.json(
      { message: "Successfully sent!", data: responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting prize winner:", error);
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
