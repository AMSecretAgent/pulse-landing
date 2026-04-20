const {onCall} = require("firebase-functions/v2/https");
const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendWaitlistEmail = onCall(async (request) => {
  const {email} = request.data;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Welcome to the Pulse Waitlist",
    html: `<div style="font-family:sans-serif;background:#03030e;
      color:#eef0ff;padding:40px;border-radius:12px">
      <h1>You are on the Pulse Waitlist!</h1>
      <p style="color:rgba(238,240,255,0.6);line-height:1.7">
        Thanks for joining. You will be first to access Pulse.
      </p>
    </div>`,
  });

  return {success: true};
});