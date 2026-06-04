import {useEffect} from 'react';
import {DATA_CONTROLLER, LEGAL_LINK_PROPS, ROUTES, SITE_NAME} from '../constants/legal.ts';
import {LegalPageLayout, LegalSection} from './LegalPageLayout.tsx';

export function CookiePolicyPage() {
  useEffect(() => {
    document.title = `Политика за бисквитки | ${SITE_NAME}`;
  }, []);

  return (
    <LegalPageLayout title="Политика за бисквитки и съгласие">
      <LegalSection title="1. Какво представляват бисквитките">
        <p>
          Бисквитките са малки текстови файлове, които се записват на вашето устройство при
          посещение на уебсайт. Подобни технологии включват localStorage, пиксели и скриптове за
          анализ.           На сайта „{SITE_NAME}“ Google Analytics и Microsoft Clarity се използват{' '}
          <strong>само след вашето изрично съгласие</strong>. Vercel Analytics работи за основна
          статистика на посещенията независимо от банера, освен записа на избора ви за бисквитки.
        </p>
      </LegalSection>

      <LegalSection title="2. Как работи съгласието">
        <p>
          При първо посещение ви показваме банер в долния десен ъгъл с бутони „Приемам“ и
          „Отхвърлям“. Докато не натиснете „Приемам“, <strong>не зареждаме</strong> Google
          Analytics и Microsoft Clarity. Vercel Analytics продължава да работи за агрегирана
          статистика на посещенията.
        </p>
        <p>
          Вашият избор се записва локално в браузъра (localStorage) за <strong>3 месеца</strong>,
          след което отново ще бъдете попитани. Можете да промените избора си по всяко време чрез
          „Настройки за бисквитки“ в долната част на сайта или на тази страница.
        </p>
      </LegalSection>

      <LegalSection title="3. Видове бисквитки и технологии">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="py-2 pr-3 font-semibold text-neutral-900">Категория</th>
                <th className="py-2 pr-3 font-semibold text-neutral-900">Цел</th>
                <th className="py-2 pr-3 font-semibold text-neutral-900">Доставчик</th>
                <th className="py-2 font-semibold text-neutral-900">Съгласие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="py-3 pr-3 align-top">Необходими / предпочитания</td>
                <td className="py-3 pr-3 align-top">Запомняне на избора ви за бисквитки</td>
                <td className="py-3 pr-3 align-top">{DATA_CONTROLLER} (localStorage)</td>
                <td className="py-3 align-top">Не изисква отделно съгласие (необходими за правно съответствие)</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 align-top">Аналитични</td>
                <td className="py-3 pr-3 align-top">
                  Статистика за посещаемост, поведение на потребителите, подобряване на сайта
                </td>
                <td className="py-3 pr-3 align-top">Google Analytics</td>
                <td className="py-3 align-top">Само след „Приемам“</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 align-top">Аналитични</td>
                <td className="py-3 pr-3 align-top">Топлинни карти, записи на сесии (без чувствителни полета от форми)</td>
                <td className="py-3 pr-3 align-top">Microsoft Clarity</td>
                <td className="py-3 align-top">Само след „Приемам“</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 align-top">Аналитични</td>
                <td className="py-3 pr-3 align-top">Агрегирана статистика за посещения</td>
                <td className="py-3 pr-3 align-top">Vercel Analytics</td>
                <td className="py-3 align-top">Не изисква съгласие чрез банера</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Управление чрез браузъра">
        <p>
          Можете да изтриете или блокирате бисквитки от настройките на браузъра си. Ако блокирате
          всички бисквитки, банерът и записът на съгласие може да не работят коректно. Инструкции
          обикновено са в раздел „Поверителност“ или „Бисквитки“ на вашия браузър.
        </p>
      </LegalSection>

      <LegalSection title="5. Оттегляне на съгласието">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Натиснете „Настройки за бисквитки“ в долната част на която и да е страница на сайта.</li>
          <li>Изберете „Отхвърлям“ в банера.</li>
          <li>
            Google Analytics и Microsoft Clarity ще бъдат спрени; Vercel Analytics остава активен.
            Вече заредени скриптове могат да изискват изчистване на кеша/бисквитки от браузъра за
            пълно прекратяване.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="6. Трети страни">
        <p>
          Всяка трета страна има собствена политика за поверителност. Препоръчваме преглед на
          политиките на Google, Microsoft и Vercel, посочени в{' '}
          <a
            href={ROUTES.privacy}
            {...LEGAL_LINK_PROPS}
            className="font-medium text-neutral-900 underline"
          >
            Политиката за поверителност
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Правно основание">
        <p>
          Аналитичните бисквитки се обработват на основание вашето <strong>съгласие</strong> по
          чл. 6, ал. 1, б. „а“ от GDPR и чл. 25 от ЗЗЛД. Отхвърлянето не засяга достъпа до
          информацията за курса на сайта.
        </p>
      </LegalSection>

      <LegalSection title="8. Контакт">
        <p>
          Въпроси относно бисквитките и личните данни: свържете се с {DATA_CONTROLLER} чрез
          регистрационната форма на курса с тема „Бисквитки / лични данни“, или вижте{' '}
          <a
            href={ROUTES.privacy}
            {...LEGAL_LINK_PROPS}
            className="font-medium text-neutral-900 underline"
          >
            Политика за поверителност
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
