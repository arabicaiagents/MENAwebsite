

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, CheckCircle, MessageCircle, Mic, Globe, TrendingUp, FileText, Smartphone, Users, GraduationCap, Briefcase, Zap, Award, Target, BookOpen, BarChart3, MousePointerClick, Hand } from 'lucide-react';

interface DiagramProps {
    lang: 'en' | 'fr' | 'ar';
    text: any;
}

// --- TYPING EFFECT COMPONENT ---
// Uses string slicing to preserve ligatures (crucial for Arabic) while animating
export const TypingEffect = ({ text, delay = 0, speed = 30, className = "", hideCursorOnComplete = false }: { text: string, delay?: number, speed?: number, className?: string, hideCursorOnComplete?: boolean }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setStarted(false);
        setCompleted(false);
        
        const startTimeout = setTimeout(() => {
            setStarted(true);
            const chars = Array.from(text); // Handle Unicode characters correctly
            let i = 0;
            
            const intervalId = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i === chars.length) {
                    clearInterval(intervalId);
                    setCompleted(true);
                }
            }, speed);

            return () => clearInterval(intervalId);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [text, delay, speed]);

    return (
        <span className={className}>
            {displayedText}
            {(!hideCursorOnComplete || !completed) && (
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[2px] h-[1em] bg-current align-middle ml-0.5"
                />
            )}
        </span>
    );
};

