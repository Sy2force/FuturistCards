import { motion } from 'framer-motion';

const SkipLink = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                 bg-blue-600 text-white px-4 py-2 rounded-md font-medium
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      initial={{ opacity: 0, y: -10 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      Aller au contenu principal
    </motion.a>
  );
};

export default SkipLink;
