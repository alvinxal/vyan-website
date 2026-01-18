import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, groupSize } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you can integrate with:
    // 1. Email service (Resend, SendGrid, Nodemailer)
    // 2. Database (Supabase, MongoDB, PostgreSQL)
    // 3. CRM (HubSpot, Salesforce)
    // 4. Notification service (Slack, Discord)

    // For now, we'll log the data and simulate success
    console.log('📧 New Inquiry Received:', {
      name,
      email,
      phone,
      date,
      groupSize,
      timestamp: new Date().toISOString()
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Uncomment and configure when ready to send emails
    /*
    // Example with Resend (npm install resend)
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'inquiries@vyan-abimanyu.com',
      to: 'abimanyu@gmail.com',
      subject: `New Tour Inquiry from ${name}`,
      html: `
        <h2>New Tour Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Expected Date:</strong> ${date}</p>
        <p><strong>Group Size:</strong> ${groupSize}</p>
      `
    });
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully',
        data: { name, email }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
