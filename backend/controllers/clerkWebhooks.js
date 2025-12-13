import { Webhook } from "svix";
import User from "../models/User.js";
const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    // !Verify Headers
    await whook.verify(JSON.stringify(req.body), headers);
    // !Get Data From Request
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
  email: data.email_addresses?.[0]?.email_address || "",
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // switch (type) {
    //   case "user.created": {
    //
    //   }
    // }

    if (type === "user.created") {
      await User.create(userData);
    } else if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData);
    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    } else {
      console.log("non-of three if else in webhook ");
    }
    res.json({ success: true, message: "webhook Received" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
