const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../public/locales');

const en = {
    nav: {
        getStarted: 'Get Started',
        toggleMenu: 'Toggle menu'
    },
    navItems: {
        fabric: 'FABRIC',
        features: 'Features',
        pricing: 'Pricing',
        faq: 'FAQ'
    },
    footer: {
        partOf: 'Part of the',
        ecosystem: 'ecosystem.',
        realization: 'Realization',
        links: {
            telegram: 'Telegram',
            support: 'Support',
            faq: 'FAQ'
        },
        rights: 'RealizeOS. All rights reserved.'
    }
};

const he = {
    nav: {
        getStarted: 'בואו נתחיל',
        toggleMenu: 'תפריט'
    },
    navItems: {
        fabric: 'מערכת FABRIC',
        features: 'פיצ\'רים',
        pricing: 'תמחור',
        faq: 'שאלות ותשובות'
    },
    footer: {
        partOf: 'חלק מ-',
        ecosystem: 'אקוסיסטם.',
        realization: 'Realization',
        links: {
            telegram: 'טלגרם',
            support: 'תמיכה',
            faq: 'שאלות נפוצות'
        },
        rights: 'RealizeOS. כל הזכויות שמורות.'
    }
};

const pt = {
    nav: {
        getStarted: 'Começar',
        toggleMenu: 'Alternar menu'
    },
    navItems: {
        fabric: 'FABRIC',
        features: 'Recursos',
        pricing: 'Preços',
        faq: 'FAQ'
    },
    footer: {
        partOf: 'Parte do ecossistema da',
        ecosystem: '.',
        realization: 'Realization',
        links: {
            telegram: 'Telegram',
            support: 'Suporte',
            faq: 'FAQ'
        },
        rights: 'RealizeOS. Todos os direitos reservados.'
    }
};

const updates = { en, he, pt };

for (const [lang, newData] of Object.entries(updates)) {
    const filePath = path.join(localesPath, lang, 'translation.json');
    console.log('Updating', filePath);

    if (fs.existsSync(filePath)) {
        const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        existing.nav = newData.nav;
        existing.navItems = newData.navItems;
        existing.footer = newData.footer;

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
        console.log(`Updated ${lang}/translation.json successfully`);
    } else {
        console.log(`ERROR: File not found ${filePath}`);
    }
}
