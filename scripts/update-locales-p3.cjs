const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

const newTranslations = {
    en: {
        fabricSystem: {
            header: {
                title: "The FABRIC System",
                subtitle: "How we structure operational reality so AI can navigate it."
            },
            layers: {
                foundations: {
                    title: "Foundations",
                    description: "The core context of your venture. Values, market positioning, target audience, and brand voice. This ensures every agent acts in alignment with your underlying strategy, not just generic instructions."
                },
                agents: {
                    title: "Agents",
                    description: "Specialized AI personas with explicit roles, permissions, and tool access. A copywriter agent shouldn't touch financial models. We define who does what, generating a coherent digital workforce."
                },
                brand: {
                    title: "Brand",
                    description: "Your unique visual and tonal identity encoded into rules. Every output is filtered through this layer to ensure it sounds like you, looks like you, and carries your specific authority."
                },
                routines: {
                    title: "Routines",
                    description: "Automated, scheduled workflows. From pulling daily market reports to drafting weekly investor updates. These are the heartbeat operations that happen whether you are awake or asleep."
                },
                intelligence: {
                    title: "Intelligence",
                    description: "The continuous learning loop. Agents analyze outcomes, flag anomalies, and update the Foundations layer. The system gets smarter and more aligned with your specific reality over time."
                },
                creations: {
                    title: "Creations",
                    description: "The final, structured outputs ready for human review or direct publishing. Proposals, code commits, analytical reports, or social content—delivered in perfect formatting."
                }
            }
        },
        comparison: {
            header: {
                title: "The Unfair Advantage",
                subtitle: "How a coordinated engine compares to traditional operations."
            },
            columns: {
                traditional: "Traditional Teams",
                realize: "RealizeOS Engine"
            },
            items: {
                speed: {
                    label: "Execution Speed",
                    traditional: "Days to weeks",
                    realize: "Minutes to hours"
                },
                bottlenecks: {
                    label: "Bottlenecks",
                    traditional: "Human availability",
                    realize: "API rate limits"
                },
                context: {
                    label: "Context Retention",
                    traditional: "Fades with turnover",
                    realize: "Perfect & compounding"
                },
                cost: {
                    label: "Scaling Cost",
                    traditional: "Linear (headcount)",
                    realize: "Marginal (compute)"
                },
                quality: {
                    label: "Quality Control",
                    traditional: "Varies by individual",
                    realize: "Systematically enforced"
                }
            }
        },
        howItWorks: {
            header: {
                title: "Deployment Process",
                subtitle: "How we transition you from chaotic middleware to a unified engine."
            },
            steps: {
                audit: {
                    title: "Operational Audit",
                    description: "We map your current workflows, identify friction points, and extract the tacit knowledge stuck in your team's heads."
                },
                architecture: {
                    title: "System Architecture",
                    description: "Design the FABRIC stack tailored to your specific venture. Defining the necessary agents, routines, and tool integrations."
                },
                integration: {
                    title: "Knowledge Integration",
                    description: "Loading your specific context—past projects, brand guidelines, operational manuals—into the Foundations layer."
                },
                deployment: {
                    title: "Engine Deployment",
                    description: "Launching the coordinated system. You stop doing the work and start managing the outputs of your digital workforce."
                }
            }
        },
        delivery: {
            header: {
                title: "What You Actually Get",
                subtitle: "We don't sell software subscriptions. We build and hand over a functioning operational engine."
            },
            deliverables: {
                engine: {
                    title: "The RealizeOS Engine",
                    description: "Your customized AI operational system deployed on secure infrastructure. Full access, full control."
                },
                agents: {
                    title: "Custom Agent Workforce",
                    description: "Pre-configured, specialized agents designed specifically for your industry's workflows and your company's processes."
                },
                playbooks: {
                    title: "Operational Playbooks",
                    description: "Documentation on how to command the system, modify routines, and add new agents as your venture scales."
                },
                support: {
                    title: "Optimization Support",
                    description: "30 days of direct technical support to refine agent behavior, tweak routines, and ensure smooth adoption."
                }
            }
        }
    },
    he: {
        fabricSystem: {
            header: {
                title: "מערכת FABRIC",
                subtitle: "איך אנו מבנים את המציאות התפעולית כך שהבינה המלאכותית תוכל לנווט בה."
            },
            layers: {
                foundations: {
                    title: "יסודות (Foundations)",
                    description: "ההקשר המרכזי של המיזם שלכם. ערכים, מיצוב בשוק, קהל יעד וקול המותג. זה מבטיח שכל סוכן פועל בהלימה לאסטרטגיה הבסיסית שלכם, ולא רק לפי הוראות גנריות."
                },
                agents: {
                    title: "סוכנים (Agents)",
                    description: "פרסונות בינה מלאכותית מתמחות עם תפקידים ברורים, הרשאות וגישה לכלים. סוכן קופירייטר לא אמור לגעת במודלים פיננסיים. אנו מגדירים מי עושה מה, ומייצרים כוח אדם דיגיטלי קוהרנטי."
                },
                brand: {
                    title: "מותג (Brand)",
                    description: "הזהות הוויזואלית והטונאלית הייחודית שלכם מקודדת לחוקים. כל פלט מסונן דרך שכבה זו כדי להבטיח שהוא נשמע כמוכם, נראה כמוכם ונושא את הסמכות הספציפית שלכם."
                },
                routines: {
                    title: "שגרות (Routines)",
                    description: "תהליכי עבודה אוטומטיים ומתוזמנים. ממשיכת דוחות שוק יומיים ועד לניסוח עדכוני משקיעים שבועיים. אלו הן פעולות הליבה שמתרחשות בין אם אתם ערים או ישנים."
                },
                intelligence: {
                    title: "מודיעין (Intelligence)",
                    description: "לולאת הלמידה המתמשכת. סוכנים מנתחים תוצאות, מסמנים חריגות ומעדכנים את שכבת היסודות. המערכת הופכת לחכמה יותר ומותאמת יותר למציאות הספציפית שלכם לאורך זמן."
                },
                creations: {
                    title: "יצירות (Creations)",
                    description: "התוצרים הסופיים והמובנים המוכנים לבדיקה אנושית או לפרסום ישיר. הצעות מחיר, עדכוני קוד, דוחות אנליטיים או תוכן חברתי — מוגשים בעיצוב מושלם."
                }
            }
        },
        comparison: {
            header: {
                title: "היתרון הבלתי הוגן",
                subtitle: "כיצד מנוע מתואם משתווה לפעולות מסורתיות."
            },
            columns: {
                traditional: "צוותים מסורתיים",
                realize: "מנוע RealizeOS"
            },
            items: {
                speed: {
                    label: "מהירות ביצוע",
                    traditional: "ימים עד שבועות",
                    realize: "דקות עד שעות"
                },
                bottlenecks: {
                    label: "צווארי בקבוק",
                    traditional: "זמינות אנושית",
                    realize: "מגבלות קצב API"
                },
                context: {
                    label: "שימור ידע (Context)",
                    traditional: "דועך עם תחלופת עובדים",
                    realize: "מושלם והולך ומצטבר"
                },
                cost: {
                    label: "עלות צמיחה (Scaling)",
                    traditional: "ליניארית (לפי עובדים)",
                    realize: "שולית (עלויות מחשוב)"
                },
                quality: {
                    label: "בקרת איכות",
                    traditional: "משתנה לפי אדם",
                    realize: "נאכפת באופן שיטתי"
                }
            }
        },
        howItWorks: {
            header: {
                title: "תהליך הפריסה",
                subtitle: "איך אנחנו מעבירים אתכם מתיווך כאוטי למנוע אחוד."
            },
            steps: {
                audit: {
                    title: "ביקורת תפעולית",
                    description: "אנו ממפים את תהליכי העבודה הנוכחיים שלכם, מזהים נקודות חיכוך ומחלצים את הידע הסמוי שתקוע בראשי הצוות שלכם."
                },
                architecture: {
                    title: "ארכיטקטורת מערכת",
                    description: "תכנון מחסנית ה-FABRIC המותאמת למיזם הספציפי שלכם. הגדרת הסוכנים הדרושים, השגרות ושילובי הכלים."
                },
                integration: {
                    title: "שילוב ידע",
                    description: "טעינת ההקשר הספציפי שלכם — פרויקטים קודמים, הנחיות מותג, מדריכי תפעול — לתוך שכבת היסודות."
                },
                deployment: {
                    title: "פריסת מנוע",
                    description: "השקת המערכת המתואמת. אתם מפסיקים לעשות את העבודה ומתחילים לנהל את התוצרים של כוח האדם הדיגיטלי שלכם."
                }
            }
        },
        delivery: {
            header: {
                title: "מה אתם מקבלים בפועל",
                subtitle: "אנחנו לא מוכרים מנויי תוכנה. אנחנו בונים ומוסרים מנוע תפעולי מתפקד."
            },
            deliverables: {
                engine: {
                    title: "המנוע – RealizeOS",
                    description: "מערכת ההפעלה המותאמת אישית שלכם, הפועלת על תשתית מאובטחת. גישה מלאה, שליטה מלאה."
                },
                agents: {
                    title: "צוות סוכנים מותאם",
                    description: "סוכנים מתמחים ומוגדרים מראש, שתוכננו במיוחד עבור תהליכי העבודה בתעשייה שלכם והתהליכים הייחודיים של החברה."
                },
                playbooks: {
                    title: "מדריכי תפעול (Playbooks)",
                    description: "תיעוד מקיף כיצד לפקד על המערכת, לשנות שגרות ולהוסיף סוכנים חדשים ככל שהמיזם או החברה צומחים."
                },
                support: {
                    title: "תמיכת אופטימיזציה",
                    description: "30 ימים של תמיכה טכנית ישירה כדי לחדד התנהגות סוכנים, לשפר שגרות ולהבטיח אימוץ חלק בארגון."
                }
            }
        }
    },
    pt: {
        fabricSystem: {
            header: {
                title: "O Sistema FABRIC",
                subtitle: "Como estruturamos a realidade operacional para que as IAs a possam navegar."
            },
            layers: {
                foundations: {
                    title: "Fundações (Foundations)",
                    description: "O contexto nuclear do seu negócio. Valores, posicionamento no mercado, público-alvo, identidade da marca. Isto garante que os seus agentes pensem alinhados aos seus objetivos estratégicos, e não apenas seguindo regras gerais."
                },
                agents: {
                    title: "Agentes (Agents)",
                    description: "Personas de IA altamente especializadas com papéis, ferramentas e permissões restritas. Agentes financeiros não mexem no código do site. Nós predefinimos e separamos as competências com clareza criando assim a estrutura ideal de uma força de trabalho inteiramente digital."
                },
                brand: {
                    title: "Marca (Brand)",
                    description: "Sua identidade visual e narrativa traduzida em regras e comandos concretos. Exigimos que outputs passem primeiro pela verificação de qualidade da IA (QA) garantindo consistência em tudo o que faz da forma como costuma fazer."
                },
                routines: {
                    title: "Rotinas (Routines)",
                    description: "Processos ou rotinas programadas e autossuficiêntes (cron jobs). Produzir sumos diários sobre atividade das startups de rivais ou atualizações ao Sábado p/os investidores da empresa. O trabalho nunca para, quer esteja descansando ou executando."
                },
                intelligence: {
                    title: "Inteligência (Intelligence)",
                    description: "O efeito cumulativo e composto do 'looping' operacional constante. Analisar as iterações (o que correu mal e bem) para atualizar as directrizes 'Fundation'. O sistema adapta-se gradualmente tornando-se mais fiel e capaz aos exigentes detalhes práticos da vossa empresa."
                },
                creations: {
                    title: "Criações (Creations)",
                    description: "A saída palpável e perfeita pronta a utilizar (Apresentações, contratos de cliente preenchidos, documentação de relatórios extensos, etc...)."
                }
            }
        },
        comparison: {
            header: {
                title: "A Vantagem Injusta",
                subtitle: "Como um motor coordenado se compara às operações tradicionais."
            },
            columns: {
                traditional: "Equipas Tradicionais",
                realize: "Motor RealizeOS"
            },
            items: {
                speed: {
                    label: "Velocidade de Execução",
                    traditional: "Dias a semanas",
                    realize: "Minutos a horas"
                },
                bottlenecks: {
                    label: "Gargalos",
                    traditional: "Disponibilidade humana",
                    realize: "Limites de API"
                },
                context: {
                    label: "Retenção de Conhecimento",
                    traditional: "Desvanece com a rotatividade",
                    realize: "Perfeita e cumulativa"
                },
                cost: {
                    label: "Custo de Escala",
                    traditional: "Linear (por contratação)",
                    realize: "Marginal (por computação)"
                },
                quality: {
                    label: "Controlo de Qualidade",
                    traditional: "Varia por indivíduo",
                    realize: "Sistematicamente imposto"
                }
            }
        },
        howItWorks: {
            header: {
                title: "Processo de Implementação",
                subtitle: "Como fazemos a transição do midlleware caótico para um motor unificado."
            },
            steps: {
                audit: {
                    title: "Auditoria Operacional",
                    description: "Mapeamos os processos rotinários e lentos atuais, verificamos gargalos sistémicos, traduzindo para documentação rigorosa e explícita."
                },
                architecture: {
                    title: "Arquitetura do Sistema",
                    description: "Elaborar o design técnico da 'stack FABRIC' dimensionado à viabilidade atual do negócio. Definir infraestrutura (Modelos, rotinas e bases de conhecimento)."
                },
                integration: {
                    title: "Integração de Conhecimento",
                    description: "Injectar a informação central nuclear (Projetos antigos do negócio, regras de formatação, guias de escrita para colaboradores) para a fundação."
                },
                deployment: {
                    title: "Ativação do Motor",
                    description: "Colocamos as IAs a correr autonomamente os sistemas operacionais. Vai parar de fazer o trabalho sujo passando meramente a delegar, conferir a qualidade ou ditar aos agentes para aprovar iterações no momento."
                }
            }
        },
        delivery: {
            header: {
                title: "O Que Na Verdade Entrega",
                subtitle: "Nós não vendemos assinaturas de software. Construímos e passamos as chaves a si para usar um motor operacional em pleno controlo."
            },
            deliverables: {
                engine: {
                    title: "O Motor RealizeOS",
                    description: "A sua própria plataforma IA unificada pronta a rodar através da sua hospedagem e servidores encriptados e isolados com Controlo Total."
                },
                agents: {
                    title: "Uma Equipa Especializada",
                    description: "Recursos técnicos perfeitamente instruídos na área da sua empresa, programados sem margem e formatados ao gosto das regras do seu negócio."
                },
                playbooks: {
                    title: "Guias Pragmáticos de Operação",
                    description: "Nós orientamo-lo e educamo-lo o suficiente para operar isto na linha do tempo para vir saber facilmente atualizar directrizes de bots ou interlaçar mais um."
                },
                support: {
                    title: "Acompanhamento Técnico",
                    description: "Garantimos-lhe suporte rigoroso 30 dias contínuo às correções em tempo real à mínima falha de comportamento ou problema grave pós-lançamento de produção."
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
        data.fabricSystem = newTranslations[lang].fabricSystem;
        data.comparison = newTranslations[lang].comparison;
        data.howItWorks = newTranslations[lang].howItWorks;
        data.delivery = newTranslations[lang].delivery;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Updated ${lang}/translation.json`);
    }
});
