import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initializing Resend master gateway with your validated token key
const resend = new Resend('re_XPXiJAcZ_PprALZrLrZ4JvfCsfGhQLSTJ');

export async function POST(request: Request) {
  try {
    // Secure extraction flow of data multipart streams
    const data = await request.formData();
    
    const firstName = (data.get('firstName') as string) || '';
    const lastName = (data.get('lastName') as string) || '';
    const email = (data.get('email') as string) || '';
    const countryName = (data.get('countryName') as string) || 'India';
    const countryCode = (data.get('countryCode') as string) || '+91';
    const phone = (data.get('phone') as string) || '';
    const message = (data.get('message') as string) || '';

    // File arrays binary formatting setup
    const attachments: any[] = [];
    const files = data.getAll('attachments');
    
    for (const fileValue of files) {
      if (fileValue instanceof File && fileValue.name) {
        const buffer = Buffer.from(await fileValue.arrayBuffer());
        attachments.push({
          filename: fileValue.name,
          content: buffer,
        });
      }
    }

    // 📡 MAIL VECTOR 1: Pure raw detailed user payload data log routed to your personal inbox
    await resend.emails.send({
      from: 'Portfolio Matrix <onboarding@resend.dev>',
      to: 'manishrajdoot.1@gmail.com',
      subject: `📡 SYSTEM INCOMING NODE: ${firstName} ${lastName}`,
      html: `
        <div style="background:#020208; color:#b4b4b4; padding:35px; font-family:monospace; border:1px solid #00ff66; border-radius:12px; max-width:650px; margin:0 auto;">
          <h2 style="color:#00ff66; border-bottom:1px solid #1e293b; padding-bottom:12px; margin-top:0; letter-spacing:1px;">// SECURE PORTAL CAPTURE DATALOG</h2>
          
          <table style="width:100%; font-family:monospace; color:#b4b4b4; margin-bottom:20px;">
            <tr>
              <td style="padding:6px 0; color:#64748b; width:140px;">SENDER NAME:</td>
              <td style="padding:6px 0; color:#fff; font-weight:bold;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#64748b;">SOURCE EMAIL:</td>
              <td style="padding:6px 0; color:#00ff66;">${email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#64748b;">ROUTING VECTOR:</td>
              <td style="padding:6px 0; color:#00ff66;">${countryName} (${countryCode}) ${phone}</td>
            </tr>
          </table>

          <div style="background:#090915; padding:20px; border-left:4px solid #00ff66; color:#fff; border-radius:6px; margin-top:10px; box-shadow:inset 0 0 15px rgba(0,0,0,0.6);">
            <span style="color:#64748b; font-size:10px; display:block; margin-bottom:8px; font-weight:bold;">[ CONTEXT DATA STREAM BUFFER ]</span>
            <p style="margin:0; line-height:1.6; white-space:pre-wrap; font-size:13px;">${message}</p>
          </div>
          
          <div style="margin-top:25px; font-size:9px; color:#475569; border-top:1px solid #1e293b; padding-top:12px; text-align:right;">
            Quantum Synchronization Node Handshake Active // 2026
          </div>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    // ⚡ MAIL VECTOR 2: Dynamic confirmation with maximum cinematic futuristic hawa-baaji sent back to your mail (Sandbox compatibility)
    await resend.emails.send({
      from: 'Manish Rajdoot <onboarding@resend.dev>',
      to: 'manishrajdoot.1@gmail.com', 
      subject: `⚡ HANDSHAKE SIGNATURE: Secure Payload Uplink Complete (Copy for User: ${email})`,
      html: `
        <div style="background:#03030c; color:#b4b4b4; padding:40px; font-family:monospace; max-width:600px; margin:0 auto; border:1px solid #00ff66; border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
          
          <div style="text-align:center; margin-bottom:25px;">
            <span style="font-size:26px; font-weight:black; letter-spacing:-1px; color:#fff; background:linear-gradient(to right, #00ff66, #14b8a6); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">MANISH RAJDOOT</span>
            <p style="font-size:9px; color:#64748b; letter-spacing:3px; margin-top:6px; text-transform:uppercase; font-weight:bold;">Data Scientist | Programmer Architect // Cognitive Labs</p>
          </div>
          
          <hr style="border:0; border-top:1px solid #1e293b; margin:20px 0;"/>
          
          <p style="line-height:1.6; color:#e2e8f0; font-size:13px;">Greetings Human Vector,</p>
          <p style="line-height:1.7; font-size:13px;">Your encrypted communication packet has successfully penetrated my matrix defensive array protocols and landed safely inside my localized workspace terminal dashboard index.</p>
          
          <div style="background:#070714; border:1px solid rgba(0,255,102,0.15); padding:15px; border-radius:8px; margin:20px 0; font-size:12px;">
            <span style="color:#64748b; font-size:9px; display:block; margin-bottom:4px;">// CRYPTOGRAPHIC RUNTIME METRICS</span>
            <div style="color:#00ff66;"><b>Handshake Routing:</b> established_ok_2026</div>
            <div style="color:#00ff66; margin-top:2px;"><b>Binary Buffers Status:</b> staged_and_attached</div>
            <div style="color:#eab308; margin-top:2px;"><b>Target Client Copy:</b> ${email}</div>
          </div>

          <p style="line-height:1.7; font-size:13px;">I am currently initializing custom analytical passes over the text parameters and source binaries you transmitted. A cognitive feedback response tracking wave will be dispatched straight to your matrix coordinate within minimal processing execution cycles.</p>
          
          <div style="background:#090915; padding:20px; border-radius:10px; border:1px solid #1e293b; margin-top:30px; text-align:center; box-shadow:0 0 15px rgba(0,255,102,0.03);">
            <p style="margin:0; font-size:11px; color:#00ff66; font-weight:bold; letter-spacing:1px;">📡 ACTIVE SYSTEM CORE STATE: FULL OPERATIONAL ONLINE</p>
            <p style="margin:6px 0 0 0; font-size:9px; color:#475569;">Secure Quantum Enclave Processing Engine Synchronized.</p>
          </div>
          
          <p style="font-size:9px; color:#475569; text-align:center; margin-top:35px; border-top:1px solid #1e293b; padding-top:15px;">
            This is an automated network protocol signature receipt log logfile node. Do not respond to this vector directly.
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend API Crash Trace Log:", error);
    return NextResponse.json({ success: false, error: error.message || 'Pipeline crash' }, { status: 500 });
  }
}