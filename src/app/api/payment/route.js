export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_PAYMENT}`,
      },
      body: JSON.stringify({ data: body }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return Response.json({ message: "Failed to send data", error: responseData }, { status: response.status });
    }

    return Response.json({ message: "Successfully sent!", data: responseData }, { status: 200 });
  } catch (error) {
    console.error("Error submitting payment:", error);
    return Response.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
