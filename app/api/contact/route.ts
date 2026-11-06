import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, pricePreference, budget, token } = await req.json();

    // 1. Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Cloudflare Turnstile Verification (Optional, if secret key is present)
    const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    if (turnstileSecret && token) {
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(token)}`,
      });
      const verifyResult = await response.json();
      if (!verifyResult.success) {
        return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 400 });
      }
    }

    // 3. Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Email service configuration missing' }, { status: 500 });
    }
    const resend = new Resend(resendApiKey);

    // 4. Construct Email details
    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'chirag.rawat1000@gmail.com';
    const budgetLabel = pricePreference === 'budget' ? budget : 'Estimate / Suggest Price';

    // 5. Send Notification Email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // Default sender for free plans
      to: recipient,
      subject: `New Project Inquiry from ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Project Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAFAFA; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); border-collapse: collapse;">
                  
                  <!-- Green Header Accent Bar -->
                  <tr>
                    <td height="4" style="background-color: #0ACF83; font-size: 1px; line-height: 1px;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td style="padding: 40px;">
                      <!-- Header -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                        <tr>
                          <td>
                            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #0ACF83; margin-bottom: 8px; font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;">
                              Portfolio Inquiry
                            </div>
                            <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #111827; letter-spacing: -0.02em;">
                              New Project Proposal
                            </h1>
                          </td>
                        </tr>
                      </table>

                      <!-- Inquiry Summary / Details Card -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 12px; margin-bottom: 30px; border-collapse: separate;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="30%" valign="top" style="padding-bottom: 12px; font-size: 13px; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Client Name</td>
                                <td width="70%" valign="top" style="padding-bottom: 12px; font-size: 15px; font-weight: 700; color: #111827;">${name}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding-bottom: 12px; font-size: 13px; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                                <td valign="top" style="padding-bottom: 12px; font-size: 15px; font-weight: 500; color: #111827;">
                                  <a href="mailto:${email}" style="color: #111827; text-decoration: none; font-weight: 600;">${email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td valign="top" style="font-size: 13px; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Budget Info</td>
                                <td valign="top" style="font-size: 15px; font-weight: 600; color: #111827;">${budgetLabel}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Project Objectives & Details -->
                      <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #4B5563;">
                        Project Details &amp; Objectives
                      </h3>
                      <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; padding: 24px; margin-bottom: 30px; border-radius: 12px; text-align: left;">
                        <div style="margin: 0; font-size: 15px; line-height: 1.8; color: #1F2937; white-space: pre-wrap;">${message.trim()}</div>
                      </div>

                      <!-- Quick Reply Action Button -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: Your Project Inquiry - Chirag Portfolio" style="display: inline-block; background-color: #111827; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 9999px; box-shadow: 0 4px 12px rgba(17, 24, 39, 0.15); transition: background-color 0.2s ease;">
                              Reply Directly
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; text-align: center;">
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #9CA3AF;">
                        This email was sent automatically from your portfolio website contact portal.
                      </p>
                      <p style="margin: 0; font-size: 11px; font-weight: 600; color: #6B5EE4; letter-spacing: 0.05em; text-transform: uppercase;">
                        Designed &amp; Built by Chirag
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email notification' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
