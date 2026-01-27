import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowRight, Activity, Zap, BarChart3, Users, Calendar } from 'lucide-react';
import { trackMetrikaGoal } from '../services/metrics';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-12 overflow-hidden bg-surface-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none"></div>
      
      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[100px] rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 text-gray-900"
          >
            Индивидуальные системы <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">управления бизнесом</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Разрабатываем модульные CRM, ERP и Task-менеджеры специально под ваши процессы. 
            Полный контроль, прозрачность и интеграция с Telegram.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button size="md" className="w-full sm:w-auto min-w-[160px]" icon={<ArrowRight size={18} />} onClick={onOpenModal}>
              Заказать систему
            </Button>
            <a
              href="https://demo.taska.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackMetrikaGoal('demo_click')}
            >
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto min-w-[160px]"
              >
                Демо
              </Button>
            </a>
          </motion.div>

          {/* Abstract UI Visualization */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, y: 100 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="mt-20 w-full relative perspective-1000"
          >
            <div className="relative mx-auto max-w-5xl h-[450px] md:h-[550px] bg-white rounded-t-3xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
              {/* Fake Browser Top */}
              <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/80 backdrop-blur-md justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="h-6 w-1/3 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400 font-mono">
                   crm.taska.uz/dashboard
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
              
              {/* Fake UI Body */}
              <div className="flex-1 p-6 flex gap-6 bg-gray-50/50 overflow-hidden">
                {/* Sidebar */}
                <div className="w-16 md:w-56 hidden md:flex flex-col gap-3 shrink-0">
                  <div className="flex items-center gap-3 px-2 mb-4">
                     <div className="w-8 h-8 rounded bg-brand flex items-center justify-center text-white font-bold text-xs">T</div>
                     <span className="font-bold text-gray-700">Taska Core</span>
                  </div>
                  {[
                    { label: "Дашборд", active: true },
                    { label: "Задачи", active: false },
                    { label: "Проекты", active: false },
                    { label: "Финансы", active: false },
                    { label: "Команда", active: false },
                  ].map((item, i) => (
                    <div key={i} className={`h-9 w-full rounded-lg flex items-center px-3 text-sm font-medium ${item.active ? 'bg-white text-brand shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-100'}`}>
                       {item.label}
                    </div>
                  ))}
                  
                  <div className="mt-auto p-4 bg-brand/5 rounded-xl border border-brand/10">
                    <div className="text-xs font-semibold text-brand mb-1">План продаж</div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-brand h-full w-[85%]"></div>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 text-right">85%</div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-4 min-w-0">
                   {/* Top Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-28 rounded-xl bg-white border border-gray-100 p-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                       <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Выручка (апр)</div>
                            <div className="text-2xl font-bold text-gray-900">42.5M <span className="text-sm font-normal text-gray-400">UZS</span></div>
                          </div>
                          <div className="p-2 bg-green-50 text-green-600 rounded-lg"><BarChart3 size={18}/></div>
                       </div>
                       <div className="mt-3 flex items-end gap-1 h-8">
                          {[40, 60, 45, 70, 85, 60, 75].map((h, i) => (
                             <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-green-100 rounded-t-sm hover:bg-green-200 transition-colors"></div>
                          ))}
                       </div>
                    </div>

                    <div className="h-28 rounded-xl bg-white border border-gray-100 p-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                       <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Задачи</div>
                            <div className="text-2xl font-bold text-gray-900">12 <span className="text-sm font-normal text-gray-400">в работе</span></div>
                          </div>
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity size={18}/></div>
                       </div>
                       <div className="mt-4 flex -space-x-2">
                          {[1,2,3,4].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">
                                {i === 4 ? '+3' : ''}
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="h-28 rounded-xl bg-white border border-gray-100 p-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                       <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Эффективность</div>
                            <div className="text-2xl font-bold text-gray-900">98%</div>
                          </div>
                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Zap size={18}/></div>
                       </div>
                        <div className="mt-4 flex items-center gap-2">
                           <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full w-[98%] bg-yellow-400"></div>
                           </div>
                        </div>
                    </div>
                  </div>
                  
                  {/* Kanban/Grid Layout */}
                  <div className="flex-1 flex gap-4 overflow-hidden">
                     {/* Tasks Column */}
                     <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
                           <span className="font-semibold text-sm text-gray-700">В работе</span>
                           <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">4</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                           <div className="flex gap-2 mb-2">
                              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded">DEV</span>
                              <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded">HIGH</span>
                           </div>
                           <div className="text-sm font-medium text-gray-800 mb-2">Интеграция Telegram бота</div>
                           <div className="flex justify-between items-center mt-2">
                              <Users size={14} className="text-gray-400"/>
                              <div className="text-[10px] text-gray-400">Сегодня</div>
                           </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm opacity-80">
                           <div className="text-sm font-medium text-gray-800 mb-2">Верстка лендинга</div>
                           <div className="w-full bg-gray-100 h-1 rounded-full mt-2"><div className="w-1/2 bg-blue-500 h-full rounded-full"></div></div>
                        </div>
                     </div>

                     {/* Calendar/Timeline Column - Hidden on small mobile */}
                     <div className="flex-[2] bg-white rounded-xl border border-gray-100 p-4 shadow-sm hidden sm:block">
                        <div className="flex justify-between items-center mb-4">
                           <h4 className="font-semibold text-sm">График проектов</h4>
                           <Calendar size={16} className="text-gray-400"/>
                        </div>
                        <div className="space-y-4">
                           {[
                              { name: 'ERP System Launch', start: 0, w: 60, col: 'bg-brand' },
                              { name: 'Mobile App Design', start: 30, w: 40, col: 'bg-blue-500' },
                              { name: 'Marketing Strategy', start: 10, w: 30, col: 'bg-yellow-500' }
                           ].map((bar, i) => (
                              <div key={i} className="relative h-8 bg-gray-50 rounded-md flex items-center px-2">
                                 <div className="absolute top-1 bottom-1 rounded bg-opacity-20 left-0 transition-all" style={{ left: `${bar.start}%`, width: `${bar.w}%`, backgroundColor: bar.col.replace('bg-', '') }}></div>
                                 <div className={`absolute top-1 bottom-1 rounded opacity-20 ${bar.col}`} style={{ left: `${bar.start}%`, width: `${bar.w}%` }}></div>
                                 <div className={`absolute top-2 bottom-2 rounded opacity-100 ${bar.col}`} style={{ left: `${bar.start}%`, width: '4px' }}></div>
                                 <span className="relative z-10 text-[10px] font-medium text-gray-600 ml-1">{bar.name}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};