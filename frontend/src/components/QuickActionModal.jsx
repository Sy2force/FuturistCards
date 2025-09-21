import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const QuickActionModal = ({ isOpen, onClose, title, description, route, icon: Icon }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const handleGo = () => {
    onClose();
    setTimeout(() => {
      navigate(route);
    }, 200);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl glass border border-white/20 p-6 text-left align-middle shadow-2xl transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className="p-2 rounded-xl bg-primary-500/20 border border-primary-400/30">
                          <Icon className="w-6 h-6 text-primary-400" />
                        </div>
                      )}
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold text-white leading-6"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-medium transition-all border border-white/20"
                    >
                      {t('common.cancel')}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGo}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium transition-all shadow-lg hover:shadow-primary-500/25 flex items-center gap-2"
                    >
                      {t('common.goToPage')}
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuickActionModal;
