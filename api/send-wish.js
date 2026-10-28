export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wish } = req.body || {};
  if (!wish) {
    return res.status(400).json({ error: 'Wish is required' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const email = process.env.MY_EMAIL || 'khaledmossad221@gmail.com';

  if (!apiKey) {
    return res.status(500).json({ error: 'BREVO_API_KEY is not configured' });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border-radius: 16px; background: #17172B; color: #FFF5F0; border: 2px solid #F8D98D;">
      <h2 style="color: #F8D98D; text-align: center; margin-bottom: 5px;">🌟 أمنية زوبا السرية لعيد ميلادها 🎂</h2>
      <p style="text-align: center; color: #B9A4E8; font-size: 14px; margin-top: 0;">كتبت زوبا هذه الأمنية للتو وأرسلتها مع الشهاب السحري إلى النجوم ✨</p>
      <div style="margin: 25px 0; padding: 20px; background: rgba(248, 217, 141, 0.1); border-left: 4px solid #F8D98D; border-radius: 8px;">
        <p style="font-size: 18px; font-style: italic; color: #FFF5F0; margin: 0; line-height: 1.6;">“${wish}”</p>
      </div>
      <div style="text-align: center; border-top: 1px solid rgba(185, 164, 232, 0.3); padding-top: 15px; font-size: 12px; color: #C5BFD8;">
        تاريخ وتوقيت الأمنية: ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}<br/>
        Happy Birthday Zoba 💗
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: "Zoba Birthday Star 🌠",
          email: email,
        },
        to: [
          {
            email: email,
            name: "Khaled Mossad",
          },
        ],
        subject: "✨ أمنية زوبا السرية لعيد ميلادها 🎂",
        htmlContent,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Brevo API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
