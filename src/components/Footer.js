import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import SocialButton from './SocialButton';

export default function Footer() {
  return (
    <footer className="bg-[#070a10]/80 backdrop-blur-sm border-t border-zinc-800/50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 md:mb-0"
          >
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              Yoru<span className="text-purple-400">Akio</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1">© {new Date().getFullYear()} All rights reserved</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <SocialButton href="https://github.com/YoruAkio" icon={<FaGithub />} label="GitHub" />
            <SocialButton href="https://x.com/YoruAkio" icon={<FaTwitter />} label="Twitter" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}