import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isLocalizedPage, localizedPath, splitLangPath, type Lang } from '@/seo/lang';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();

    // On pages that exist in every language, switching language means going to that page's URL.
    const switchTo = (code: Lang) => {
        const { base } = splitLangPath(pathname);
        if (isLocalizedPage(base)) navigate(localizedPath(base, code) + hash);
        void i18n.changeLanguage(code);
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'pt', label: 'Português' },
        { code: 'he', label: 'עברית' },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 px-0">
                    <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => switchTo(lang.code as Lang)}
                        className={i18n.resolvedLanguage === lang.code ? 'font-bold' : ''}
                        lang={lang.code}
                    >
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
