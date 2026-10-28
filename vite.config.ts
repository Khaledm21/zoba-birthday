import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

function brevoDevPlugin(): Plugin {
  return {
    name: 'brevo-wish-api',
    configureServer(server) {
      server.middlewares.use('/api/send-wish', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { wish } = JSON.parse(body || '{}');
              const env = loadEnv('', process.cwd(), '');
              const apiKey = env.BREVO_API_KEY || env.VITE_BREVO_API_KEY;
              const email = env.MY_EMAIL || 'khaledmossad221@gmail.com';

              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Brevo API key not found in env' }));
                return;
              }

              const https = await import('node:https');
              const postData = JSON.stringify({
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
                htmlContent: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border-radius: 16px; background: #17172B; color: #FFF5F0; border: 2px solid #F8D98D;">
                    <h2 style="color: #F8D98D; text-align: center; margin-bottom: 5px;">🌟 أمنية زوبا السرية لعيد ميلادها 🎂</h2>
                    <p style="text-align: center; color: #B9A4E8; font-size: 14px; margin-top: 0;">كتبت زوبا هذه الأمنية للتو وأرسلتها مع الشهاب السحري إلى النجوم ✨</p>
                    <div style="margin: 25px 0; padding: 20px; background: rgba(248, 217, 141, 0.1); border-left: 4px solid #F8D98D; border-radius: 8px;">
                      <p style="font-size: 18px; font-style: italic; color: #FFF5F0; margin: 0; line-height: 1.6;">“${wish}”</p>
                    </div>
                    <div style="text-align: center; border-top: 1px solid rgba(185, 164, 232, 0.3); padding-top: 15px; font-size: 12px; color: #C5BFD8;">
                      تاريخ وتوقيت الأمنية: ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}<br/>
                      Happy Birthday Zoba • 2026 💗
                    </div>
                  </div>
                `,
              });

              const options = {
                hostname: 'api.brevo.com',
                path: '/v3/smtp/email',
                method: 'POST',
                headers: {
                  'accept': 'application/json',
                  'api-key': apiKey,
                  'content-type': 'application/json',
                  'Content-Length': Buffer.byteLength(postData),
                },
              };

              const brevoReq = https.request(options, (brevoRes) => {
                let data = '';
                brevoRes.on('data', chunk => data += chunk);
                brevoRes.on('end', () => {
                  res.writeHead(brevoRes.statusCode || 200, { 'Content-Type': 'application/json' });
                  res.end(data || JSON.stringify({ success: true }));
                });
              });

              brevoReq.on('error', (err) => {
                console.error('Brevo error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              });

              brevoReq.write(postData);
              brevoReq.end();
            } catch {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid payload' }));
            }
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    brevoDevPlugin(),
  ],
  server: {
    host: true, // Expose to local network (Wi-Fi)
    port: 5173,
  },
})
