const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

const en = {
    title1: "Start Building Your",
    title2: "AI Operations System",
    subtitle: "One-time purchase. Complete ownership. No recurring fees.",
    getRealizeOS: "Get RealizeOS",
    notReadyTitle: "Not ready yet?",
    notReadyDesc: "Start with the free Brand Discovery Worksheet — 10 questions that help you define your brand for any AI tool. Or get the FABRIC Architecture Guide:",
    thanks: "Thanks! Check your inbox for the architecture guide.",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    challengePlaceholder: "What's your biggest AI operations challenge?",
    sending: "Sending...",
    getGuide: "Get the Free Guide",
    error: "Something went wrong. Please try again or email us directly."
};

const he = {
    title1: "התחילו לבנות את",
    title2: "מערכת תפעול ה-AI שלכם",
    subtitle: "רכישה חד-פעמית. בעלות מלאה. ללא עמלות חוזרות.",
    getRealizeOS: "השיגו את RealizeOS",
    notReadyTitle: "עדיין לא מוכנים?",
    notReadyDesc: "התחילו עם גיליון עבודה חינמי לגילוי המותג — 10 שאלות שיעזרו לכם להגדיר את המותג שלכם לכל כלי AI. או קבלו את מדריך הארכיטקטורה של FABRIC:",
    thanks: "תודה! בדקו את תיבת הדואר הנכנס שלכם למדריך הארכיטקטורה.",
    namePlaceholder: "השם שלכם",
    emailPlaceholder: "your@email.com",
    challengePlaceholder: "מה האתגר הגדול ביותר שלכם בתפעול AI?",
    sending: "שולח...",
    getGuide: "קבלו את המדריך החינמי",
    error: "משהו השתבש. אנא נסו שוב או פנו אלינו ישירות בדוא\"ל."
};

const pt = {
    title1: "Comece a Construir o",
    title2: "Seu Sistema de Operações de IA",
    subtitle: "Compra única. Propriedade total. Sem taxas recorrentes.",
    getRealizeOS: "Obter o RealizeOS",
    notReadyTitle: "Ainda não está pronto?",
    notReadyDesc: "Comece com a Planilha de Descoberta de Marca gratuita — 10 perguntas que ajudam a definir sua marca para qualquer ferramenta de IA. Ou obtenha o Guia de Arquitetura FABRIC:",
    thanks: "Obrigado! Verifique sua caixa de entrada para o guia de arquitetura.",
    namePlaceholder: "Seu nome",
    emailPlaceholder: "seu@email.com",
    challengePlaceholder: "Qual é o seu maior desafio em operações de IA?",
    sending: "Enviando...",
    getGuide: "Obter o Guia Gratuito",
    error: "Algo deu errado. Por favor, tente novamente ou nos envie um e-mail."
};

const updates = { en, he, pt };

for (const [lang, newData] of Object.entries(updates)) {
    const filePath = path.join(localesPath, lang, 'translation.json');
    console.log('Updating', filePath);

    if (fs.existsSync(filePath)) {
        const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        existing.finalCta = newData;

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
        console.log(`Updated ${lang}/translation.json successfully`);
    } else {
        console.log(`ERROR: File not found ${filePath}`);
    }
}
