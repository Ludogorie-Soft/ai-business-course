import {useEffect} from 'react';
import {DATA_CONTROLLER, LEGAL_LINK_PROPS, ROUTES, SITE_NAME} from '../constants/legal.ts';
import {LegalPageLayout, LegalSection} from './LegalPageLayout.tsx';

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = `Политика за поверителност | ${SITE_NAME}`;
  }, []);

  return (
    <LegalPageLayout title="Политика за поверителност">
      <LegalSection title="1. Въведение">
        <p>
          Настоящата политика за поверителност описва как {DATA_CONTROLLER} („ние“, „нас“)
          обработва лични данни при използване на уебсайта за безплатния курс „{SITE_NAME}“.
          Спазваме Регламент (ЕС) 2016/679 (GDPR), Закона за защита на личните данни на
          Република България и свързаното законодателство.
        </p>
      </LegalSection>

      <LegalSection title="2. Администратор на лични данни">
        <p>
          <strong>Администратор:</strong> {DATA_CONTROLLER}
        </p>
        <p>
          За въпроси относно обработването на лични данни можете да се свържете с нас чрез
          официалната регистрационна форма за курса (Google Forms), достъпна от сайта, като
          посочите тема „Защита на лични данни“.
        </p>
      </LegalSection>

      <LegalSection title="3. Какви данни обработваме">
        <p>
          <strong>Данни при посещение (Google Analytics, Microsoft Clarity — само след съгласие):</strong>{' '}
          анонимизирани или псевдонимизирани технически данни — IP адрес (обикновено съкратен),
          тип браузър и устройство, прегледани страници, приблизителна география, продължителност
          на посещението, взаимодействия със страницата (кликове, превъртане), източник на
          трафик.
        </p>
        <p>
          <strong>Данни при посещение (Vercel Analytics — винаги):</strong> агрегирана статистика
          за посещения и страници, без да изисква отделно съгласие чрез банера за бисквитки.
        </p>
        <p>
          <strong>Данни при регистрация за курса:</strong> когато използвате връзката към Google
          Forms, предоставените от вас данни (напр. име, имейл и др.) се обработват от Google
          като отделен администратор/обработващ съгласно политиката на Google. Ние не контролираме
          съдържанието на тази форма директно на нашия сървър.
        </p>
        <p>
          <strong>Локално съхранение:</strong> запис на вашия избор относно бисквитките
          (приемане/отхвърляне) в localStorage на браузъра ви за срок до 3 месеца.
        </p>
      </LegalSection>

      <LegalSection title="4. Цели и правни основания">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Информиране за курса и регистрация</strong> — законен интерес / изпълнение на
            стъпки по ваше искане преди сключване на договор (чл. 6, ал. 1, б. „б“ и „е“ от GDPR).
          </li>
          <li>
            <strong>Анализ и подобряване на сайта</strong> (Google Analytics, Microsoft Clarity) —{' '}
            <strong>изрично съгласие</strong> (чл. 6, ал. 1, б. „а“ от GDPR). Без съгласие не се
            зареждат.
          </li>
          <li>
            <strong>Основна статистика на посещенията</strong> (Vercel Analytics) — законен
            интерес за работа и сигурност на сайта (чл. 6, ал. 1, б. „е“ от GDPR).
          </li>
          <li>
            <strong>Запомняне на избора ви за бисквитки</strong> — законен интерес / необходимост
            за спазване на правните ни задължения (чл. 6, ал. 1, б. „с“ и „е“ от GDPR).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Получатели и трансфер на данни">
        <p>Данни могат да бъдат обработвани от:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Vercel Inc.</strong> (Vercel Analytics, винаги при посещение) —{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="text-neutral-900 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Политика на Vercel
            </a>
          </li>
          <li>
            <strong>Google LLC</strong> (Google Analytics, само при съгласие) —{' '}
            <a
              href="https://policies.google.com/privacy"
              className="text-neutral-900 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Политика на Google
            </a>
          </li>
          <li>
            <strong>Microsoft Corporation</strong> (Clarity, само при съгласие) —{' '}
            <a
              href="https://privacy.microsoft.com/"
              className="text-neutral-900 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Политика на Microsoft
            </a>
          </li>
        </ul>
        <p>
          Някои доставчици могат да обработват данни извън ЕИП. В такива случаи се прилагат
          подходящи гаранции по GDPR (напр. стандартни договорни клаузи), където е приложимо.
        </p>
      </LegalSection>

      <LegalSection title="6. Срок на съхранение">
        <ul className="list-disc space-y-2 pl-5">
          <li>Избор за бисквитки: до 3 месеца в localStorage, след което отново се пита за съгласие.</li>
          <li>
            Аналитични данни: съгласно политиките на съответните доставчици (обикновено от няколко
            месеца до 26 месеца за GA, според настройките).
          </li>
          <li>Данни в Google Forms: съгласно политиката и настройките на формата.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Вашите права">
        <p>Имате право на:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>достъп до личните ви данни;</li>
          <li>коригиране на неточни данни;</li>
          <li>изтриване („право да бъдеш забравен“), когато е приложимо;</li>
          <li>ограничаване на обработването;</li>
          <li>възражение срещу обработване на основание законен интерес;</li>
          <li>
            оттегляне на съгласието по всяко време — без да засяга законността на обработването
            преди оттегляне (бутон „Настройки за бисквитки“ в долната част на сайта);
          </li>
          <li>преносимост на данните, когато е приложимо;</li>
          <li>
            подаване на жалба до{' '}
            <strong>Комисията за защита на личните данни (КЗЛД)</strong> —{' '}
            <a
              href="https://www.cpdp.bg/"
              className="text-neutral-900 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cpdp.bg
            </a>
            .
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Сигурност">
        <p>
          Прилагаме подходящи технически и организационни мерки (HTTPS, ограничен достъп,
          минимизиране на събираните данни). Нито една система не може да гарантира 100% сигурност.
        </p>
      </LegalSection>

      <LegalSection title="9. Деца">
        <p>
          Сайтът е насочен към обща аудитория за образователни цели. Не събираме умишлено данни
          от деца под 16 години без съгласие на родител/настойник, където това се изисква от закона.
        </p>
      </LegalSection>

      <LegalSection title="10. Промени">
        <p>
          Можем да актуализираме тази политика. Съществени промени ще бъдат отразени на тази
          страница с нова дата. Препоръчваме периодичен преглед.
        </p>
        <p>
          Подробности за бисквитките:{' '}
          <a
            href={ROUTES.cookies}
            {...LEGAL_LINK_PROPS}
            className="font-medium text-neutral-900 underline"
          >
            Политика за бисквитки
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
