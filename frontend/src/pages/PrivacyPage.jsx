import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPage = () => {
  const { t, dir } = useI18n();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`} data-testid="privacy-page" dir={dir}>
      <div className="container mx-auto max-w-4xl px-4">
        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/80 backdrop-blur-lg border border-white/20'} rounded-xl shadow-xl p-8`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.title')}</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('privacy.lastUpdated')}</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section1.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('privacy.section1.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('privacy.section1.data.identification')}</li>
                <li>{t('privacy.section1.data.professional')}</li>
                <li>{t('privacy.section1.data.usage')}</li>
                <li>{t('privacy.section1.data.technical')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section2.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('privacy.section2.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('privacy.section2.uses.account')}</li>
                <li>{t('privacy.section2.uses.cards')}</li>
                <li>{t('privacy.section2.uses.contact')}</li>
                <li>{t('privacy.section2.uses.improve')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section3.title')}</h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {t('privacy.section3.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('privacy.section3.sharing.consent')}</li>
                <li>{t('privacy.section3.sharing.legal')}</li>
                <li>{t('privacy.section3.sharing.providers')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section4.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('privacy.section4.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('privacy.section4.security.encryption')}</li>
                <li>{t('privacy.section4.security.auth')}</li>
                <li>{t('privacy.section4.security.access')}</li>
                <li>{t('privacy.section4.security.backups')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section5.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('privacy.section5.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('privacy.section5.rights.access')}</li>
                <li>{t('privacy.section5.rights.rectification')}</li>
                <li>{t('privacy.section5.rights.erasure')}</li>
                <li>{t('privacy.section5.rights.portability')}</li>
                <li>{t('privacy.section5.rights.objection')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section6.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t('privacy.section6.content')}
              </p>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t('privacy.section6.cookies.session')}</li>
                <li>{t('privacy.section6.cookies.preferences')}</li>
                <li>{t('privacy.section6.cookies.analytics')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('privacy.section7.title')}</h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('privacy.section7.content')}
              </p>
              <div className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} p-4 rounded-lg`}>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>{t('privacy.section7.email')}:</strong> privacy@futuristcards.com<br />
                  <strong>{t('privacy.section7.address')}:</strong> {t('privacy.section7.addressValue')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
