export type ContactPayload = { name: string; email: string; message: string };

export async function sendContactEmail(payload: ContactPayload) {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("email", payload.email);
  form.append("message", payload.message);
  form.append("_subject", `New portfolio message from ${payload.name}`);
  form.append("_template", "table");

  const response = await fetch("https://formsubmit.co/ajax/sanskarmanohare855@gmail.com", {
    method: "POST",
    mode: "no-cors",
    body: form,
  });
  // FormSubmit can deliver the email while its cross-origin response remains
  // unreadable to the browser. An opaque response therefore means the request
  // was handed off successfully; only a readable error response should fail.
  if (response.type !== "opaque" && !response.ok) throw new Error("Email service rejected the request.");
  return { configured: true as const };
}
