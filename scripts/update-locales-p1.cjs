const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

const newTranslations = {
    en: {
        founder: {
            title: "Built from Real Operations",
            p1: "RealizeOS isn't a concept or a demo. It was born from BOA Architects and the Realization Group—extracted from a production engine running <strong className=\"text-foreground\">international architecture, real estate, and venture operations</strong> every single day.",
            p2: "I built this because the alternative was breaking down. Trying to scale physical, complex ventures using scattered, generic AI tools was exhausting. Everything felt fragile. I needed absolute clarity and total control. I built RealizeOS to buy back my freedom—and now you can use our exact engine to reclaim yours.",
            role: "Founder,"
        },
        methodology: {
            header: {
                title: "Space. Business. Story.",
                subtitle: "The Realization Framework — a proven methodology for building AI-powered ventures that feel human and perform like machines."
            },
            pillars: {
                space: {
                    title: "Space",
                    promise: "Every great venture begins with a space — physical or digital. We help you define the boundaries, the flow, and the structure of your operations so nothing is accidental.",
                    technical: "The FABRIC Foundations layer maps your operational topology: team roles, tool integrations, communication flows, and knowledge repositories. This creates a spatial model that AI agents traverse to understand context and authority."
                },
                business: {
                    title: "Business",
                    promise: "Strategy without execution is a slideshow. We translate your vision into coordinated AI operations that compound revenue, automate growth, and free you from the middleware.",
                    technical: "The Agents and Routines layers encode your business logic: pricing models, compliance checks, market analysis workflows, client communication sequences, and vendor coordination. Each process becomes a repeatable, testable, improvable AI skill."
                },
                story: {
                    title: "Story",
                    promise: "Your brand voice, your authority, your narrative — amplified across every channel without you writing a single draft. The system speaks as you, because it learned from you.",
                    technical: "The Brand and Creations layers hold your voice identity (vocabulary, tone, formatting rules, examples). Every output — LinkedIn post, proposal, investor update — runs through a quality-assurance agent that enforces brand consistency before delivery."
                }
            },
            footer: "Built from a decade of hands-on architecture, real estate, and venture work.<br />Now encoded into an AI engine you can deploy in days."
        }
    },
    he: {
        founder: {
            title: "נבנה מתוך פעילות מבצעית אמתית",
            p1: "RealizeOS היא לא קונספט או הדגמה. היא נולדה מתוך BOA Architects ו-Realization Group — חולצה ממנוע ייצור שמריץ <strong className=\"text-foreground\">פרויקטים בינלאומיים של אדריכלות, נדל\"ן וסטארטאפים</strong> מדי יום.",
            p2: "בניתי את זה כי האלטרנטיבה הייתה קריסה. הניסיון לבנות ולנהל מיזמים פיזיים ומורכבים עם כלי בינה מלאכותית מפוזרים וגנריים היה מתיש. הכל הרגיש שביר. הייתי זקוק לבהירות מוחלטת ולשליטה מלאה. בניתי את RealizeOS כדי לקנות חזרה את החופש שלי — ועכשיו אתם יכולים להשתמש באותו מנוע כדי להחזיר את שלכם.",
            role: "מייסד,"
        },
        methodology: {
            header: {
                title: "מרחב. עסק. סיפור.",
                subtitle: "מסגרת העבודה של Realization — מתודולוגיה מוכחת לבניית מיזמים מבוססי AI שמרגישים אנושיים ומתפקדים כמו מכונות."
            },
            pillars: {
                space: {
                    title: "מרחב (Space)",
                    promise: "כל מיזם גדול מתחיל במרחב — פיזי או דיגיטלי. אנו עוזרים לך להגדיר את הגבולות, זרימת העבודה והמבנה של הפעילות שלך, כך ששום דבר לא קורה במקרה.",
                    technical: "שכבת היסודות של FABRIC ממפה את טופולוגיית הפעילות שלך: תפקידי צוות, שילובי הכלים, זרימות התקשורת ומאגרי הידע. זה יוצר מודל וירטואלי (מרחבי) שבו סוכני ה-AI מנווטים כדי להבין את ההקשר ואת גבולות הסמכות."
                },
                business: {
                    title: "עסק (Business)",
                    promise: "אסטרטגיה ללא ביצוע היא מצגת ריקה. אנו מתרגמים את החזון שלך לתוך פעולות AI מתואמות שמגדילות הכנסות, הופכות צמיחה לאוטומטית ומשחררות אותך מהעבודה הסיזיפית.",
                    technical: "שכבות הסוכנים (Agents) והשגרות (Routines) מקודדות את הלוגיקה העסקית שלך: מודלים של תמחור, בדיקות תאימות, איסוף נתוני שוק, סדרות הודעות ללקוח, ותיאום מול ספקים. כל תהליך הופך למיומנות AI שניתנת לשחזור, בדיקה ושיפור."
                },
                story: {
                    title: "סיפור (Story)",
                    promise: "הקול המותגי שלך, הסמכות והנרטיב שלך — מוגברים בכל ערוץ ללא צורך בכתיבת טיוטות. המערכת מדברת בשמך, כי היא למדה ממך.",
                    technical: "שכבות המותג (Brand) והיצירות (Creations) מחזיקות את זהות הקול שלך (אוצר מילים, טון, חוקי עיצוב ודוגמאות). כל תוצר — פוסט לינקדאין, הצעת מחיר, עדכון משקיעים — עובר דרך סוכן בקרת איכות (QA) שאוכף עקביות מותג לפני המסירה."
                }
            },
            footer: "נבנה מעשור של ניסיון מעשי באדריכלות, נדל\"ן ומיזמים.<br />מקודד כעת לתוך מנוע AI שניתן לפרוס תוך ימים."
        }
    },
    pt: {
        founder: {
            title: "Construído de Operações Reais",
            p1: "O RealizeOS não é um conceito ou uma demonstração. Nasceu a partir da BOA Architects e do Realization Group—extraído de um motor em produção que gere <strong className=\"text-foreground\">arquitetura internacional, imobiliário e operações de investimento</strong> todos os dias.",
            p2: "Construí isto porque a alternativa era a rutura. Tentar escalar projetos físicos e complexos usando ferramentas genéricas e dispersas de IA era exaustivo. Tudo parecia frágil. Eu precisava de absoluta clareza e total controlo. Construí o RealizeOS para comprar a minha liberdade de volta—e agora você pode usar o nosso sistema exato para reclamar a sua.",
            role: "Fundador,"
        },
        methodology: {
            header: {
                title: "Espaço. Negócio. História.",
                subtitle: "A Estrutura Realization — uma metodologia comprovada para construir projetos baseados em IA que parecem humanos mas funcionam como máquinas."
            },
            pillars: {
                space: {
                    title: "Espaço (Space)",
                    promise: "Todos os grandes projetos começam com um espaço — físico ou digital. Ajudamos a definir os limites, o fluxo e a estrutura das suas operações para que nada seja acidental.",
                    technical: "A camada FABRIC Foundations (Fundações) mapeia a toplogia operacional: funções das equipas, integrações de ferramentas, fluxos de comunicação e repositórios de conhecimento. Cria um modelo espacial em que agentes de IA navegam para compreender o contexto e a autoridade."
                },
                business: {
                    title: "Negócio (Business)",
                    promise: "Estratégia sem execução é um slideshow. Traduzimos a sua visão para operações de IA coordenadas que acumulam receita, escalam o crescimento de forma autónoma e libertam o trabalho de rotina.",
                    technical: "As camadas Agents (Agentes) e Routines (Rotinas) codificam a sua lógica empresarial: modelos de preços, verificação de conformidade, análise de workflows financeiros, sequências de clientes e gestão de fornecedores. Cada processo torna-se numa competência de IA repetível e testável."
                },
                story: {
                    title: "História (Story)",
                    promise: "A sua voz de marca, e a sua autoridade — ampliada em cada canal sem sequer ter de escrever um rascunho de raiz. O sistema comunica ativamente como você, porque foi treinado e aprendeu consigo.",
                    technical: "As camadas Brand (Marca) e Creations (Criações) contêm a sua identidade de voz (vocabulário, tom, formato, exemplos base). Todos os outputs — post no LinkedIn, propostas, relatórios de parceiros — passam por um Agente (QA) que obriga a consistência de marca antes de ser entregue."
                }
            },
            footer: "Construído a partir de uma década de experiência ativa em startups, imobiliário e arquitetura.<br />Agora compilado dentro de um motor IA pronto a descolar em dias."
        }
    }
};

const languages = ['en', 'he', 'pt'];

languages.forEach(lang => {
    const filePath = path.join(localesPath, lang, 'translation.json');
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.founder = newTranslations[lang].founder;
        data.methodology = newTranslations[lang].methodology;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Updated ${lang}/translation.json`);
    }
});
