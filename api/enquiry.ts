export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, loanType, loanAmount, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const ticketId = `BFS-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[VERCEL ENQUIRY] Ticket: ${ticketId} | Name: ${name} | Email: ${email} | Phone: ${phone || 'N/A'} | Service: ${loanType || 'General'}`);

  return res.status(200).json({
    success: true,
    ticketId,
    message: 'Thank you for reaching out to Blueprint Financial Services. Karina Bridges or our senior credit team will review your details and contact you within business hours.',
  });
}
