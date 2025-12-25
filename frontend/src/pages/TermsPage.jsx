import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const TermsPage = () => {
  const { t, dir } = useI18n();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`} data-testid="terms-page" dir={dir}>
      <div className="container mx-auto max-w-4xl px-4">
        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/80 backdrop-blur-lg border border-white/20'} rounded-xl shadow-xl p-8`}>
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.title')}</h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('terms.subtitle')}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('terms.lastUpdated')}</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section1.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section1.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section2.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section2.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('terms.section2.features.create')}</li>
                <li>{t('terms.section2.features.share')}</li>
                <li>{t('terms.section2.features.manage')}</li>
                <li>{t('terms.section2.features.analyze')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section3.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section3.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('terms.section3.requirements.age')}</li>
                <li>{t('terms.section3.requirements.accurate')}</li>
                <li>{t('terms.section3.requirements.password')}</li>
                <li>{t('terms.section3.requirements.sharing')}</li>
                <li>{t('terms.section3.requirements.notify')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section4.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section4.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('terms.section4.prohibited.illegal')}</li>
                <li>{t('terms.section4.prohibited.content')}</li>
                <li>{t('terms.section4.prohibited.identity')}</li>
                <li>{t('terms.section4.prohibited.commercial')}</li>
                <li>{t('terms.section4.prohibited.security')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section5.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section5.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('terms.section5.rights.host')}</li>
                <li>{t('terms.section5.rights.share')}</li>
                <li>{t('terms.section5.rights.backup')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section6.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section6.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('terms.section6.limitations.data')}</li>
                <li>{t('terms.section6.limitations.damages')}</li>
                <li>{t('terms.section6.limitations.userContent')}</li>
                <li>{t('terms.section6.limitations.technical')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section7.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section7.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section8.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('terms.section8.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('terms.section9.title')}</h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('terms.section9.content')}
              </p>
              <div className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} p-4 rounded-lg`}>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>{t('terms.section9.email')}:</strong> legal@futuristcards.com<br />
                  <strong>{t('terms.section9.address')}:</strong> {t('terms.section9.addressValue')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
