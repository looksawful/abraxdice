'use client';

import { readBrandStorage } from '@/lib/browserStorage';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NOTICE_KEY = 'abraxdice:cookie-notice:v1';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try { setVisible(readBrandStorage(NOTICE_KEY) !== '1'); }
    catch { setVisible(true); }
  }, []);

  function acknowledge() {
    try { localStorage.setItem(NOTICE_KEY, '1'); }
    catch { /* The notice can still be dismissed for this visit. */ }
    setVisible(false);
  }

  if (!visible) return null;

  return <aside className="cookie-banner stack" aria-label="Использование cookies">
    <p>Сайт сохраняет корзину, настройки конструктора и тему в вашем браузере. Подробнее об использовании cookies и сторонних сервисов в нашей политике.</p>
    <div className="cookie-banner-actions cluster">
      <Link href="/cookies">Узнать подробнее</Link>
      <button className="button button-black" type="button" onClick={acknowledge}>Принять</button>
    </div>
  </aside>;
}
