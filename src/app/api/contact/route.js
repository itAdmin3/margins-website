const api_url = process.env.API_ODOO_API_URL;
const db = process.env.API_ODOO_DB;
const login = process.env.API_ODOO_USERNAME;
const password = process.env.API_ODOO_PASSWORD;

async function getAccessToken() {
  try {
    const url = new URL(`${api_url}login`);
    url.searchParams.append("db", db);
    url.searchParams.append("login", login);
    url.searchParams.append("password", password);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data.access_token;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function createLead(accessToken, fields) {
  try {
    const url = `${api_url}contactus`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Accept: "application/json",
        "access-token": accessToken,
      },
      body: JSON.stringify(fields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_URL}/contact-forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_CONTACT_FORM}`,
      },
      body: JSON.stringify({ data: { title: "Website Inquiry", name: body.name, phone: `${body.country}-${body.phone}`, unitType: body.unitType, message: body.message } }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return Response.json({ message: "Failed to send data", error: responseData }, { status: response.status });
    }

    // Get Access Token
    const accessToken = await getAccessToken();
    // console.log(accessToken);

    // Create Lead in Odoo
    const lead = await createLead(accessToken, { name: body.name, country_code: body.country, phone: body.phone, email: "", subject: "Website Message", body: body.message, project_id: null, campaign_id: null, referred3: null });
    // console.log(lead);

    return Response.json({ message: "Successfully sent!", data: responseData }, { status: 200 });
  } catch (error) {
    
    console.error("Error submitting contact form:", error);
    return Response.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
