/* ─────────────────────────────────────────────
 * Brand Wizard Page — Route: /wizard
 * ───────────────────────────────────────────── */
import { useNavigate } from 'react-router-dom';
import { BrandWizardAI } from '@/components/wizard/BrandWizardAI';

export function BrandWizardPage() {
  const navigate = useNavigate();

  return (
    <BrandWizardAI onClose={() => navigate('/')} />
  );
}

export default BrandWizardPage;
