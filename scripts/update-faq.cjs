const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

// English FAQs
const enFaq = {
    title: "Frequently Asked Questions",
    items: [
        {
            question: 'What do I need to get started?',
            answer: '<p><strong>Lite:</strong> Obsidian (free) and a Claude Pro subscription ($20/mo from Anthropic). No coding required.</p><p><strong>Full:</strong> Python 3.11+, Docker (optional), and API keys for your chosen LLM providers (Anthropic and/or Google AI).</p>'
        },
        {
            question: 'Can I host it on my own server?',
            answer: '<p>Yes. The Full edition is designed for self-hosting. Deploy with Docker on any VPS, cloud instance, or local machine. Your data stays on your infrastructure.</p>'
        },
        {
            question: 'Which AI models does it support?',
            answer: '<p>The Full edition routes between Gemini Flash (fast/cheap), Claude Sonnet (balanced), and Claude Opus (powerful) — automatically selecting the best model for each task. The Lite edition works with any Claude model through Claude Code.</p>'
        },
        {
            question: 'Is my data private?',
            answer: '<p>Completely. RealizeOS runs on your machine or server. Your knowledge base, conversations, and business data never leave your infrastructure. The only external calls are to the LLM APIs you configure.</p>'
        },
        {
            question: 'What if I need help setting up?',
            answer: '<p>The Setup Assistance package ($499) includes a 1-hour call where we configure your system together — brand voice, agents, first workflow, everything. After purchase, you\'ll receive a detailed prep checklist. You can also reach out via email at any time.</p>'
        },
        {
            question: 'Do I get updates?',
            answer: '<p>Yes. As an owner of the system, you get access to all updates via the GitHub repository. Pull the latest changes whenever you want — on your schedule, not ours.</p>'
        },
        {
            question: 'Can I manage multiple businesses with one system?',
            answer: '<p>Absolutely. RealizeOS is built for multi-venture operators. Each business gets its own system with isolated agents, knowledge base, and brand voice. One engine, as many ventures as you need.</p>'
        },
        {
            question: 'What happens after I purchase?',
            answer: '<p>Immediately: you\'ll get access to download your package (Lite) or the GitHub repo (Full). You\'ll also receive a welcome email with your setup guide and a video walkthrough.</p><p>Join the community: Telegram Builders Group &amp; WhatsApp Community</p><p>Over the next week, you\'ll get onboarding emails with tips for defining your brand, customizing agents, and building your first workflow.</p>'
        },
        {
            question: 'Is there a refund policy?',
            answer: '<p>If you\'re not satisfied within 14 days of purchase, reach out and we\'ll make it right. We want you to succeed with RealizeOS, not feel trapped.</p>'
        }
    ]
};

// Hebrew FAQs
const heFaq = {
    title: "שאלות נפוצות",
    items: [
        {
            question: 'מה אני צריכ/ה כדי להתחיל?',
            answer: '<p><strong>Lite:</strong> אובסידיאן (חינמי) ומנוי Claude Pro ($20 לחודש מאנתרופיק). ללא צורך בקידוד.</p><p><strong>Full:</strong> Python 3.11+, Docker (אופציונלי), ומפתחות API לספקי ה-LLM שבחרת (Anthropic ו/או Google AI).</p>'
        },
        {
            question: 'האם אני יכול לאחסן את זה על שרת משלי?',
            answer: '<p>כן. הגרסה המלאה מיועדת לאירוח עצמי. ניתן לפרוס עם Docker על כל VPS, ענן מתארח או מכונה מקומית. הנתונים שלך נשארים בתשתית שלך.</p>'
        },
        {
            question: 'באילו מודלי AI זה תומך?',
            answer: '<p>הגרסה המלאה מנתבת בין Gemini Flash (מהיר/זול), Claude Sonnet (מאוזן) ו-Claude Opus (עוצמתי) — ובוחרת אוטומטית את המודל הטוב ביותר לכל משימה. גרסת ה-Lite עובדת עם כל מודל Claude דרך Claude Code.</p>'
        },
        {
            question: 'האם המידע שלי פרטי?',
            answer: '<p>לחלוטין. מודל RealizeOS רץ על המכונה או השרת שלך. בסיס הידע, השיחות והנתונים העסקיים שלך לעולם לא עוזבים את התשתית שלך. הקריאות החיצוניות היחידות הן ל-API של ה-LLM שהגדרת.</p>'
        },
        {
            question: 'מה אם משתבשת לי ההתקנה ואני צריך עזרה?',
            answer: '<p>חבילת הסיוע בהתקנה ($499) כוללת שיחה של שעה בה אנו מגדירים את המערכת שלך יחד — קול המותג, סוכנים, תהליך העבודה (workflow) הראשון, הכל. לאחר הרכישה, תקבל רשימת הכנה מפורטת. תוכל גם לפנות בדוא"ל בכל עת.</p>'
        },
        {
            question: 'האם אני מקבל עדכונים?',
            answer: '<p>כן. כבעלים של המערכת, אתה מקבל גישה לכל העדכונים דרך מאגר ה-GitHub. קבל את העדכונים האחרונים מתי שתרצה — בלוח הזמנים שלך, לא שלנו.</p>'
        },
        {
            question: 'האם אני יכול לנהל מספר עסקים עם מערכת אחת?',
            answer: '<p>בהחלט. RealizeOS נבנתה עבור מנהלי מיזמים מרובים. כל עסק מקבל מערכת משלו עם סוכנים מבודדים, בסיס ידע וקול מותג. מנוע אחד, כמה מיזמים שאתה צריך.</p>'
        },
        {
            question: 'מה קורה לאחר שאני רוכש?',
            answer: '<p>באופן מיידי: תקבל קישור להורדת החבילה שלך (Lite) או את מאגר ה-GitHub (Full). תקבל גם דוא"ל קבלת פנים עם מדריך ההתקנה שלך וסרטון הדרכה.</p><p>הצטרף לקהילה: קבוצת ה-Builders בטלגרם וקהילת וואטסאפ</p><p>במהלך השבוע הבא, תקבל סדרת מיילים להצטרפות עם טיפים להגדרת המותג שלך, התאמת הסוכנים ובניית ה-workflow הראשון שלך.</p>'
        },
        {
            question: 'האם יש מדיניות החזרים?',
            answer: '<p>אם אתה לא מרוצה בתוך 14 ימים מהרכישה, צור קשר ונדאג לזה. אנו רוצים שתצליח עם RealizeOS, לא שתרגיש כלוא.</p>'
        }
    ]
};

