import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { DISPLAY_PHONE, WHATSAPP_NUMBER, getWhatsAppDirectUrl } from '../utils/whatsapp';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Footwear Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setSubmitted(true);
    toast.success('Inquiry submitted! (Frontend Demo Preview)', {
      icon: '📬',
      style: {
        background: '#111111',
        color: '#F7F3EB',
        border: '1px solid #C8A45D',
      },
    });
  };

  const directWhatsAppInquiryUrl = getWhatsAppDirectUrl(
    formData.message.trim()
      ? `Hello JAN BALOCH SHOES STORE!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
      : 'Hello JAN BALOCH SHOES STORE! I have a question regarding your footwear collection and sizes.'
  );

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-surface border-b border-brand-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
            Customer Assistance & Direct Orders
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark mt-2">
            Contact JAN BALOCH SHOES STORE
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto mt-2 font-light">
            We are readily available on WhatsApp for direct orders, custom Peshawari sizing, and leather inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Direct WhatsApp & Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                Connect Directly With Our Shoemakers
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light">
                At JAN BALOCH SHOES STORE, we believe in personal service. Reach out directly on WhatsApp to speak with our footwear specialists regarding sizing, customized finishes, or order tracking.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-8 rounded-sm bg-brand-dark text-brand-cream border border-brand-gold/30 shadow-lg space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                    Primary Contact Channel
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Direct WhatsApp Support
                  </h3>
                </div>
              </div>

              <div className="py-2 border-y border-white/10">
                <p className="text-xs text-brand-cream/70 mb-1">WhatsApp & Call Line:</p>
                <p className="font-serif text-2xl font-bold text-brand-gold tracking-wide">
                  {DISPLAY_PHONE}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white rounded-sm font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>

                <p className="text-[11px] text-center text-brand-cream/60">
                  Quickest response for order placement & size confirmations
                </p>
              </div>
            </div>

            {/* Customer Assurance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border border-brand-border rounded-sm bg-brand-surface">
                <div className="w-8 h-8 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-brand-dark mb-1">
                  Cash on Delivery
                </h4>
                <p className="text-xs text-brand-muted font-light">
                  Pay securely upon receiving your footwear parcel anywhere in Pakistan.
                </p>
              </div>

              <div className="p-5 border border-brand-border rounded-sm bg-brand-surface">
                <div className="w-8 h-8 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-3">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-brand-dark mb-1">
                  Fit & Sizing Help
                </h4>
                <p className="text-xs text-brand-muted font-light">
                  Unsure of your EU size? Share foot measurements on WhatsApp for guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Frontend-only Contact Form */}
          <div className="p-8 rounded-sm bg-brand-surface border border-brand-border shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs text-brand-muted font-light mb-6">
              Complete the form below to draft your inquiry or click below to launch straight into WhatsApp.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  Inquiry Received (Demo Preview)
                </h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto font-light">
                  This website is a frontend-only catalog. For real-time ordering and immediate answers, please click the button below to message us directly on WhatsApp.
                </p>
                <div className="pt-4">
                  <a
                    href={directWhatsAppInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#20ba59] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                    <span>Send Message via WhatsApp</span>
                  </a>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="block mx-auto text-xs text-brand-muted hover:text-brand-dark mt-4 underline"
                >
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Asad Malik"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-gold text-brand-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-gold text-brand-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark mb-1.5">
                    Subject / Footwear Interest
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-gold text-brand-dark cursor-pointer"
                  >
                    <option value="General Footwear Inquiry">General Footwear Inquiry</option>
                    <option value="Men's Shoes & Loafers">Men's Shoes & Loafers</option>
                    <option value="Formal Leather Shoes">Formal Leather Shoes</option>
                    <option value="Casual Sneakers">Casual Sneakers</option>
                    <option value="Peshawari Chappals">Peshawari Chappals</option>
                    <option value="Leather Sandals">Leather Sandals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark mb-1.5">
                    Message / Size Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what style or size you are looking for..."
                    className="w-full px-4 py-2.5 text-xs bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-gold text-brand-dark resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white rounded-sm font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow"
                  >
                    <Send className="w-4 h-4 text-brand-gold" />
                    <span>Submit Demo Inquiry</span>
                  </button>

                  <a
                    href={directWhatsAppInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-sm font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-brand-muted/70 text-center pt-2">
                  Demo submission. For instant order confirmations, use WhatsApp directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
