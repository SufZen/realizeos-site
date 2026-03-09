const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

const newTranslations = {
    en: {
        painPoints: {
            header: {
                title: "Stop Duct-Taping AI Tools<br>That Forget You",
                subtitle: "Most AI setups are a mess of disconnected chatbots, lost context, and manual copy-pasting. Your AI should work as a team, not a collection of strangers."
            },
            items: {
                layers: {
                    title: "The Friction Trap",
                    description: "Your best ideas die in the handoff. You're constantly translating between disconnected tools, watching momentum stall and deadlines slip entirely."
                },
                clock: {
                    title: "Execution Paralysis",
                    description: "The overwhelming anxiety of turning a massive physical project into reality. The sheer volume of unstructured details paralyzes your ability to lead."
                },
                users: {
                    title: "Middleware Madness",
                    description: "You've become the bottleneck. Instead of designing the future, you're manually duct-taping generic AI outputs together at 2 AM. It's exhausting."
                }
            },
            transition: "You shouldn't feel this way. Step out of the middleware and into the visionary seat. Command a coordinated operational engine that builds your reality for you."
        },
        demoVideo: {
            header: {
                title: "See It in Action",
                subtitle: "Watch how RealizeOS turns a single message into coordinated agent work — from your knowledge base, in your brand voice."
            },
            comingSoon: "Demo video coming soon",
            duration: "3 min walkthrough"
        },
        caseStudies: {
            header: {
                title: "From the Ecosystem That Built It",
                subtitle: "These aren't hypothetical scenarios — they are live operations running on the same engine you're about to deploy."
            },
            howItWorks: "How It Works Technically",
            items: {
                boa: {
                    title: "BOA Architects",
                    industry: "Architecture & Design",
                    metric: "40 hrs/week saved",
                    quote: "We stopped drowning in compliance paperwork. Now the system drafts, reviews, and files — while we focus on designing spaces people actually want to live in.",
                    technical: "Multi-agent workflow: a Researcher agent scans updated building codes per municipality, a Writer agent drafts compliance documents, a Reviewer agent flags inconsistencies against the project spec, and a Tools agent auto-files via Google Drive integration. The knowledge base stores 200+ regulatory templates across Portugal, Spain, and Israel."
                },
                burtucala: {
                    title: "Burtucala Real Estate",
                    industry: "Real Estate Investment",
                    metric: "3× faster deal flow",
                    quote: "Every market opportunity is surfaced, analyzed, and briefed before we even finish our morning coffee. We went from reactive to proactive overnight.",
                    technical: "Scheduled intelligence routines run at 06:00 daily: an Analyst agent pulls market data from idealista, INE, and Banco de Portugal APIs. A Writer agent packages findings into a structured brief. A Knowledge agent cross-references against portfolio parameters stored in the vault. Alerts are pushed to Telegram with one-click approval for deeper analysis."
                },
                realization: {
                    title: "Realization Group",
                    industry: "Venture Consulting",
                    metric: "5 ventures, 1 operator",
                    quote: "I run architecture, real estate, consulting, content, and a SaaS product — all from one control room. The system doesn't just assist, it operates.",
                    technical: "Full FABRIC stack deployment: Foundations layer holds identity, brand voice, and strategy documents. The Agent layer coordinates 6 specialized agents across all ventures. Brand layer ensures consistent voice across 4 different brands. Routines layer automates weekly reports, LinkedIn posts, and investor updates. Intelligence layer tracks cross-venture KPIs. Creations layer outputs client proposals, blog posts, and pitch decks."
                }
            }
        }
    },
    he: {
        painPoints: {
            header: {
                title: "תפסיקו להדביק כלי AI<br>ששוכחים אתכם",
                subtitle: "רוב מערכות ה-AI הן בלגן של צ'אטבוטים מנותקים, אובדן הקשר והעתק-הדבק ידני. ה-AI שלכם צריך לעבוד כצוות, לא כאוסף של זרים."
            },
            items: {
                layers: {
                    title: "מלכודת החיכוך",
                    description: "הרעיונות הטובים ביותר שלכם מתים במעברים. אתם מתרגמים ללא הרף בין כלים מנותקים, צופים במומנטום נעצר ובתאריכי יעד מתפספסים לחלוטין."
                },
                clock: {
                    title: "שיתוק ביצועי",
                    description: "החרדה המציפה מלהפוך פרויקט פיזי עצום למציאות. נפח הפרטים הבלתי מובנים משתק את יכולת המנהיגות שלכם."
                },
                users: {
                    title: "טירוף התיווך",
                    description: "הפכתם לצוואר הבקבוק. במקום לעצב את העתיד, אתם מדביקים באופן ידני פלטים של בינה מלאכותית גנרית בשתיים בלילה. זה מתיש."
                }
            },
            transition: "אתם לא צריכים להרגיש ככה. צאו מעמדת המתווך (Middleware) וחזרו לכיסא החזון. פקדו על מנוע תפעולי מתואם שבונה את המציאות שלכם עבורכם."
        },
        demoVideo: {
            header: {
                title: "צפו בפעולה",
                subtitle: "ראו כיצד RealizeOS הופך הודעה בודדת לעבודת סוכנים מתואמת — מתוך בסיס הידע שלכם ובקול המותג שלכם."
            },
            comingSoon: "סרטון הדגמה בקרוב",
            duration: "הדרכה של 3 דקות"
        },
        caseStudies: {
            header: {
                title: "מהאקוסיסטם שבנה את המערכת",
                subtitle: "אלו לא תרחישים היפותטיים — אלו פעולות חיות שרצות על אותו מנוע שאתם עומדים לפרוס."
            },
            howItWorks: "איך זה עובד טכנית",
            items: {
                boa: {
                    title: "BOA Architects",
                    industry: "אדריכלות ועיצוב",
                    metric: "40 שעות שבועיות נחסכו",
                    quote: "הפסקנו לטבוע בניירות תאימות ורישוי. עכשיו המערכת מנסחת, בודקת ומתייקת — בזמן שאנחנו מתמקדים בעיצוב חללים שאנשים באמת רוצים לחיות בהם.",
                    technical: "תהליך עבודה מרובה סוכנים: סוכן תחקירן סורק חוקי בנייה מעודכנים לפי רשות מקומית, סוכן כותב מנסח מסמכי תאימות, סוכן מבקר (Reviewer) מסמן חוסר עקביות מול מפרט הפרויקט, וסוכן כלים (Tools) מתייק באופן אוטומטי באמצעות שילוב Google Drive. בסיס הידע מאחסן מעל 200 תבניות רגולטוריות ברחבי פורטוגל, ספרד וישראל."
                },
                burtucala: {
                    title: "Burtucala Real Estate",
                    industry: "השקעות נדל\"ן",
                    metric: "זרימת עסקאות מהירה פי 3",
                    quote: "כל הזדמנות שוק נחשפת, מנותחת ומועברת לנו לפני שאפילו סיימנו את קפה הבוקר. עברנו מגישה תגובתית ליוזמת בין לילה.",
                    technical: "שגרות מודיעין מתוזמנות פועלות מדי יום ב-06:00: סוכן מנתח (Analyst) שולף נתוני שוק מממשקי API של idealista, INE ו-Banco de Portugal. סוכן כותב אוזר את הממצאים לתקציר מובנה. סוכן ידע מבליב אותם מול פרמטרי הפורטפוליו המאוחסנים בכספת (Vault). התראות נדחפות לטלגרם עם אישור בלחיצה אחת לניתוח מעמיק יותר."
                },
                realization: {
                    title: "Realization Group",
                    industry: "ייעוץ מיזמים",
                    metric: "5 מיזמים, מפעיל אחד",
                    quote: "אני מנהל אדריכלות, נדל\"ן, ייעוץ, יצירת תוכן ומוצר תוכנה — כולם מחדר בקרה אחד. המערכת לא רק מסייעת, היא פועלת ומפעילה.",
                    technical: "פריסת מערך FABRIC מלא: שכבת היסודות (Foundations) מכילה זהות, קול מותג ומסמכי אסטרטגיה. שכבת הסוכנים (Agents) מתאמת 6 סוכנים מתמחים על פני כל המיזמים. שכבת המותג מבטיחה עקביות קולית על פני 4 מותגים שונים. שכבת השגרות (Routines) הופכת דוחות שבועיים, פוסטים בלינקדאין ועדכוני משקיעים לאוטומטיים. שכבת המודיעין (Intelligence) עוקבת אחר מדדי ביצוע (KPIs) חוצי-מיזמים. שכבת היצירות (Creations) מפיקה הצעות ללקוחות, פוסטים לבלוגים ומצגות משקיעים."
                }
            }
        }
    },
    pt: {
        painPoints: {
            header: {
                title: "Pare de unir ferramentas IA<br>que se esquecem de si",
                subtitle: "A maioria das configurações IA são uma confusão de chatbots desconectados, contexto perdido e puro copiar e colar manual. A sua IA devia trabalhar em equipa, não como uma coleção de estranhos."
            },
            items: {
                layers: {
                    title: "A Armadilha do Atrito",
                    description: "As suas melhores ideias morrem na transição. Anda sempre a traduzir contexto entre ferramentas isoladas, a ver o momento parar e a falhar deadlines."
                },
                clock: {
                    title: "Paralisia de Execução",
                    description: "A enorme ansiedade de traduzir um projeto gigante para o mundo físico. O puro volume de detalhes não estruturados paralisa a sua capacidade de liderar."
                },
                users: {
                    title: "A Loucura de ser o Intermediário",
                    description: "Tornou-se no gargalo do seu próprio negócio. Em vez de projetar o futuro, anda a copiar peças genéricas de IA às 2 da madrugada para as juntar. É exausto."
                }
            },
            transition: "Não devia sentir-se assim. Saia do papel de intermediário e ocupe o lugar de visionário. Comando um motor operacional coordenado que constrói a sua realidade por si."
        },
        demoVideo: {
            header: {
                title: "Veja-o em Ação",
                subtitle: "Observe como o RealizeOS converte uma única mensagem num trabalho coordenado de agentes — da sua base de conhecimento, e com a sua voz."
            },
            comingSoon: "Vídeo de demonstração em breve",
            duration: "Guia de 3 minutos"
        },
        caseStudies: {
            header: {
                title: "Do Ecossistema Que o Construiu",
                subtitle: "Estes não são cenários hipotéticos — são operações em direto a rolar no exato mesmo motor que está prestes a usar."
            },
            howItWorks: "Como Funciona Tecnicamente",
            items: {
                boa: {
                    title: "BOA Architects",
                    industry: "Arquitetura e Design",
                    metric: "40 hrs/semana salvas",
                    quote: "Deixámos de nos afogar em papelada de regulamentação. Agora o sistema rascunha, audita e submete processos legais — enquanto nós focamos no design de espaços onde as pessoas realmente querem viver.",
                    technical: "Workflow multi-agente: um agente de Pesquisa audita os códigos de câmara municipais, um agente Escritor rascunha relatórios de conformidade arquitetónica, um Revisor assinala incompatibilidades no projeto e um agente de Ferramentas auto-guarda os pdf's através de uma integração do Google Drive. A base de conhecimentos guarda mais de 200 moldes regulamentares em Portugal, Espanha e Israel."
                },
                burtucala: {
                    title: "Burtucala Real Estate",
                    industry: "Investimento Imobiliário",
                    metric: "Prospeção 3× mais rápida",
                    quote: "Cada oportunidade de mercado é recolhida, analisada e apresentada ainda antes de terminarmos o nosso café da manhã. Passamos de reativos a proativos da noite para o dia.",
                    technical: "Rotinas programadas de inteligência arrancam às 06:00: um Agente Analista recolhe informação do mercado de parceiros API do idealista, INE e Banco de Portugal. Um Escritor compila os achados para um documento estruturado e um Agente de Conhecimento cruza-os contra as características do portfólio. Finalmente um alerta chega ao telemóvel por Telegram com um pedido de aprovação imediato para uma análise profunda."
                },
                realization: {
                    title: "Realization Group",
                    industry: "Consultoria & Projetos",
                    metric: "5 empresas, 1 operador",
                    quote: "Giro os meus negócios de arquitetura, investimento, consultoria, criação de conteúdo e software — tudo partir de uma central. O sistema não só assiste, opera ativamente.",
                    technical: "Aplicação da total metodologia FABRIC. Camada Foundation guarda o núcleo, identidade, e estratégias de empresas. A camada de Agentes coordena 6 agentes por cada área. Camada Brand assegura as 4 vozes separadas por cada marca isolada. A camada de Rotinas prevê e resolve publicações relatórios aos Domingo e de LinkedIn a cada x tempo. Outputs complexos e propostas seguem todos a mesma rigorosa linha de produção."
                }
            }
        }
    }
};

const languages = ['en', 'he', 'pt'];

languages.forEach(lang => {
    const filePath = path.join(localesPath, lang, 'translation.json');
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.painPoints = newTranslations[lang].painPoints;
        data.demoVideo = newTranslations[lang].demoVideo;
        data.caseStudies = newTranslations[lang].caseStudies;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Updated ${lang}/translation.json`);
    }
});
