import { motion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import ContactForm from "@/components/ui/ContactForm"
import { DonationModule } from "@/components/ui/DonationModule"

export function CTA() {
  return (
    <Section id="support" className="bg-brand-green text-white">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
         <DonationModule />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  )
}
