import { base } from "framer-motion/client";

function base64(str) {
  return Buffer.from(str).toString('base64');
}

export async function POST(req) {
  try {
    const order = await req.json();

    const fabmisrConfigReq = await fetch(`${process.env.API_URL}/fabmisr-gateway`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_FABMISR}`,
      }
    });
    const fabmisrConfig = (await fabmisrConfigReq.json()).data;
    const _body = JSON.stringify(
        {
          "apiOperation": "INITIATE_CHECKOUT",
          "interaction":{
            "operation" :"PURCHASE",
            "merchant": {
              // "id": fabmisrConfig.MerchantID,
              "name": fabmisrConfig.MerchantName,
              // "url": "https://marginsdevelopments.com"
            },
            "returnUrl": "https://marginsdevelopments.com/postpay"
          },
          "order": order,
        }
      );
    
    console.log(fabmisrConfig);
    console.log(base64("merchant." + fabmisrConfig.MerchantID + ":" + fabmisrConfig.Key1));
    console.log(`URL: https://ap-gateway.mastercard.com/api/rest/version/100/merchant/${fabmisrConfig.MerchantID}/session`);
    console.log(_body);

    // const response = await fetch(`https://ap-gateway.mastercard.com/api/rest/version/100/merchant/${fabmisrConfig.MerchantID}/session`, {
    const response = await fetch(`https://fabmisr.gateway.mastercard.com/api/rest/version/100/merchant/${fabmisrConfig.MerchantID}/session`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64("merchant." + fabmisrConfig.MerchantID + ":" + fabmisrConfig.Key1)}`,
      },
      body: _body,
    });

    const responseData = await response.json();

    console.log("Response from payment gateway:", responseData);

    if (!response.ok) {
      return Response.json({ message: "Failed to initiate payment session", error: responseData }, { status: response.status });
    }

    return Response.json({ message: "Successfully initiated session!", data: responseData }, { status: 200 });
  } catch (error) {
    console.error("Error initiating session:", error);
    return Response.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
