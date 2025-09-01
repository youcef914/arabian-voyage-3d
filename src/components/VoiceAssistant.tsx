import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

// Simple voice responses in Arabic
const voiceResponses = {
  greeting: "أهلاً وسهلاً بك في رحلة عبر الوطن العربي! اختر أي دولة لتبدأ استكشافها.",
  EG: "مرحباً بك في مصر، أم الدنيا! هنا تجد الأهرامات العظيمة ونهر النيل والحضارة الفرعونية العريقة.",
  SA: "أهلاً بك في المملكة العربية السعودية، أرض الحرمين الشريفين! موطن الإسلام ومهد الحضارة العربية.",
  JO: "مرحباً بك في الأردن، أرض الضيافة! هنا تجد البتراء الوردية ووادي رم الساحر.",
  default: "هذه دولة عربية جميلة تزخر بالتراث والحضارة العريقة."
};

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  const { selectedCountry, getCountryByCode } = useAppStore();

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      synthRef.current = speechSynthesis;
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ar-SA'; // Arabic
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceCommand(text);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  // Speak function
  const speak = (text: string) => {
    if (!synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  // Start/stop listening
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Handle voice commands
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('مرحبا') || lowerCommand.includes('السلام')) {
      speak(voiceResponses.greeting);
    } else if (selectedCountry) {
      const response = voiceResponses[selectedCountry as keyof typeof voiceResponses] || voiceResponses.default;
      speak(response);
    } else {
      speak("أهلاً بك! اختر دولة من الخريطة لتسمع معلومات عنها.");
    }
  };

  // Speak country information when selected
  useEffect(() => {
    if (selectedCountry) {
      const country = getCountryByCode(selectedCountry);
      if (country) {
        const response = voiceResponses[selectedCountry as keyof typeof voiceResponses] || voiceResponses.default;
        speak(`${response} اسأل عن أي شيء تريد معرفته!`);
      }
    }
  }, [selectedCountry]);

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-30"
    >
      <Card className="glass p-4">
        <div className="flex items-center gap-3">
          {/* Voice Recognition Button */}
          <Button
            onClick={toggleListening}
            disabled={isSpeaking}
            variant={isListening ? "destructive" : "default"}
            size="sm"
            className="relative overflow-hidden"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <motion.div
                  className="absolute inset-0 bg-destructive/20"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </>
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>

          {/* Speaking Control */}
          <Button
            onClick={stopSpeaking}
            disabled={!isSpeaking}
            variant={isSpeaking ? "secondary" : "ghost"}
            size="sm"
            className="relative overflow-hidden"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <motion.div
                  className="absolute inset-0 bg-secondary/20"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </>
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          {/* Status Text */}
          <div className="text-xs text-foreground/70 font-arabic min-w-max">
            {isListening ? 'استمع...' : isSpeaking ? 'أتحدث...' : 'مساعد صوتي'}
          </div>
        </div>

        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-2 bg-muted/30 rounded text-xs text-arabic text-right"
            >
              "{transcript}"
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}