// --- AUTOMATED EXPENSE MANAGEMENT DIAGRAM ---
export const ExpenseScanner: React.FC<DiagramProps> = ({ lang, text }) => {
  const [step, setStep] = useState<'idle' | 'scanning' | 'processing' | 'complete'>('idle');
  
  const startDemo = () => {
      setStep('scanning');
      setTimeout(() => setStep('processing'), 1500);
      setTimeout(() => setStep('complete'), 3000);
      setTimeout(() => setStep('idle'), 6000);
  };

  const isRTL = lang === 'ar';

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 p-8 bg-white rounded-2xl shadow-sm border border-stone-200 w-full max-w-4xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Phone Interface */}
        <div className="relative w-72 h-[500px] bg-charcoal rounded-[3rem] border-4 border-stone-300 shadow-2xl overflow-hidden flex flex-col" dir="ltr">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
            
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] p-4 pt-10 flex items-center gap-3 text-white z-10">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Smartphone size={16}/></div>
                <div>
                    <div className="text-sm font-bold">{text.botName}</div>
                    <div className="text-[10px] opacity-80">{text.online}</div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-[#ECE5DD] p-4 flex flex-col gap-4 relative overflow-hidden">
                {/* Instructions */}
                <div className={`self-start bg-white p-2 rounded-lg rounded-tl-none text-xs shadow-sm max-w-[80%] text-stone-800 ${isRTL ? 'text-right' : ''}`}>
                    <TypingEffect text={text.welcome} speed={20} hideCursorOnComplete={true} />
                </div>

                {/* User Image */}
                <AnimatePresence>
                    {step !== 'idle' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="self-end bg-[#DCF8C6] p-1 rounded-lg rounded-tr-none shadow-sm max-w-[80%] relative overflow-hidden"
                        >
                            <div className="w-48 h-64 bg-white rounded border border-stone-200 relative flex flex-col items-center justify-center p-2">
                                <div className="text-[8px] text-stone-400 mb-2 w-full text-center font-mono">{text.supermarket}</div>
                                <div className="w-full h-[1px] bg-stone-200 mb-2"></div>
                                <div className="w-full space-y-1">
                                    <div className="h-1 w-3/4 bg-stone-200 rounded"></div>
                                    <div className="h-1 w-1/2 bg-stone-200 rounded"></div>
                                    <div className="h-1 w-full bg-stone-200 rounded"></div>
                                </div>
                                <div className="mt-8 text-[10px] font-bold text-stone-800">{text.total}: 450.00 MAD</div>

                                {/* Scanning Laser */}
                                {step === 'scanning' && (
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-majorelle/30 to-transparent h-full w-full pointer-events-none"
                                        initial={{ top: '-100%' }}
                                        animate={{ top: '100%' }}
                                        transition={{ duration: 1.5, repeat: 1 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bot Response */}
                <AnimatePresence>
                    {step === 'complete' && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`self-start bg-white p-2 rounded-lg rounded-tl-none text-xs shadow-sm max-w-[90%] flex gap-2 items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                           <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                           <span><TypingEffect text={`${text.saved}: 450 MAD (Office Supplies)`} speed={20} hideCursorOnComplete={true} /></span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Input Area */}
            <div className="bg-white p-3 flex items-center gap-2 border-t border-stone-100 relative z-30">
                 <div className="w-6 h-6 rounded-full bg-stone-200"></div>
                 <div className={`flex-1 h-8 bg-stone-100 rounded-full px-3 flex items-center text-xs text-stone-400 ${isRTL ? 'text-right justify-end' : ''}`}>...</div>
                 
                 <div className="relative">
                     <button onClick={startDemo} disabled={step !== 'idle'} className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white transition-transform active:scale-90 relative z-10 shadow-md hover:shadow-lg ring-2 ring-transparent focus:ring-majorelle outline-none">
                        <Scan size={16} />
                     </button>
                     
                     {step === 'idle' && (
                        <>
                            {/* Pulse Ring */}
                            <span className="absolute inset-0 rounded-full bg-[#128C7E] animate-ping opacity-75 pointer-events-none"></span>
                            
                            {/* Floating Tooltip/Indication - Enhanced */}
                            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-majorelle text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_4px_14px_0_rgba(28,105,212,0.39)] pointer-events-none animate-bounce z-50 flex items-center gap-2 border-2 border-white">
                                <MousePointerClick size={16} />
                                {isRTL ? 'انقر هنا' : 'Tap here'}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-majorelle"></div>
                            </div>
                        </>
                     )}
                 </div>
            </div>
        </div>

        {/* CRM Extraction Visualization */}
        <div className="flex-1 space-y-6">
            <div>
                <h3 className={`font-serif text-2xl text-stone-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{text.heading}</h3>
                <p className="text-stone-600 text-sm">
                    {text.subheading}
                </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{text.extracted}</h4>
                <div className="space-y-3">
                    <ExtractionField label={text.fields.date} value="24 Oct 2023" active={step === 'processing' || step === 'complete'} delay={0} isRTL={isRTL} />
                    <ExtractionField label={text.fields.vendor} value="Marjane Market" active={step === 'processing' || step === 'complete'} delay={0.2} isRTL={isRTL} />
                    <ExtractionField label={text.fields.category} value="Office Supplies" active={step === 'processing' || step === 'complete'} delay={0.4} isRTL={isRTL} />
                    <ExtractionField label={text.fields.amount} value="450.00 MAD" active={step === 'processing' || step === 'complete'} delay={0.6} highlight isRTL={isRTL} />
                </div>
            </div>
        </div>
    </div>
  );
};

const ExtractionField = ({ label, value, active, delay, highlight, isRTL }: any) => (
    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-stone-100 shadow-sm">
        <span className="text-xs font-medium text-stone-500">{label}</span>
        <div className="relative">
             <span className={`text-sm font-semibold transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'} ${highlight ? 'text-majorelle' : 'text-stone-800'}`}>{value}</span>
             {!active && <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-16 h-4 bg-stone-100 animate-pulse rounded`}></div>}
        </div>
    </div>
);

// --- VOICE AGENT VISUALIZER ---
export const VoiceAgentVisualizer: React.FC<DiagramProps> = ({ lang, text }) => {
  const [activeLang, setActiveLang] = useState<'ar' | 'fr' | 'en'>('ar');
  const [isTalking, setIsTalking] = useState(true);

  // Sync the internal activeLang with the prop lang when it changes
  useEffect(() => {
      setActiveLang(lang);
  }, [lang]);

  const isRTL = lang === 'ar';

  const content = {
      ar: { text: "مرحباً، أود حجز موعد ليوم الغد.", response: "تم تأكيد الحجز، الساعة 10 صباحاً." },
      fr: { text: "Bonjour, je voudrais prendre un rendez-vous.", response: "C'est noté. Demain à 10h00." },
      en: { text: "Hi, I'd like to book an appointment.", response: "Booking confirmed for 10:00 AM." }
  };

  return (
      <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-majorelle via-terracotta to-majorelle"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                  <h3 className={`font-serif text-2xl mb-1 ${isRTL ? 'font-arabic' : ''}`}>{text.title}</h3>
                  <p className="text-stone-400 text-sm">{text.subtitle}</p>
              </div>
              <div className="relative group">
                    <div className="absolute -top-8 right-0 bg-majorelle/20 text-majorelle-light text-[10px] px-2 py-1 rounded animate-pulse border border-majorelle/20 whitespace-nowrap">
                        {isRTL ? 'جرب لغات أخرى' : 'Try other languages'}
                    </div>
                  <div className="flex gap-2 bg-stone-800 p-1 rounded-lg" dir="ltr">
                      {(['ar', 'fr', 'en'] as const).map((l) => (
                          <button 
                            key={l}
                            onClick={() => { setActiveLang(l); setIsTalking(true); }}
                            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors ${activeLang === l ? 'bg-majorelle text-white' : 'text-stone-400 hover:text-white'}`}
                          >
                              {l.toUpperCase()}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          <div className="flex flex-col items-center justify-center py-12 relative min-h-[300px]">
               {/* Audio Visualizer */}
               <div className="flex items-center gap-1 h-16 mb-8">
                   {[...Array(20)].map((_, i) => (
                       <motion.div
                          key={i}
                          className="w-2 bg-terracotta rounded-full"
                          animate={{ 
                              height: isTalking ? [10, Math.random() * 64, 10] : 4,
                              opacity: isTalking ? 1 : 0.3
                          }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                       />
                   ))}
               </div>

               {/* Conversation Bubble */}
               <AnimatePresence mode="wait">
                   <motion.div 
                      key={activeLang}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center space-y-6 w-full max-w-lg mx-auto"
                   >
                       {/* User Speech */}
                       <div className={`text-xl md:text-3xl font-medium leading-relaxed ${activeLang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                           "{<TypingEffect text={content[activeLang].text} speed={40} hideCursorOnComplete={true} />}"
                       </div>
                       
                       {/* Agent Response */}
                       <div className="flex items-center justify-center pt-4">
                            <div className="inline-flex items-center gap-3 text-majorelle-light text-sm md:text-base font-mono border border-stone-700 px-4 py-2 rounded-full bg-stone-800/50 backdrop-blur">
                                <CheckCircle size={16} className="flex-shrink-0" /> 
                                <span>
                                    <TypingEffect text={content[activeLang].response} delay={2} speed={30} hideCursorOnComplete={true} />
                                </span>
                            </div>
                       </div>
                   </motion.div>
               </AnimatePresence>
          </div>

          <div className="mt-4 flex justify-between items-center text-xs text-stone-500 font-mono border-t border-stone-800 pt-4">
              <div className="flex items-center gap-2"><Globe size={12}/> <span>{text.noBarrier}</span></div>
              <div className="flex items-center gap-2"><Mic size={12}/> <span>{text.nlp}</span></div>
          </div>
      </div>
  );
};

// --- SEO METRICS CHART ---
export const SEOMetrics: React.FC<DiagramProps> = ({ lang, text }) => {
    const isRTL = lang === 'ar';
    return (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mb-6">
                <h3 className={`font-serif text-2xl text-stone-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{text.title}</h3>
                <p className="text-stone-600 text-sm">{text.subtitle}</p>
            </div>

            <div className={`flex-1 flex items-end gap-8 relative min-h-[200px] ${isRTL ? 'pr-8 border-r border-b' : 'pl-8 border-l border-b'} pb-8 border-stone-200`}>
                 {/* Y Axis Label */}
                 <div className={`absolute ${isRTL ? '-right-8' : '-left-8'} bottom-1/2 -rotate-90 text-xs font-bold text-stone-400 tracking-widest whitespace-nowrap`}>{text.yAxis}</div>
                 
                 {/* Traditional Curve */}
                 <div className="flex-1 h-full flex items-end relative group">
                     <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none">
                         <motion.path 
                            d={isRTL ? "M200,200 Q100,190 0,150" : "M0,200 Q100,190 200,150"} 
                            fill="none" 
                            stroke="#9CA3AF" 
                            strokeWidth="2" 
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                         />
                     </svg>
                     <div className={`absolute top-[20%] ${isRTL ? 'left-0' : 'right-0'} text-xs text-stone-400 font-medium bg-white px-1`}>{text.traditional}</div>
                 </div>

                 {/* AI Curve */}
                 <div className="flex-1 h-full flex items-end relative">
                     <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none">
                         <motion.path 
                            d={isRTL ? "M200,200 Q150,180 0,20" : "M0,200 Q50,180 200,20"} 
                            fill="none" 
                            stroke="#1C69D4" 
                            strokeWidth="4" 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                         />
                     </svg>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 }}
                        className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} bg-majorelle text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                     >
                         {text.ai}
                     </motion.div>
                 </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="text-stone-500 text-xs uppercase font-bold">{text.cost}</div>
                    <div className="text-xl font-bold text-stone-800">-60%</div>
                </div>
                <div className="p-3 bg-majorelle/10 rounded-lg border border-majorelle/20">
                    <div className="text-majorelle-dark text-xs uppercase font-bold">{text.sales}</div>
                    <div className="text-xl font-bold text-majorelle">+3.5x</div>
                </div>
            </div>
        </div>
    );
};

// --- CORPORATE TRAINING VISUALIZER ---
export const CorporateTrainingVisualizer: React.FC<DiagramProps> = ({ lang, text }) => {
    const isRTL = lang === 'ar';
    const [trained, setTrained] = useState(false);

    return (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className={`font-serif text-2xl text-stone-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{text.title}</h3>
                    <p className="text-stone-600 text-sm">{text.subtitle}</p>
                </div>
                <div className="relative">
                    {!trained && (
                        <div className="absolute -top-3 -right-3 w-3 h-3 bg-majorelle rounded-full animate-ping"></div>
                    )}
                    <button 
                        onClick={() => setTrained(!trained)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all relative z-10 ${trained ? 'bg-majorelle text-white' : 'bg-stone-200 text-stone-500 hover:bg-stone-300'}`}
                    >
                        {trained ? text.after : text.before}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end h-64">
                {/* Bar 1: Efficiency */}
                <div className="flex flex-col justify-end h-full gap-2">
                    <div className="flex justify-between text-xs font-bold text-stone-500 mb-1">
                        <span>{text.metrics.efficiency}</span>
                        <motion.span animate={{ opacity: trained ? 1 : 0.5 }}>{trained ? '95%' : '40%'}</motion.span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-full relative overflow-hidden max-h-48">
                         <motion.div 
                            className="absolute bottom-0 w-full bg-terracotta rounded-t-lg"
                            initial={{ height: "40%" }}
                            animate={{ height: trained ? "95%" : "40%" }}
                            transition={{ type: "spring", stiffness: 50 }}
                         />
                    </div>
                </div>

                {/* Bar 2: Automation */}
                <div className="flex flex-col justify-end h-full gap-2">
                     <div className="flex justify-between text-xs font-bold text-stone-500 mb-1">
                        <span>{text.metrics.automation}</span>
                        <motion.span animate={{ opacity: trained ? 1 : 0.5 }}>{trained ? '80%' : '10%'}</motion.span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-full relative overflow-hidden max-h-48">
                         <motion.div 
                            className="absolute bottom-0 w-full bg-majorelle rounded-t-lg"
                            initial={{ height: "10%" }}
                            animate={{ height: trained ? "80%" : "10%" }}
                            transition={{ type: "spring", stiffness: 50, delay: 0.1 }}
                         />
                    </div>
                </div>

                {/* Bar 3: Skills */}
                <div className="flex flex-col justify-end h-full gap-2">
                     <div className="flex justify-between text-xs font-bold text-stone-500 mb-1">
                        <span>{text.metrics.skills}</span>
                        <motion.span animate={{ opacity: trained ? 1 : 0.5 }}>{trained ? 'High' : 'Low'}</motion.span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-full relative overflow-hidden max-h-48">
                         <motion.div 
                            className="absolute bottom-0 w-full bg-stone-800 rounded-t-lg"
                            initial={{ height: "30%" }}
                            animate={{ height: trained ? "90%" : "30%" }}
                            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
                         />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-8 border-t border-stone-100 pt-6">
                <div className={`flex items-center gap-2 transition-all ${trained ? 'text-majorelle' : 'text-stone-300'}`}>
                    <Users size={20} /> <span className="text-xs font-bold uppercase">{text.icons.team}</span>
                </div>
                 <div className={`flex items-center gap-2 transition-all ${trained ? 'text-majorelle' : 'text-stone-300'}`}>
                    <Zap size={20} /> <span className="text-xs font-bold uppercase">{text.icons.speed}</span>
                </div>
                 <div className={`flex items-center gap-2 transition-all ${trained ? 'text-majorelle' : 'text-stone-300'}`}>
                    <Briefcase size={20} /> <span className="text-xs font-bold uppercase">{text.icons.growth}</span>
                </div>
            </div>
        </div>
    );
};

// --- INDIVIDUAL EDUCATION VISUALIZER ---
export const IndividualEducationVisualizer: React.FC<DiagramProps> = ({ lang, text }) => {
    const isRTL = lang === 'ar';
    return (
        <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mb-8">
                <h3 className={`font-serif text-2xl mb-1 ${isRTL ? 'font-arabic' : ''}`}>{text.title}</h3>
                <p className="text-stone-400 text-sm">{text.subtitle}</p>
            </div>

            <div className="relative py-8">
                {/* Connecting Line */}
                <div className={`absolute top-1/2 left-0 right-0 h-1 bg-stone-800 -translate-y-1/2`}></div>
                <motion.div 
                    className={`absolute top-1/2 ${isRTL ? 'right-0' : 'left-0'} h-1 bg-gradient-to-r from-terracotta to-majorelle -translate-y-1/2`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                <div className="relative flex justify-between items-center z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-4 group">
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-12 h-12 rounded-full bg-stone-800 border-2 border-terracotta flex items-center justify-center text-terracotta shadow-[0_0_15px_rgba(224,122,95,0.3)]"
                        >
                            <BookOpen size={20} />
                        </motion.div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-terracotta mb-1">{text.steps.basics}</div>
                            <div className="text-[10px] text-stone-500">Foundations</div>
                        </div>
                    </div>

                     {/* Step 2 */}
                     <div className="flex flex-col items-center gap-4 group">
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="w-12 h-12 rounded-full bg-stone-800 border-2 border-white flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        >
                            <Target size={20} />
                        </motion.div>
                         <div className="text-center">
                            <div className="text-xs font-bold text-white mb-1">{text.steps.strategy}</div>
                            <div className="text-[10px] text-stone-500">Implementation</div>
                        </div>
                    </div>

                     {/* Step 3 */}
                     <div className="flex flex-col items-center gap-4 group">
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 1.4 }}
                            className="w-12 h-12 rounded-full bg-stone-800 border-2 border-majorelle flex items-center justify-center text-majorelle shadow-[0_0_15px_rgba(28,105,212,0.4)]"
                        >
                            <Award size={20} />
                        </motion.div>
                         <div className="text-center">
                            <div className="text-xs font-bold text-majorelle mb-1">{text.steps.mastery}</div>
                            <div className="text-[10px] text-stone-500">Leader</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 p-4 bg-stone-800/50 rounded-lg border border-stone-700 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-400">
                     <TrendingUp size={20} />
                 </div>
                 <div>
                     <div className="text-xs text-stone-400 mb-0.5">{text.resultLabel}</div>
                     <div className="text-sm font-bold text-white">{text.resultValue}</div>
                 </div>
            </div>
        </div>
    );
};

// --- BRIDGING TRADITION & TECH VISUAL ---
export const BridgingVisual: React.FC<{lang?: string}> = ({ lang = 'en' }) => {
    const isRTL = lang === 'ar';
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    // 8-point star path (approximate for visual)
    // Scaled and centered in a 100x100 box
    const starPath = "M50 10 L65 35 L95 35 L70 55 L80 85 L50 70 L20 85 L30 55 L5 35 L35 35 Z";

    // Grid of stars
    const stars = [];
    for(let i = 0; i < 12; i++) {
        for(let j = 0; j < 6; j++) {
            stars.push({ id: `${i}-${j}`, x: i * 80 - 40, y: j * 80 - 40 });
        }
    }

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="w-full h-[400px] bg-sand relative overflow-hidden rounded-2xl shadow-inner border border-stone-200 cursor-crosshair group"
        >
            {/* Hint Text - Enhanced */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-majorelle text-xs font-bold tracking-widest uppercase z-20 bg-white/90 px-4 py-2 rounded-full pointer-events-none backdrop-blur-sm shadow-lg border border-majorelle/20 flex items-center gap-2 animate-pulse">
                <MousePointerClick size={14} />
                {isRTL ? 'تفاعل: حرك المؤشر / المس' : 'Interactive: Hover / Touch'}
            </div>

            {/* Layer 1: Tradition (Terracotta) */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
                <pattern id="star-pattern-trad" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M40 8 L52 28 L76 28 L56 44 L64 68 L40 56 L16 68 L24 44 L4 28 L28 28 Z" fill="#E07A5F" fillOpacity="0.15" stroke="#E07A5F" strokeWidth="1.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#star-pattern-trad)" />
                {/* Decorative dots */}
                 {stars.map(star => (
                    <circle key={`trad-dot-${star.id}`} cx={star.x + 40} cy={star.y + 40} r="2" fill="#C05A3F" fillOpacity="0.4" />
                 ))}
            </svg>

            {/* Layer 2: Technology (Majorelle Blue) - Masked */}
            <div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    maskImage: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, black 100%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, black 100%, transparent 100%)`
                }}
            >
                 <svg className="w-full h-full bg-stone-900" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
                    <pattern id="star-pattern-tech" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M40 8 L52 28 L76 28 L56 44 L64 68 L40 56 L16 68 L24 44 L4 28 L28 28 Z" fill="none" stroke="#1C69D4" strokeWidth="1.5" strokeDasharray="4 2" />
                        {/* Tech connections */}
                        <line x1="40" y1="8" x2="40" y2="68" stroke="#1C69D4" strokeWidth="0.5" opacity="0.4" />
                        <line x1="4" y1="28" x2="76" y2="28" stroke="#1C69D4" strokeWidth="0.5" opacity="0.4" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#star-pattern-tech)" />
                    
                    {/* Glowing Nodes */}
                    {stars.map(star => (
                        <g key={`tech-${star.id}`}>
                            <circle cx={star.x + 40} cy={star.y + 40} r="3" fill="#1C69D4">
                                <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin={`${Math.random() * 2}s`} />
                                <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" begin={`${Math.random() * 2}s`} />
                            </circle>
                            {/* Pulse waves */}
                             <circle cx={star.x + 40} cy={star.y + 40} r="10" stroke="#1C69D4" strokeWidth="0.5" fill="none" opacity="0.3">
                                <animate attributeName="r" values="5;20" dur="2s" repeatCount="indefinite" begin={`${Math.random() * 2}s`} />
                                <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" begin={`${Math.random() * 2}s`} />
                             </circle>
                        </g>
                    ))}
                 </svg>
            </div>

            {/* Lens Ring UI */}
            <div 
                className="absolute w-[360px] h-[360px] rounded-full border border-white/20 shadow-[0_0_40px_rgba(28,105,212,0.4)] pointer-events-none transition-transform duration-75 backdrop-saturate-150"
                style={{ 
                    left: `${mousePos.x}%`, 
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-majorelle text-white text-[10px] px-2 py-0.5 rounded-full font-mono tracking-wider border border-majorelle-light">AI_AUGMENTATION_LAYER</div>
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-majorelle/50"></div>
            </div>
        </div>
    );
};