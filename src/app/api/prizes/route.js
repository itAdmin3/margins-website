export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/prizes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          process.env.API_PRIZES_TOKEN || process.env.API_TOKEN
        }`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Transform the API response to match the wheel component format
    // Assuming the API returns an array of prizes with 'name' or 'title' property
    const prizes = data.data || data;
    const formattedPrizes = prizes.map((prize) => ({
      option: prize.name || prize.title || prize.option || "Prize",
    }));

    return Response.json(
      {
        message: "Successfully fetched prizes!",
        data: formattedPrizes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching prizes:", error);
  }
}
