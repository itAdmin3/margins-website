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

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  if (!phone) return false;
  const phoneStr = String(phone).trim();
  const phoneRegex = /^[0-9]{6,15}$/;
  return phoneRegex.test(phoneStr);
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    console.log("Received contact form data:", body);
    
    // Validate required fields
    if (!body.name || !body.phone) {
      console.log("Validation failed: Missing required fields", { name: !!body.name, phone: !!body.phone });
      return Response.json({ 
        message: "Missing required fields", 
        error: "Name and phone are required" 
      }, { status: 400 });
    }

    // Validate email format (only if provided)
    if (body.email && !validateEmail(body.email)) {
      console.log("Validation failed: Invalid email format", body.email);
      return Response.json({ 
        message: "Invalid email format", 
        error: "Please provide a valid email address" 
      }, { status: 400 });
    }

    // Validate phone format
    if (!validatePhone(body.phone)) {
      console.log("Validation failed: Invalid phone format", body.phone, typeof body.phone);
      return Response.json({ 
        message: "Invalid phone format", 
        error: "Phone number must be 6-15 digits" 
      }, { status: 400 });
    }
    
    console.log("Validation passed, proceeding with submission");
    
    // Validate medium parameter
    const allowedMediums = ["banner","direct","email","facebook_lead_generation",
      "google_adwords","linkedin","phone","television","twitter","website",
      "word_of_mouth","instagram","insource","outsource","outsource_m_y",
      "exhibition","facebook_outsource","facebook_comment","facebook_messages",
      "whatsapp_fb","google","snapchat","property_finder","tiktok","dubizzle",
      "telegram","cold_calls","aqar_map","bayut","data","personal_data","walking",
      "newspaper","outdoor","whatsapp_web", "sms"];

    const medium = allowedMediums.includes(body.medium) ? body.medium : "website";

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
      console.log("Strapi API error:", responseData);
      return Response.json({ 
        message: "Failed to send data", 
        error: responseData?.error?.message || "Failed to submit to contact form" 
      }, { status: response.status });
    }

    // Get Access Token
    const accessToken = await getAccessToken();
    // console.log(accessToken);

    // Create Lead in Odoo
    const lead = await createLead(accessToken, { 
      name: body.name, 
      country_code: body.country, 
      phone: body.phone, 
      email: body.email, 
      subject: "Website Message", 
      body: body.message, 
      project_id: null, 
      campaign_id: null, 
      medium: medium,
    });
    // console.log(lead);

    return Response.json({ message: "Successfully sent!", data: responseData }, { status: 200 });
  } catch (error) {
    
    console.error("Error submitting contact form:", error);
    return Response.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
