import { useLanguage } from '../../context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-muted/30 p-1 text-sm font-semibold">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`rounded-full px-3 py-1 transition-colors ${
          language === 'en' ? 'bg-teal text-bg' : 'text-muted hover:text-cream'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('to')}
        aria-pressed={language === 'to'}
        className={`rounded-full px-3 py-1 transition-colors ${
          language === 'to' ? 'bg-teal text-bg' : 'text-muted hover:text-cream'
        }`}
      >
        TO
      </button>
    </div>
  );
}
