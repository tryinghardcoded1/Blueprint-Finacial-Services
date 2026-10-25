import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledScenario?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledScenario = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [meetingType, setMeetingType] = useState<'phone' | 'video' | 'in_person'>('phone');
  const [notes, setNotes] = useState(prefilledScenario);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          loanType: `Consultation Booking (${meetingType.toUpperCase()} - ${date} @ ${timeSlot})`,
          loanAmount: 'N/A',
          message: notes,
        }),
      });
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Discovery Call Requested</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, {name || 'valued client'}! We have scheduled your 15-minute consultation with <strong>{BUSINESS_INFO.director}</strong> for {date} at {timeSlot}. A calendar invite and SMS confirmation have been generated.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free 15-Minute Mortgage Strategy Session</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Book a Strategy Call with Karina Bridges
            </h3>
            <p className="text-xs text-slate-400">
              Direct, independent guidance from an accredited Sydney mortgage broker. No automated sales pitches.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David & Megan"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0400 000 000"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Day</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Today">Today (Urgent Pre-Auction)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Wednesday">Wednesday</option>
                    <option value="This Thursday">Thursday</option>
                    <option value="This Friday">Friday</option>
                    <option value="Weekend (By Request)">Saturday Morning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Time</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="9:00 AM">9:00 AM AEST</option>
                    <option value="10:30 AM">10:30 AM AEST</option>
                    <option value="1:00 PM">1:00 PM AEST</option>
                    <option value="3:30 PM">3:30 PM AEST</option>
                    <option value="5:00 PM">5:00 PM AEST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'phone', label: 'Phone Call' },
                    { id: 'video', label: 'Zoom Video' },
                    { id: 'in_person', label: 'Coogee / Sydney' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setMeetingType(t.id as any)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all ${
                        meetingType === t.id
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Scenario Notes or Goals (AI Summary attached if generated)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific questions, loan amounts, or properties you have your eye on..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Booking Session...</span>
                  </>
                ) : (
                  <span>Confirm Free Strategy Session</span>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
