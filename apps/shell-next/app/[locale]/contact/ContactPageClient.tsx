'use client';

import { useState } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

export default function ContactPageClient({ locale }: { locale: string }) {
    const isEn = locale === 'en';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        if (!formData.name.trim()) return false;
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
        if (!formData.message.trim() || formData.message.length < 10) return false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateForm()) {
            setStatus('error');
            setErrorMessage(isEn ? 'Please fill in all fields correctly.' : 'Lütfen tüm alanları doğru şekilde doldurun.');
            return;
        }

        setStatus('sending');

        try {
            const response = await fetch('https://formspree.io/f/mbddrydj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setErrorMessage(isEn ? 'Failed to send message. Please try again.' : 'Mesaj gönderilemedi. Lütfen tekrar deneyin.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="w-1 h-8 bg-accent rounded-full"></span>
                    <h1 className="text-text-primary">
                        {isEn ? 'Get in Touch' : 'İletişime Geç'}
                    </h1>
                </div>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                    {isEn
                        ? 'Feel free to reach out for collaborations, questions, or just to say hi!'
                        : 'İşbirliği, sorular veya sadece merhaba demek için bana ulaşabilirsiniz!'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Contact Methods */}
                <div className="lg:col-span-1 space-y-6">
                    <a
                        href="mailto:samet.yilmazcelik@gmail.com"
                        className="card-hover flex items-center gap-4 group"
                    >
                        <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                            <HiMail size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-text-primary">Email</h3>
                            <p className="text-sm text-text-secondary">samet.yilmazcelik@gmail.com</p>
                        </div>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/samet-yilmazcelik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-hover flex items-center gap-4 group"
                    >
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                            <SiLinkedin size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-text-primary">LinkedIn</h3>
                            <p className="text-sm text-text-secondary">samet-yilmazcelik</p>
                        </div>
                    </a>

                    <a
                        href="https://github.com/sametyilmazcelik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-hover flex items-center gap-4 group"
                    >
                        <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                            <SiGithub size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-text-primary">GitHub</h3>
                            <p className="text-sm text-text-secondary">sametyilmazcelik</p>
                        </div>
                    </a>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <h2 className="text-2xl font-bold text-text-primary mb-6">
                            {isEn ? 'Send a Message' : 'Mesaj Gönder'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                                    {isEn ? 'Name' : 'İsim'}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    maxLength={50}
                                    className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text-primary placeholder:text-text-muted"
                                    placeholder={isEn ? 'Your name' : 'Adınız'}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text-primary placeholder:text-text-muted"
                                    placeholder={isEn ? 'your@email.com' : 'email@adresiniz.com'}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                                    {isEn ? 'Message' : 'Mesaj'}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    minLength={10}
                                    maxLength={1000}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text-primary placeholder:text-text-muted resize-none"
                                    placeholder={isEn ? 'Your message...' : 'Mesajınız...'}
                                />
                                <div className="text-right text-xs text-text-muted mt-1">
                                    {formData.message.length}/1000
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg shadow-lg hover:shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' && (isEn ? 'Sending...' : 'Gönderiliyor...')}
                                {status === 'success' && (isEn ? 'Sent!' : 'Gönderildi!')}
                                {status === 'idle' && (isEn ? 'Send Message' : 'Mesaj Gönder')}
                                {status === 'error' && (isEn ? 'Try Again' : 'Tekrar Dene')}
                            </button>

                            {status === 'success' && (
                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
                                    {isEn ? 'Message sent successfully!' : 'Mesaj başarıyla gönderildi!'}
                                </div>
                            )}

                            {status === 'error' && errorMessage && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