// Portuguese FAQs
const ptFaq = {
    title: "Perguntas Frequentes",
    items: [
        {
            question: 'O que preciso para começar?',
            answer: '<p><strong>Lite:</strong> Obsidian (grátis) e assinatura Claude Pro ($20/mês Anthropic). Não precisa programar.</p><p><strong>Full:</strong> Python 3.11+, Docker (opcional) e chaves API LLMs (Anthropic / Google AI).</p>'
        },
        {
            question: 'Posso hospedar no meu próprio servidor?',
            answer: '<p>Sim. A edição Full foi projetada para auto-hospedagem. Implante com Docker em qualquer VPS, nuvem ou máquina. Seus dados permanecem seguros com você.</p>'
        },
        {
            question: 'Quais modelos de IA são suportados?',
            answer: '<p>A Full intercala Gemini Flash (rápido/barato), Claude Sonnet (equilibrado) e Opus (poderoso) — selecionando o melhor modelo. A Lite funciona com qualquer modelo Claude via Claude Code.</p>'
        },
        {
            question: 'Meus dados são privados?',
            answer: '<p>Completamente. O RealizeOS roda na sua máquina/servidor. Base de conhecimento e conversas não saem da sua infraestrutura. Chamadas externas ocorrem apenas para as APIs configuradas.</p>'
        },
        {
            question: 'E se precisar de ajuda na configuração?',
            answer: '<p>O pacote de Assistência ($499) tem ligação de 1 hora para configurarmos juntos — voz da marca, agentes, primeiro workflow. Após comprar, receberá checklist e suporte contínuo.</p>'
        },
        {
            question: 'Recebo as atualizações?',
            answer: '<p>Sim. Você tem acesso a atualizações via repositório GitHub. Puxe o código novo sempre que desejar.</p>'
        },
        {
            question: 'Posso gerenciar vários negócios juntos?',
            answer: '<p>Com certeza. O RealizeOS é ideal para multi-empreendedores. Cada negócio tem agentes, conhecimento e voz isolados. Um motor, quantos empreendimentos precisar.</p>'
        },
        {
            question: 'O que ocorre depois de comprar?',
            answer: '<p>Imediato: acesso ao download (Lite) ou repo GitHub (Full), e-mail de boas-vindas com manual e vídeo.</p><p>Comunidade: Telegram Builders e WhatsApp.</p><p>Nos dias seguintes, dicas de integração, personalização de agentes e fluxos de trabalho.</p>'
        },
        {
            question: 'Existe política de reembolso?',
            answer: '<p>Se não estiver satisfeito em até 14 dias, resolvemos da melhor forma. O objetivo é seu sucesso, não te prender no ecossistema.</p>'
        }
    ]
};

const updates = { en: enFaq, he: heFaq, pt: ptFaq };

for (const [lang, newData] of Object.entries(updates)) {
    const filePath = path.join(localesPath, lang, 'translation.json');
    console.log('Updating', filePath);

    if (fs.existsSync(filePath)) {
        const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        existing.faq = newData;

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
        console.log(`Updated ${lang}/translation.json successfully`);
    } else {
        console.log(`ERROR: File not found ${filePath}`);
    }
}
