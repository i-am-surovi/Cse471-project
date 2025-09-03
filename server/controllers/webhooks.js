import { Webhook } from "svix";
import User from "../models/User.js"; // Add .js extension for ES Modules

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the raw body for Svix
    await whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Parse JSON from raw body
    const { data, type } = JSON.parse(req.body.toString());

    switch (type) {
      case "user.created":
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        });
        return res.status(200).json({});
      case "user.updated":
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        });
        return res.status(200).json({});
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({});
      default:
        return res.status(200).json({});
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: "Webhooks error" });
  }
};
