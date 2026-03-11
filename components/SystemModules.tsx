import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Kanban,
  Workflow,
  Users,
  FileText,
  LineChart,
  BarChart3,
  Banknote,
  BriefcaseBusiness,
  ClipboardList,
} from 'lucide-react';

const modules = [
  {
    id: 'tasks',
    icon: CheckSquare,
    label: 'Задачи и проекты',
    color: 'text-emerald-600 bg-emerald-50',
    title: 'Task Manager для команды',
    description:
      'Управляйте задачами в едином месте: от входящих заявок до внутренних задач отдела. Канбан, таблица и Гант – в одном интерфейсе.',
    bullets: [
      'Канбан / таблица / Гант для разных команд',
      'Шаблоны задач и чек-листы по процессам',
      'Приоритеты, дедлайны, исполнители и наблюдатели',
      'История по задаче и файлы в одном окне',
    ],
  },
  {
    id: 'funnel',
    icon: Kanban,
    label: 'Воронка продаж',
    color: 'text-blue-600 bg-blue-50',
    title: 'CRM-воронка сделок',
    description:
      'Следите за всеми заявками: от первого контакта до оплаты. Воронка сделок синхронизирована с задачами и отчетами.',
    bullets: [
      'Настраиваемые этапы воронки под ваш sales-процесс',
      'Карточка сделки: контакт, бюджет, источник, история',
      'Автосоздание задач по этапам (звонок, встреча, КП)',
      'Статистика по конверсии и сумме на каждом этапе',
    ],
  },
  {
    id: 'clients',
    icon: Users,
    label: 'Клиенты и договоры',
    color: 'text-purple-600 bg-purple-50',
    title: 'Клиентская база и договоры',
    description:
      'Вся информация о клиентах, юрлицах и договорах – в одной системе. Больше никакого Excel и потерянных контактов.',
    bullets: [
      'Карточки клиентов с историей всех взаимодействий',
      'Учёт договоров, статусов и сроков продления',
      'Связка клиентов с сделками, задачами и оплатами',
      'Быстрый поиск по ИНН, названию и контактам',
    ],
  },
  {
    id: 'finance',
    icon: Banknote,
    label: 'Финансовое планирование',
    color: 'text-amber-600 bg-amber-50',
    title: 'Финансы и заявки на расходы',
    description:
      'Планируйте доходы и расходы по проектам и подразделениям. Удобный реестр заявок и контроль бюджетов.',
    bullets: [
      'Реестр заявок на расходы с согласованием',
      'План-факт по выручке и расходам',
      'Разрезы по подразделениям, статьям и проектам',
      'Экспорт данных для бухгалтера и собственника',
    ],
  },
  {
    id: 'processes',
    icon: Workflow,
    label: 'Бизнес-процессы',
    color: 'text-indigo-600 bg-indigo-50',
    title: 'Визуальный конструктор процессов',
    description:
      'Стройте цепочки действий: кто, когда и что должен сделать. Система сама создаёт задачи, уведомления и статусы.',
    bullets: [
      'Редактор процессов «из коробки» без программистов',
      'Триггеры: новая заявка, статус, дата, сумма',
      'Автоматические задачи, письма и напоминания',
      'Лог выполнения каждого процесса по шагам',
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    label: 'Аналитика и отчёты',
    color: 'text-sky-600 bg-sky-50',
    title: 'Дашборды для собственника и руководителей',
    description:
      'Онлайн-дашборды по выручке, задачам, загрузке команды и эффективности отделов. Никаких ручных сводок.',
    bullets: [
      'Воронка продаж и выручка по периодам',
      'Скорость обработки заявок и загрузка сотрудников',
      'Отчёты по задачам, срокам и статусам',
      'Экспорт в Google Sheets и PDF по запросу',
    ],
  },
  {
    id: 'team',
    icon: BriefcaseBusiness,
    label: 'Сотрудники и оргструктура',
    color: 'text-rose-600 bg-rose-50',
    title: 'Команда и роли в системе',
    description:
      'Права доступа, оргструктура и ответственность по задачам закреплены в системе. Каждый знает свою зону ответственности.',
    bullets: [
      'Оргструктура компании и роли в команде',
      'Права доступа по отделам и модулям',
      'История работы сотрудника в задачах и сделках',
      'Прозрачность ответственности по каждому процессу',
    ],
  },
];

export const SystemModules: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Что входит в систему <span className="text-brand">Taska</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Taska — это не просто CRM. Это единая операционная система, которая
            соединяет задачи, воронку продаж, финансы и бизнес-процессы в одну
            картину. Ниже — модули, которые вы получите «из коробки».
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {modules.map((module, index) => (
            <motion.article
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold ${module.color}`}>
                  <module.icon size={18} className="mr-1.5" />
                  <span>{module.label}</span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {module.title}
              </h3>
              <p className="text-gray-500 mb-4">{module.description}</p>

              <ul className="space-y-2 text-sm text-gray-600">
                {module.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 max-w-3xl border border-dashed border-brand/30 rounded-3xl px-6 md:px-10 py-8 bg-brand/3">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand mb-2">
            Настройка под ваш бизнес
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Дорабатываем модули под ваши процессы
          </h3>
          <p className="text-gray-500 text-base">
            Базовая Taska уже закрывает типовые задачи по задачам, продажам и
            финансам. Дальше мы подстраиваем систему под вашу отрасль: добавляем
            поля, статусы, автоматизации и отчёты. В итоге вы получаете
            управляемый бизнес, а не «ещё одну CRM».
          </p>
        </div>
      </div>
    </section>
  );
};

