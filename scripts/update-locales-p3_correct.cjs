const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

const newTranslations = {
    en: {
        fabricSystem: {
            header: {
                title: "The FABRIC System",
                subtitle: "Every system in RealizeOS is organized using a structured knowledge architecture. Six directories. One coherent intelligence."
            },
            items: {
                F: {
                    title: "Foundations",
                    description: "System methodology, identity, and rules that every agent follows. Your team builds to your exact specifications, always."
                },
                A: {
                    title: "Agents",
                    description: "Your specialized AI team — drafter, analyst, reviewer, orchestrator. Each defined by a structure you control."
                },
                B: {
                    title: "Brain",
                    description: "Domain knowledge your team actually remembers. Market data, building codes, expertise, deal history — accessible every conversation."
                },
                R: {
                    title: "Routines",
                    description: 'Workflows that chain agents and tools together. "Draft project narrative" triggers writer, then reviewer — automatically.'
                },
                I: {
                    title: "Insights",
                    description: "A learning log that makes your team smarter over time. Feedback, execution decisions, and patterns — nothing gets lost."
                },
                C: {
                    title: "Creations",
                    description: "Deployments that meet your quality standards. Every output lands in an organized, reviewable structure."
                }
            }
        },
        comparison: {
            header: {
                title: "The Unfair Advantage",
                subtitle: "How a coordinated engine compares to traditional operations."
            },
            columns: {
                traditional: {
                    header: "Hiring a Team",
                    price: "$50,000+",
                    priceSuffix: "/year",
                    items: [
                        "2-4 week ramp-up per hire",
                        "Limited to business hours",
                        "Knowledge walks out the door",
                        "Coordination overhead"
                    ]
                },
                tools: {
                    header: "Individual AI Tools",
                    price: "$1,200+",
                    priceSuffix: "/year",
                    items: [
                        "$97/mo per community",
                        "$49-99 per agent config",
                        "No coordination between tools",
                        "Context lost every session"
                    ]
                },
                realize: {
                    header: "RealizeOS",
                    price: "$249",
                    priceSuffix: " once",
                    items: [
                        "Running in hours, not weeks",
                        "Available 24/7, every day",
                        "Knowledge compounds forever",
                        "Agents coordinate automatically"
                    ]
                }
            }
        },
        howItWorks: {
            header: {
                title: "Deployment Process",
                subtitle: "How we transition you from chaotic middleware to a unified engine."
            },
            steps: [
                {
                    title: "Pick Your Edition",
                    description: "Stripe checkout takes 30 seconds. Choose Lite, Full, or Setup Assistance.",
                    time: ""
                },
                {
                    title: "Get Instant Access",
                    description: "Google Drive link + welcome email + community invite arrive immediately. No waiting.",
                    time: ""
                },
                {
                    title: "Define Who You Are & Your Business",
                    description: "Fill in your personal identity, brand identity, and voice rules from guided templates. Use the Brand Worksheet to make it easy.",
                    time: "5-10 min"
                },
                {
                    title: "First Conversation",
                    description: "Ask your AI team to write a post. Watch the Writer draft and the Reviewer check quality — in your voice.",
                    time: "5 min"
                },
                {
                    title: "Build Your System",
                    description: "Add domain knowledge, create workflows, connect tools. Your AI team gets smarter every week.",
                    time: "Week 1"
                }
            ]
        },
        delivery: {
            header: {
                title: "What You Actually Get",
                subtitle: "We don't sell software subscriptions. We build and hand over a functioning operational engine."
            },
            models: {
                lite: {
                    edition: "Lite Edition",
                    emotionalPromise: "From scattered chaos to a single source of truth. Instant clarity and structure for your business operations.",
                    items: [
                        {
                            title: "Pre-structured Obsidian vault",
                            description: "~30 files organized in the FABRIC structure. Open it, and you have a working knowledge base."
                        },
                        {
                            title: "4 AI agent definitions",
                            description: "Orchestrator, Writer, Reviewer, Analyst. Each is a markdown file you customize for your business."
                        },
                        {
                            title: "Fill-in-the-blank brand templates",
                            description: "brand-identity.md and brand-voice.md with guided prompts. Takes 5 minutes to fill in."
                        },
                        {
                            title: "2 skill workflows",
                            description: "Content pipeline and research workflow (YAML files), ready to use or customize."
                        },
                        {
                            title: "CLAUDE.md configuration",
                            description: "Drop into Claude Code and it instantly understands your entire business context."
                        },
                        {
                            title: "Step-by-step setup guide",
                            description: "15 minutes from download to your first AI-powered conversation."
                        }
                    ]
                },
                full: {
                    edition: "Full Edition",
                    includesNote: "Everything in Lite, plus:",
                    emotionalPromise: "From overwhelmed operator to focused visionary. Claim your fully automated, production-ready operational engine.",
                    items: [
                        {
                            title: "Complete Python engine (8,800+ lines)",
                            description: "Multi-LLM routing, 7-layer prompt assembly, skill execution, self-evolution. Production-ready code."
                        },
                        {
                            title: "Docker one-command deploy",
                            description: "docker compose up and you have a running AI operations server."
                        },
                        {
                            title: "13 Google Workspace tools",
                            description: "Gmail, Calendar, Drive integration built in. OAuth setup included."
                        },
                        {
                            title: "REST API + Telegram channel",
                            description: "Connect from any frontend, or use Telegram as your command center."
                        },
                        {
                            title: "5 industry templates",
                            description: "Consulting, Agency, Multi-Venture, SaaS, E-Commerce. Pick one and customize."
                        },
                        {
                            title: "CLI tooling",
                            description: "init, serve, bot, status, index commands for day-to-day operations."
                        }
                    ]
                }
            },
            note: "Both editions include: Instant Google Drive access, setup guide, community access (Telegram + WhatsApp), and onboarding emails for your first week."
        }
    },
    he: {
        fabricSystem: {
            header: {
                title: "מערכת FABRIC",
                subtitle: "כל מערכת ב-RealizeOS מאורגנת באמצעות ארכיטקטורת ידע מובנית. שש ספריות. אינטליגנציה רציפה אחת."
            },
            items: {
                F: {
                    title: "יסודות (Foundations)",
                    description: "מתודולוגיית המערכת, זהות וכללים שכל סוכן עוקב אחריהם. הצוות בונה בדיוק לפי המפרט, תמיד."
                },
                A: {
                    title: "סוכנים (Agents)",
                    description: "צוות ה-AI המומחה — מנסח, מנתח, מבקר, מתזמר. כולם מוגדרים תחת מערכת בשליטתך."
                },
                B: {
                    title: "מוח (Brain)",
                    description: "ידע מהותי שהצוות באמת זוכר. נתוני שוק, קודי בנייה, מומחיות, היסטוריית עסקאות — נגיש בכל שיחה."
                },
                R: {
                    title: "שגרות (Routines)",
                    description: "תהליכי עבודה הקושרים יחד סוכנים וכלים. 'נסח סיכום פרויקט' יפעיל כותב, ואז מבקר — באופן אוטומטי."
                },
                I: {
                    title: "תובנות (Insights)",
                    description: "יומן למידה שהופך את הצוות לחכם יותר עם הזמן. משוב, החלטות ביצוע ותבניות פעולה — דבר לא הולך לאיבוד."
                },
                C: {
                    title: "יצירות (Creations)",
                    description: "תוצרים שעומדים בתקני האיכות המבוקשים. כל פלט נשמר בצורה מסודרת, מוכן לבדיקה ולפעולה."
                }
            }
        },
        comparison: {
            header: {
                title: "היתרון הבלתי הוגן",
                subtitle: "כיצד מנוע מתואם משתווה לפעולות מסורתיות."
            },
            columns: {
                traditional: {
                    header: "העסקת צוות",
                    price: "$50,000+",
                    priceSuffix: "/שנה",
                    items: [
                        "2-4 שבועות חפיפה",
                        "מוגבל לשעות פעילות",
                        "ידע נמוג בתחלופה",
                        "עלויות תיאום"
                    ]
                },
                tools: {
                    header: "כלי AI מבודדים",
                    price: "$1,200+",
                    priceSuffix: "/שנה",
                    items: [
                        "$97/ח' לקהילה",
                        "$49-99 לקינפוג סוכן",
                        "אין תיאום בין מערכות",
                        "איבוד הקשר בין מפגשים"
                    ]
                },
                realize: {
                    header: "RealizeOS",
                    price: "$249",
                    priceSuffix: " פעם אחת",
                    items: [
                        "פעיל בשעות, לא בשבועות",
                        "זמין 24/7, כל יום",
                        "ידע נצבר לנצח",
                        "סוכנים מתואמים אוטומטית"
                    ]
                }
            }
        },
        howItWorks: {
            header: {
                title: "תהליך הפריסה",
                subtitle: "איך אנחנו מעבירים אתכם מבלגן תפעולי למנוע אחוד."
            },
            steps: [
                {
                    title: "בחירת גרסה",
                    description: "תשלום סטרייפ לוקח 30 שניות. בחרו Lite, מלא או צורף התקנה.",
                    time: ""
                },
                {
                    title: "גישה מיידית",
                    description: "קישור דרייב + מייל קבלת פנים + הזמנה לקהילה מגיעים מיד. בלי לחכות.",
                    time: ""
                },
                {
                    title: "הגדירו מי אתם ואת העסק שלכם",
                    description: "מלאו את הזהות האישית, זהות המותג וחוקי הקול דרך תבניות מודרכות.",
                    time: "5-10 דק'"
                },
                {
                    title: "שיחה ראשונה",
                    description: "בקשו מצוות ה-AI לכתוב פוסט. צפו בכותב מנסח ובמבקר בודק איכות.",
                    time: "5 דק'"
                },
                {
                    title: "בנו את המערכת שלכם",
                    description: "הוסיפו ידע תחום, צרו זרימות עבודה, חברו כלים. צוות ה-AI הופך לחכם יותר משבוע לשבוע.",
                    time: "שבוע 1"
                }
            ]
        },
        delivery: {
            header: {
                title: "מה אתם מקבלים בפועל",
                subtitle: "אנחנו לא מוכרים מנויי תוכנה. אנחנו בונים ומוסרים מנוע תפעולי."
            },
            models: {
                lite: {
                    edition: "גרסת Lite",
                    emotionalPromise: "מיקומו מבלבול רופף למקור אמת אחד. בהירות מיידית לפעולות עסקיות.",
                    items: [
                        {
                            title: "בסיס אובסידיאן מובנה מראש",
                            description: "~30 קבצים מסודרים ב-FABRIC. פתחו את זה, ויש לכם בסיס עבודה."
                        },
                        {
                            title: "4 סוכנים מוגדרים",
                            description: "מתזמר, כותב, מבקר, אנליסט. כל אחד הוא קובץ מארק דאון מותאם לעסק שלך."
                        },
                        {
                            title: "תבניות מותג למילוי",
                            description: "brand-identity.md ו-brand-voice.md למילוי מודרך, כ-5 דקות עבודה."
                        },
                        {
                            title: "2 תהליכי עבודה למיומנויות",
                            description: "מערך תוכן ותהליך מחקר מובנה לשימוש מיידי."
                        },
                        {
                            title: "קובץ קונפיגורציה ל-Claude",
                            description: "לזרוק לתוך CLAUDE כדי להבין מיידית את כל ההקשר העסקי."
                        },
                        {
                            title: "מדריך התקנה שלב-אחר-שלב",
                            description: "15 דקות מרגע ההורדה ועד הודעה ראשונה מבוססת-AI."
                        }
                    ]
                },
                full: {
                    edition: "הגרסה המלאה",
                    includesNote: "הכל ב-Lite, בתוספת:",
                    emotionalPromise: "השתלטו על מנוע הפעלה אוטומטי ותפעולי ברמת פרודקשן.",
                    items: [
                        {
                            title: "מנוע Python מלא (מעל 8800 שורות קוד)",
                            description: "ניתבוי רב-מודל, הרכבת הנחיות ברמה עשירית, הרצת כלים. קוד מוכן לפרודקשן."
                        },
                        {
                            title: "פריסת Docker בלחיצה אחת",
                            description: "פקודת docker compose up ויש לכם שרת AI פעיל."
                        },
                        {
                            title: "13 שילובי הגדרות עבודה",
                            description: "בנייה מובנית ל-Gmail, לוח שנה וגוגל דרייב עם הגדרות OAuth."
                        },
                        {
                            title: "REST API וערוץ Telegram",
                            description: "התחברו מכל צד קדמי או השתמשו בטלגרם כמרכז פיקוד."
                        },
                        {
                            title: "5 תבניות תעשייה",
                            description: "ייעוץ, חברה שיווקית, יזמות ריבוי ערוצית, תוכנה, וקניות מקוונות."
                        },
                        {
                            title: "פונקציות מסוף שורת הפקודה CLI",
                            description: "init, serve, bot, status ו-index לפיצ'רים יום-יומיים."
                        }
                    ]
                }
            },
            note: "שתי הגרסאות כוללות: גישה מיידית לגוגל דרייב, מדריך התקנה, גישה לקהילה, ומיילים קליטה."
        }
    },
    pt: {
        fabricSystem: {
            header: {
                title: "O Sistema FABRIC",
                subtitle: "Cada sistema no RealizeOS está organizado via uma arquitetura de conhecimento. Seis diretórios. Uma grande inteligência."
            },
            items: {
                F: {
                    title: "Fundações (Foundations)",
                    description: "A metedologia e regras que a sua equipa adota incondicionalmente para todas os outputs e visões."
                },
                A: {
                    title: "Agentes (Agents)",
                    description: "A sua equipa IA — redator, analista, revisor, orquestrador. Todos eles construídos exatamente ao seu gosto."
                },
                B: {
                    title: "Cérebro (Brain)",
                    description: "O conhecimento real que as pastas dominam: códigos governamentais e mercados na base de dados das IA."
                },
                R: {
                    title: "Rotinas (Routines)",
                    description: "Atividades repetidas que dão autonomia cega aos processos de negócio. Inserções interativas e autónomas."
                },
                I: {
                    title: "Insights",
                    description: "Um registo constante do motor na medida das lições partilhadas. Tudo guardado aos limites para ficar mais fiel a si."
                },
                C: {
                    title: "Criações (Creations)",
                    description: "Geração pura de propostas sólidas, análises financeiras ou código de programação formatado sem falhas."
                }
            }
        },
        comparison: {
            header: {
                title: "A Vantagem Injusta",
                subtitle: "Como o nosso motor compara perante soluções tradicionais."
            },
            columns: {
                traditional: {
                    header: "Contratar uma Equipa",
                    price: "$50.000+",
                    priceSuffix: "/ano",
                    items: [
                        "2-4 semanas de inserção por agente",
                        "Limitado ao horário laboral regular",
                        "O conhecimento retido perde-se ao sair do seu controlo",
                        "Sobrecusto temporal com despesas"
                    ]
                },
                tools: {
                    header: "Ferramentas IA Comuns",
                    price: "$1.200+",
                    priceSuffix: "/ano",
                    items: [
                        "$97 p/ comunidade",
                        "$49 p/ bots soltos e instáveis",
                        "Nenhuma sintonia orgânica de ferramentas cruzadas",
                        "Falta total em contexto memorizado"
                    ]
                },
                realize: {
                    header: "RealizeOS",
                    price: "$249",
                    priceSuffix: " de uma vez",
                    items: [
                        "Processo limpo em horas não semanas",
                        "Totalmente online em background 24x7",
                        "Constante de valor exponencial na memorização constante",
                        "Agentes cooperativos com rotinas exímias"
                    ]
                }
            }
        },
        howItWorks: {
            header: {
                title: "Processo de Implementação",
                subtitle: "Como transita de caos manual e esgotado para o poder unificado IA."
            },
            steps: [
                {
                    title: "Decida Qual a Edição",
                    description: "Pague limpo no Stripe em 30 segundos — Edition lite, Base Total ou Assistência Pessoal.",
                    time: ""
                },
                {
                    title: "Iniciação ao Suporte Imparável",
                    description: "Bem-vindo imediatamente. Entregas Drive. Passaporte aberto da comunidade central sem reservas.",
                    time: ""
                },
                {
                    title: "Declare e Ensine a Sua Imagem",
                    description: "Inscreva moldes de base num piscar de olhos de auto preenchimento (Branding, Personalidade, Guia).",
                    time: "5-10 min"
                },
                {
                    title: "Primeira Interação Magnífica",
                    description: "Mande rascunhar o primeiro ensaio. O escritor foca-se nas directrizes e o revisor aperfeiçoa o rigor analítico.",
                    time: "5 min"
                },
                {
                    title: "Afine As Ligações do Sistema",
                    description: "Expanda as raízes do conhecimento da máquina — API's externas e outras ferramentas moldáveis num clique.",
                    time: "1 Semana"
                }
            ]
        },
        delivery: {
            header: {
                title: "O Que Na Verdade Entrega",
                subtitle: "Nós não vendemos assinaturas de software. Construímos e passamos as chaves para usar um motor operacional em pleno controlo."
            },
            models: {
                lite: {
                    edition: "Lite Edição",
                    emotionalPromise: "A fundação para quem constrói e gere bases fortes da equipa IA de forma fluida a passos curtos.",
                    items: [
                        {
                            title: "Um Obsidian perfeitamente centralizado",
                            description: "~30 Ficheiros essenciais num local arrumadinho de forma magistral das raízes da metologia."
                        },
                        {
                            title: "4 perfis IA nativos bem detalhados",
                            description: "Os agentes Orquestradotes + Analíticos + Exímios Críticos no texto central formatados aos perfis ideais."
                        },
                        {
                            title: "Identidade flexível mas rigorosa formatada",
                            description: "Ficheiros prompt essenciais sem limites da sua forma e regras precisas para o estilo de cópia perfeito e tom visual."
                        },
                        {
                            title: "2 modelos essenciais de Workflows",
                            description: "Um passo automatizado na produção ou prospecção analítica pronta numa simples compilação diária yaml de rotinas."
                        },
                        {
                            title: "O Mestre de Instruções em CLAUDE.md",
                            description: "Diz à aplicação como coordenar ferramentas sob a ótica da sua exata base operacional a 100% nativa localmente."
                        },
                        {
                            title: "Livro Aberto para Iniciar Passos Base",
                            description: "15 min orientados e organizados por ordem e num clique, como ligar ferramentas do bot a um simples terminal digital."
                        }
                    ]
                },
                full: {
                    edition: "Full Edition",
                    includesNote: "Conteúdo completo da base Lite, entre mais extras:",
                    emotionalPromise: "Foque nos objetivos do sistema, remova do papel e delegue ativamente as suas mais confusas preocupações base.",
                    items: [
                        {
                            title: "Mais de 8,000 linhas puras na linguagem de Python",
                            description: "Comandos, scripts complexos formatados pelas rotas centrais prontas do exímio LLM interno robusto escalável do backend do zero."
                        },
                        {
                            title: "Um Deploy imediato da base de servidor limpa e centralizada",
                            description: "Num clique execute de imediato contentores limpos em qualquer terminal docker para isolar o sistema."
                        },
                        {
                            title: "13 Ferramentas integradas da fundação de produtividade online de nuvem e agenda",
                            description: "Encaixe no email google perfeito de agendamentos automatizados a anexos cloud do ecossistema central perfeitamente afinado em tokens seguros."
                        },
                        {
                            title: "APIs puras ligadas ao canal nativo por Telegram para o servidor central ativado para notificar clientes com ações 1click base instantâneas via mobile.",
                            description: "Utilize uma REST API simples como base controladora interna móvel, limpa do sistema complexo sob sua segurança máxima nos servidores que você determinar livre de bloqueio extra limitador por corporação grande e cúpulas isoladas cegas de IA."
                        },
                        {
                            title: "As vertentes principais com bases e guião ideais por ramo pronto a explorar e testar",
                            description: "Eixos do Saas e negócios em massa das marcas nativas das indústrias operacionais limpas prontas para base em formato prático do seu modelo exato sem atritos nenhuns!"
                        },
                        {
                            title: "O canivete de scripts complexo prumo da Consola digital programada de ações prontas",
                            description: "Execute os módulos robustos com apenas uma só base simples de inicialização rotineira na sua frente à vontade ao seu conforto visual num segundo no seu telemóvel ao acordar."
                        }
                    ]
                }
            },
            note: "Ambos contam rigoroso acesso cloud de suporte formatado nativo em emails regulares do suporte da rede social oficial comunitário da corporação a acompanhar as bases dos utilizadores ativos em rede fechada num acompanhamento das dúvidas 1-1."
        }
    }
};

const languages = ['en', 'he', 'pt'];

languages.forEach(lang => {
    const filePath = path.join(localesPath, lang, 'translation.json');
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.fabricSystem = newTranslations[lang].fabricSystem;
        data.comparison = newTranslations[lang].comparison;
        data.howItWorks = newTranslations[lang].howItWorks;
        data.delivery = newTranslations[lang].delivery;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Updated ${lang}/translation.json`);
    }
});
