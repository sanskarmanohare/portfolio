export type ContactPayload = { name: string; email: string; project: string; message: string };

export async function sendContactEmail(payload: ContactPayload) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return { configured: false as const };

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: { from_name: payload.name, reply_to: payload.email, project_type: payload.project, message: payload.message },
    }),
  });
  if (!response.ok) throw new Error("Email service rejected the request.");
  return { configured: true as const };
}
