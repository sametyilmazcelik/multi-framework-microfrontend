'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactState {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
}

export async function sendEmailAction(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!name || name.length < 2) {
        return { success: false, message: 'Invalid name' };
    }
    if (!email || !email.includes('@')) {
        return { success: false, message: 'Invalid email' };
    }
    if (!message || message.length < 10) {
        return { success: false, message: 'Message too short' };
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
            to: ['samet.yilmazcelik@gmail.com'],
            subject: `New Message from ${name}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return { success: false, message: 'Failed to send email' };
        }

        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Server Action Error:', error);
        return { success: false, message: 'Internal server error' };
    }
}
