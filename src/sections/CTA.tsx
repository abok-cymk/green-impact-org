import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Heart, Mail } from 'lucide-react';
// import { useForm, ValidationError } from '@formspree/react'; // Uncomment when ready to connect

export function CTA() {
  // const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID");

  return (
    <Section id="support" className="bg-brand-green text-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Support Our Mission
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Every contribution helps us expand climate education, establish more forest gardens, and equip young people to lead sustainable change in their communities.
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>Funding Progress</span>
              <span>0% / 100%</span> {/* Update this dynamically later */}
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-brand-gold h-3 rounded-full w-0 transition-all duration-1000"></div> {/* Update width % */}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="mailto:ambrose@greenimpactinnovators.works" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-brand-green hover:bg-brand-gold hover:text-slate-900 transition-colors">
              <Mail className="h-5 w-5" />
              Partner With Us
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 text-slate-900"
        >
          <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" id="name" name="name" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" id="email" name="email" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" required></textarea>
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-base font-medium text-white hover:bg-brand-lime transition-colors">
              <Heart className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
