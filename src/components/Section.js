import { motion } from 'framer-motion';

export default function Section({ children, id, className = '' }) {
  return (
    <section id={id} className={`mb-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}