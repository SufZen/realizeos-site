import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Globe, Wrench, BarChart3, Inbox, Brain, Bot, Plug, ShieldCheck,
  Smartphone, Check, ArrowLeft, Home as HomeIcon, KeyRound, Briefcase, Sprout,
  TrendingUp, Layers, CalendarDays, Clock, MapPin,
} from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Founder } from '@/components/sections/Founder';
import { HeroAgentNetwork } from '@/components/illustrations';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* ============================================================================
 * Bootcamp landing page — /bootcamp
 * Built on the shared @realizeos/design-system tokens + site primitives.
 * Hebrew-first (RTL). All copy goes through t('key', 'he-fallback') so it
 * renders correctly even before locale JSON is populated.
 * ========================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ---- small presentational helpers ---------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-brand-yellow">
      <span className="inline-block h-2 w-2 rounded-full bg-success" />
      {children}
    </div>
  );
}

function InfoCard({
  icon, title, body,
}: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand-yellow/25">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[var(--rz-accent-soft)] text-brand-yellow">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/* ---- page ----------------------------------------------------------------- */

export default function Bootcamp() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  // TidyCal booking pages (created via the TidyCal API).
  const CTA_HREF = 'https://tidycal.com/realization/bootcamp'; // full 3-session program (€399)
  const SINGLE_HREF = 'https://tidycal.com/realization/bootcamp-session'; // single session (€150)
  const [openFaq] = useState<number | null>(null);
  void openFaq;

  // Persistent floating CTA — appears after the user scrolls past the hero,
  // and hides again near the bottom so it doesn't duplicate the final CTA.
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 460;
      setShowSticky(y > 600 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // SEO: no head-management library in the repo, so set title/description here
  // and restore them on unmount so other SPA routes are unaffected.
  useEffect(() => {
    const seoTitle = t('bootcamp.seo.title', 'RealizeOS Bootcamp · סדנת AI לקהילה הישראלית בפורטוגל');
    const seoDesc = t('bootcamp.seo.desc', 'שלושה מפגשי בוקר לבניית מערכת AI חיה ומותאמת לעסק שלך — לקהילה הישראלית בסטובל ובמרכז פורטוגל. יוצאים עם RealizeOS פעיל וביכולת לתחזק אותו לבד.');

    const prevTitle = document.title;
    document.title = seoTitle;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const prevDesc = meta.getAttribute('content');
    meta.setAttribute('content', seoDesc);

    return () => {
      document.title = prevTitle;
      if (createdMeta) {
        meta?.remove();
      } else if (prevDesc !== null) {
        meta?.setAttribute('content', prevDesc);
      }
    };
  }, [t]);

  const pains = [
    { icon: <Globe size={24} />, title: t('bootcamp.pain.1.t', 'לענות ללקוחות בפורטוגזית'), body: t('bootcamp.pain.1.b', 'כל פנייה דורשת תרגום, ניסוח ותשומת לב — שוב ושוב.') },
    { icon: <Wrench size={24} />, title: t('bootcamp.pain.2.t', 'לתאם נותני שירות'), body: t('bootcamp.pain.2.b', 'תיאומים, אישורים ומעקבים שאוכלים את היום.') },
    { icon: <BarChart3 size={24} />, title: t('bootcamp.pain.3.t', 'להכין הצעות ומחירונים'), body: t('bootcamp.pain.3.b', 'עבודה ידנית חוזרת שאפשר להאציל למערכת.') },
    { icon: <Inbox size={24} />, title: t('bootcamp.pain.4.t', 'לעקוב אחרי לידים ופניות'), body: t('bootcamp.pain.4.b', 'דברים נופלים בין הכיסאות כשאתה לבד על הכל.') },
  ];

  const caps = [
    { icon: <Brain size={22} />, title: t('bootcamp.cap.1.t', 'FABRIC — מערכת ידע'), body: t('bootcamp.cap.1.b', 'כל הידע של העסק מאורגן בשש שכבות: זהות, סוכנים, ידע, תהליכים, תובנות ותוצרים.') },
    { icon: <Bot size={22} />, title: t('bootcamp.cap.2.t', 'ניתוב חכם בין מודלים'), body: t('bootcamp.cap.2.b', 'כל משימה מנותבת אוטומטית למודל האופטימלי — Claude, Gemini, או מודל מקומי.') },
    { icon: <Plug size={22} />, title: t('bootcamp.cap.3.t', 'שרת MCP מובנה'), body: t('bootcamp.cap.3.b', 'מתחבר ל-Gmail, Calendar, Drive, Stripe, חיפוש, וכל כלי תואם-MCP.') },
    { icon: <ShieldCheck size={22} />, title: t('bootcamp.cap.4.t', 'ממשל ובקרה'), body: t('bootcamp.cap.4.b', 'אישורים אנושיים לפעולות קריטיות, לוג ביקורת מלא, והגנה מפני prompt injection.') },
  ];

  const diffs = [
    { icon: <Wrench size={24} />, title: t('bootcamp.diff.1.t', 'מערכת, לא תיאוריה'), body: t('bootcamp.diff.1.b', 'בכל מפגש אתה בונה רכיב אמיתי שעובד. בסוף — RealizeOS פעיל, מחובר לעסק שלך, ומוכן לעבודה.') },
    { icon: <Globe size={24} />, title: t('bootcamp.diff.2.t', 'בעברית, להקשר שלך'), body: t('bootcamp.diff.2.b', 'לקוחות דוברי פורטוגזית, חשבוניות מקומיות, AL, נדל"ן — דוגמאות מהמציאות שלך פה.') },
    { icon: <KeyRound size={24} />, title: t('bootcamp.diff.3.t', 'הבעלות אצלך — לתמיד'), body: t('bootcamp.diff.3.b', 'local-first, בלי טלמטריה. אתה הבעלים של ה-Heart: הידע, הזהות והלוג. בלי תלות.') },
    { icon: <Sparkles size={24} />, title: t('bootcamp.diff.4.t', 'קהילה שממשיכה'), body: t('bootcamp.diff.4.b', 'אחרי הסדנה — ערוץ קהילתי פעיל לעזרה הדדית והמשך פיתוח.') },
  ];

  const layers = [
    { n: '1', t: t('bootcamp.layer.1.t', 'הקשר'), b: t('bootcamp.layer.1.b', 'מי אתה, מה העסק, באילו שפות') },
    { n: '2', t: t('bootcamp.layer.2.t', 'דאטה'), b: t('bootcamp.layer.2.b', 'המסמכים, המחירונים והידע שלך') },
    { n: '3', t: t('bootcamp.layer.3.t', 'אינטליגנציה'), b: t('bootcamp.layer.3.b', 'המנוע שמבין ועונה נכון') },
    { n: '4', t: t('bootcamp.layer.4.t', 'סוכנים'), b: t('bootcamp.layer.4.b', 'Maria · Antonio · Bruno') },
    { n: '5', t: t('bootcamp.layer.5.t', 'אוטומציות'), b: t('bootcamp.layer.5.b', 'המערכת רצה לבד, 24/7') },
  ];

  const evenings = [
    {
      num: '01',
      when: t('bootcamp.ev.1.when', 'מפגש ראשון · 17 ביוני · 10:00–13:00'),
      title: t('bootcamp.ev.1.title', 'היסודות וההקמה'),
      items: [
        t('bootcamp.ev.1.i1', 'מתודולוגיית 5 השכבות בשפה פשוטה'),
        t('bootcamp.ev.1.i2', 'הקמת חשבון RealizeOS אישי והגדרת ההקשר של העסק'),
        t('bootcamp.ev.1.i3', 'בחירת והגדרת הסוכן הראשון — Maria / Antonio / Bruno'),
        t('bootcamp.ev.1.i4', 'חיבור בוט טלגרם אישי — והשאלה האמיתית הראשונה'),
      ],
      out: t('bootcamp.ev.1.out', 'חשבון פעיל · סוכן ראשון · בוט טלגרם מחובר'),
    },
    {
      num: '02',
      when: t('bootcamp.ev.2.when', 'מפגש שני · 18 ביוני · 10:00–13:00'),
      title: t('bootcamp.ev.2.title', 'ההתאמה לעסק'),
      items: [
        t('bootcamp.ev.2.i1', 'חיבור הדאטה האמיתי — מסמכים, מחירונים, שאלות נפוצות'),
        t('bootcamp.ev.2.i2', 'בניית 2–3 סוכנים מותאמים עם אישיות, טון וגבולות'),
        t('bootcamp.ev.2.i3', 'ניהול רב-לשוני — פורטוגזית נכנס, עברית יוצא'),
        t('bootcamp.ev.2.i4', 'בקרת איכות — לוודא שהסוכן עונה נכון ולא ״ממציא״'),
      ],
      out: t('bootcamp.ev.2.out', '2–3 סוכנים עובדים · מחוברים לדאטה אמיתי'),
    },
    {
      num: '03',
      when: t('bootcamp.ev.3.when', 'מפגש שלישי · 19 ביוני · 10:00–13:00'),
      title: t('bootcamp.ev.3.title', 'האוטומציה והעצמאות'),
      items: [
        t('bootcamp.ev.3.i1', 'הקמת אוטומציות — ליד נכנס ← סוכן עונה ← סיכום אליך'),
        t('bootcamp.ev.3.i2', 'תחזוקה עצמית — לעדכן, להוסיף ידע ולתקן לבד'),
        t('bootcamp.ev.3.i3', 'ניהול עלויות, שימוש ואבטחה בסיסית'),
        t('bootcamp.ev.3.i4', 'תוכנית המשך 30/60/90 יום + פתיחת הקהילה'),
      ],
      out: t('bootcamp.ev.3.out', 'אוטומציה פעילה · עצמאות מלאה · תוכנית המשך'),
    },
  ];

  const takeaways = [
    t('bootcamp.take.1', 'מערכת RealizeOS פעילה ומותאמת לעסק שלך — לא דמו, אלא משהו שעובד מהיום הראשון'),
    t('bootcamp.take.2', '2–3 סוכני AI שמכירים את העסק, עונים ללקוחות ומבצעים משימות במקומך'),
    t('bootcamp.take.3', 'בוט טלגרם אישי — העסק שלך זמין בכיס, מכל מקום'),
    t('bootcamp.take.4', 'אוטומציה אחת לפחות שרצה לבד — ליד נכנס, מטופל, ואתה מקבל סיכום'),
    t('bootcamp.take.5', 'מדריך תחזוקה שמאפשר לך להרחיב, לעדכן ולתקן לבד — בלי תלות באף אחד'),
    t('bootcamp.take.6', 'תוכנית פעולה ברורה ל-30/60/90 הימים הבאים'),
    t('bootcamp.take.7', 'כניסה לקהילה פעילה שממשיכה ללוות אותך גם אחרי הסדנה'),
  ];

  const valueRows = [
    { label: t('bootcamp.value.1', 'מערכת AI מותאמת אישית — שלך לתמיד'), amt: t('bootcamp.value.1a', 'אלפי €') },
    { label: t('bootcamp.value.2', 'שלושה מפגשי הקמה עם ליווי צמוד, צעד-אחר-צעד'), amt: t('bootcamp.value.2a', 'אלפי €') },
    { label: t('bootcamp.value.3', 'חיסכון של שעות עבודה כל חודש — מצטבר לאורך זמן'), amt: t('bootcamp.value.3a', 'מצטבר') },
    { label: t('bootcamp.value.4', 'עצמאות מלאה — מדריך תחזוקה ויכולת להרחיב לבד'), amt: t('bootcamp.value.4a', 'ללא תלות') },
    { label: t('bootcamp.value.5', 'קהילה תומכת וליווי שממשיך גם אחרי הסדנה'), amt: t('bootcamp.value.5a', 'מתמשך') },
  ];

  const who = [
    { icon: <HomeIcon size={26} />, label: t('bootcamp.who.1', 'מנהלי נכסים · AL / STR') },
    { icon: <KeyRound size={26} />, label: t('bootcamp.who.2', 'נדל"ן ותיווך') },
    { icon: <Briefcase size={26} />, label: t('bootcamp.who.3', 'עצמאים ובעלי עסקים') },
    { icon: <Wrench size={26} />, label: t('bootcamp.who.4', 'נותני שירותים') },
    { icon: <Sprout size={26} />, label: t('bootcamp.who.5', 'אקספטים שמקימים עסק') },
    { icon: <TrendingUp size={26} />, label: t('bootcamp.who.6', 'כל מי שרוצה לחסוך זמן') },
  ];

  const logistics = [
    { icon: <CalendarDays size={18} />, text: t('bootcamp.logistics.dates', '17–19 ביוני 2026') },
    { icon: <Clock size={18} />, text: t('bootcamp.logistics.time', '10:00–13:00') },
    { icon: <MapPin size={18} />, text: t('bootcamp.logistics.place', 'Audax Workspace · סטובל') },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24" id="bootcamp-hero">
          <div className="fx-dot-grid pointer-events-none absolute inset-0" />
          <div className="fx-radial-halo" />
          <div className="relative mx-auto max-w-site px-5 text-center">
            <motion.div
              initial={reduce ? false : 'hidden'} animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="border-brand-yellow/40 text-brand-yellow text-xs font-medium">
                  <Sparkles size={14} className="me-1.5" />
                  {t('bootcamp.hero.badge', 'סדנת AI · סטובל · מרכז פורטוגל')}
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                {t('bootcamp.hero.title1', 'אתה לא בא ללמוד על AI.')}
                <br />
                <span className="fx-gradient-text">{t('bootcamp.hero.title2', 'אתה בא לצאת עם מערכת שעובדת.')}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
                <strong className="font-semibold text-foreground">{t('bootcamp.hero.lead1', 'שלושה מפגשי בוקר.')}</strong>{' '}
                {t('bootcamp.hero.lead2', 'בסוף הסדנה אתה יוצא עם RealizeOS פעיל, מותאם לעסק שלך — וביכולת לתחזק ולפתח אותו לבד.')}
              </motion.p>

              {/* date · time · place */}
              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-foreground/85">
                {logistics.map((l) => (
                  <span key={l.text} className="inline-flex items-center gap-2">
                    <span className="text-brand-yellow">{l.icon}</span>
                    {l.text}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="fx-glow-hover">
                  <a href={CTA_HREF} target="_blank" rel="noopener noreferrer">{t('bootcamp.hero.cta', 'אני רוצה מקום')}</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#program">{t('bootcamp.hero.cta2', 'מה בתוכנית?')}</a>
                </Button>
              </motion.div>

              {/* illustration — the agent network you'll build */}
              <motion.div variants={fadeUp} className="mt-12">
                <HeroAgentNetwork className="mx-auto w-full max-w-md md:max-w-lg" />
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {[
                  t('bootcamp.hero.chip1', '3 מפגשי בוקר'),
                  t('bootcamp.hero.chip2', '3 שעות כל אחד'),
                  t('bootcamp.hero.chip3', '12 מקומות בלבד'),
                  t('bootcamp.hero.chip4', '100% יוצאים עם מערכת חיה'),
                ].map((c) => (
                  <span key={c} className="rounded-full border border-brand-yellow/25 bg-[var(--rz-accent-soft)] px-4 py-1.5 text-sm font-medium text-brand-yellow">
                    {c}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* ── PROBLEM ──────────────────────────────────────────────────── */}
        <Section background="elevated">
          <SectionHeader
            gradient={false}
            title={t('bootcamp.problem.title', 'כמה שעות בשבוע אתה מבזבז<br/>על מה שמחשב היה עושה במקומך?')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {pains.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 0.08}>
                <InfoCard {...p} />
              </AnimateOnScroll>
            ))}
          </div>
        </Section>

        {/* ── WHAT IS REALIZEOS ────────────────────────────────────────── */}
        <Section>
          <SectionHeader
            title={t('bootcamp.what.title', 'זה לא עוד צ׳אטבוט.<br/>זו מערכת ההפעלה של העסק שלך.')}
            subtitle={t('bootcamp.what.sub', 'צוות סוכני AI שמכיר את העסק שלך לעומק, זוכר את ההעדפות שלך, ומריץ תהליכים שלמים מקצה לקצה — מקומי, פרטי, ובבעלות מלאה שלך.')}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {caps.map((c, i) => (
              <AnimateOnScroll key={c.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[var(--rz-accent-soft)] text-brand-yellow">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Section>

        {/* ── DEMO FLOW ────────────────────────────────────────────────── */}
        <Section background="elevated">
          <SectionHeader
            title={t('bootcamp.flow.title', 'לקוח כותב. הסוכן עונה. אתה מקבל סיכום.')}
          />
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            {[
              { icon: <Globe size={30} />, label: t('bootcamp.flow.1', 'לקוח כותב\nבפורטוגזית') },
              { icon: <Bot size={30} />, label: t('bootcamp.flow.2', 'הסוכן עונה\nתוך שניות') },
              { icon: <Smartphone size={30} />, label: t('bootcamp.flow.3', 'אתה מקבל סיכום\nבעברית בטלגרם') },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <AnimateOnScroll delay={i * 0.1}>
                  <div className="w-full rounded-2xl border border-border bg-card p-6 text-center sm:w-44">
                    <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full border border-border bg-muted text-brand-yellow">
                      {step.icon}
                    </div>
                    <h4 className="whitespace-pre-line text-sm font-semibold">{step.label}</h4>
                  </div>
                </AnimateOnScroll>
                {i < arr.length - 1 && (
                  <ArrowLeft className="hidden shrink-0 text-brand-yellow sm:block" size={28} />
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-base font-medium text-brand-yellow">
            {t('bootcamp.flow.note', 'את זה אתה בונה בעצמך בסדנה — ויוצא איתו פעיל.')}
          </p>
        </Section>

        {/* ── WHY DIFFERENT ────────────────────────────────────────────── */}
        <Section>
          <SectionHeader
            gradient={false}
            title={t('bootcamp.why.title', 'לא הרצאה. לא מצגת. סדנת עבודה.')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {diffs.map((d, i) => (
              <AnimateOnScroll key={d.title} delay={i * 0.08}>
                <InfoCard {...d} />
              </AnimateOnScroll>
            ))}
          </div>
        </Section>

        {/* ── 5 LAYERS ─────────────────────────────────────────────────── */}
        <Section background="elevated">
          <SectionHeader
            title={t('bootcamp.layers.title', '5 שכבות. מהקשר ועד אוטומציה מלאה.')}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {layers.map((l, i) => (
              <AnimateOnScroll key={l.n} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-border bg-card p-5 text-center">
                  <div className="font-display text-4xl font-bold text-brand-yellow">{l.n}</div>
                  <h4 className="mt-2 text-base font-semibold">{l.t}</h4>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{l.b}</p>
                </div>
              </AnimateOnScroll>
            ))}
            <AnimateOnScroll delay={0.36}>
              <div className="grid h-full place-items-center rounded-xl border border-brand-yellow/25 bg-[var(--rz-accent-soft)] p-5 text-center">
                <div>
                  <Layers className="mx-auto mb-1 text-brand-yellow" size={26} />
                  <h4 className="text-sm font-bold text-brand-yellow">FABRIC</h4>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{t('bootcamp.layers.fabric', 'בלב המערכת — גרף הידע שמחבר את הכל')}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Section>

        {/* ── PROGRAM (3 MORNINGS) ─────────────────────────────────────── */}
        <Section id="program">
          <SectionHeader
            title={t('bootcamp.program.title', 'שלושה בקרים. מתשתית חיה לעצמאות מלאה.')}
          />
          <div className="grid gap-6">
            {evenings.map((e, i) => (
              <AnimateOnScroll key={e.num} delay={i * 0.08}>
                <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-[140px_1fr]">
                  <div className="fx-gradient-text text-center font-display text-7xl font-bold leading-none md:text-8xl">
                    {e.num}
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-semibold tracking-wide text-success">{e.when}</div>
                    <h3 className="mb-4 text-2xl font-bold md:text-3xl">{e.title}</h3>
                    <ul className="grid gap-2.5">
                      {e.items.map((it) => (
                        <li key={it} className="relative pe-6 text-base text-foreground">
                          <ArrowLeft className="absolute end-0 top-1 text-brand-yellow" size={16} />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-brand-yellow/25 bg-muted px-5 py-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                        <Check size={16} />
                      </span>
                      <span className="text-sm">
                        <span className="font-semibold text-brand-yellow">{t('bootcamp.program.outLabel', 'בסוף המפגש יהיו לך:')} </span>
                        <span className="font-semibold">{e.out}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Section>

        {/* ── TAKEAWAYS ────────────────────────────────────────────────── */}
        <Section background="elevated">
          <SectionHeader
            title={t('bootcamp.take.title', '7 דברים שאתה לוקח איתך — והם שלך לתמיד.')}
          />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {takeaways.map((tk, i) => (
              <AnimateOnScroll key={tk} delay={i * 0.05} className={i === 6 ? 'sm:col-span-2' : ''}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                    <Check size={18} />
                  </span>
                  <span className="text-base font-medium">{tk}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Section>

        {/* ── VALUE vs COST ────────────────────────────────────────────── */}
        <Section>
          <SectionHeader
            title={t('bootcamp.value.title', 'אתה לא קונה סדנה.<br/>אתה קונה את 12 החודשים הבאים.')}
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {/* value */}
            <AnimateOnScroll>
              <div className="flex h-full flex-col rounded-2xl border-2 border-success/70 bg-card p-7">
                <h3 className="mb-5 text-xl font-bold text-success">{t('bootcamp.value.getTitle', 'מה אתה מקבל')}</h3>
                <div className="flex flex-col">
                  {valueRows.map((r, idx) => (
                    <div key={r.label} className={`flex items-center gap-3 py-3 ${idx < valueRows.length - 1 ? 'border-b border-border' : ''}`}>
                      <Check size={20} className="shrink-0 text-success" />
                      <span className="flex-1 text-sm">{r.label}</span>
                      <span className="whitespace-nowrap text-sm font-semibold text-brand-yellow">{r.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            {/* price */}
            <AnimateOnScroll delay={0.1}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-brand-yellow bg-muted p-7 text-center">
                <h3 className="mb-2 text-xl font-bold text-brand-yellow">{t('bootcamp.value.payTitle', 'מה אתה משלם')}</h3>
                <p className="text-sm text-muted-foreground">{t('bootcamp.value.priceSub', 'כל 3 המפגשים · השקעה חד-פעמית')}</p>
                <div className="my-4 font-display text-6xl font-bold">€399</div>
                <a href={SINGLE_HREF} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-yellow underline-offset-4 hover:underline">{t('bootcamp.value.perSession', 'או €150 למפגש בודד')}</a>
                <p className="mt-auto pt-6 text-base font-semibold text-brand-yellow">{t('bootcamp.value.roi', 'ROI חוזר כבר מהחודש הראשון.')}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </Section>

        {/* ── WHO ──────────────────────────────────────────────────────── */}
        <Section background="elevated">
          <SectionHeader
            title={t('bootcamp.who.title', 'לקהילה הישראלית במרכז פורטוגל.')}
            subtitle={t('bootcamp.who.sub', 'אם יש לך עסק שאתה רוצה שיעבוד חכם יותר — זה בשבילך.')}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {who.map((w, i) => (
              <AnimateOnScroll key={w.label} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-border bg-card p-5 text-center">
                  <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full border border-border bg-muted text-brand-yellow">
                    {w.icon}
                  </div>
                  <p className="text-sm font-medium leading-snug">{w.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Section>

        {/* ── WHO'S BEHIND IT — "Built from Real Operations" ───────────── */}
        <Founder />

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <Section>
          <AnimateOnScroll>
            <div className="fx-glow relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-brand-yellow/25 bg-card p-10 text-center md:p-14">
              <Eyebrow>{t('bootcamp.cta.eyebrow', 'הצטרפות')}</Eyebrow>
              <h2 className="text-3xl font-bold md:text-5xl">{t('bootcamp.cta.title', '12 מקומות בלבד.')}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                {t('bootcamp.cta.sub', 'הקבוצה קטנה בכוונה — כדי שכל אחד יצא עם מערכת שבאמת עובדת.')}
              </p>
              <Button asChild size="lg" className="fx-glow-hover mt-8">
                <a href={CTA_HREF} target="_blank" rel="noopener noreferrer">{t('bootcamp.cta.button', 'אני רוצה מקום')}</a>
              </Button>
              <p className="mt-6 text-xs text-[var(--rz-fg-subtle)]">
                {t('bootcamp.cta.note', 'Audax Workspace, Av. Luísa Todi, סטובל · 17–19 ביוני 2026 · 10:00–13:00')}
              </p>
            </div>
          </AnimateOnScroll>
        </Section>

      </main>
      <Footer />

      {/* ── PERSISTENT FLOATING CTA ───────────────────────────────────── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={reduce ? false : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-yellow/25 bg-card/90 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3">
              <div className="hidden items-center gap-2 text-sm font-medium text-foreground sm:flex">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-success" />
                {t('bootcamp.sticky.text', 'סדנת RealizeOS · 12 מקומות בלבד')}
              </div>
              <Button asChild size="lg" className="fx-glow-hover w-full sm:w-auto">
                <a href={CTA_HREF}>{t('bootcamp.hero.cta', 'אני רוצה מקום')}</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
