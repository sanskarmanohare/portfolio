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
    headers: { Accept: "application/json" },
    body: form,
  });
  if (!response.ok) throw new Error("Email service rejected the request.");
  return { configured: true as const };
}
