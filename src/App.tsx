import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, CircleDot, Languages, Maximize, Radio, Sparkles, Volume2, VolumeX } from 'lucide-react';
import DepartmentInstructors from "./components/DepartmentInstructors";

type Mode = 'boot' | 'opening' | 'autonomous' | 'detected' | 'welcome' | 'performance';

const hostLines = [
  'Welcome to MITC. I am MITC Vision, your digital exhibition host.',
  'Choose your learning path: Software Engineering or Web Design.',
  'Software Engineering teaches you to design, build, test and improve real applications.',
  'You can work toward junior software development, .NET development, QA testing, or application support roles.',
  'Build practical projects, grow a portfolio, and keep developing your skills.'
];

const facts = [
  'At MITC, Software Engineering and Web Design are separate course choices. Learners choose the path that fits their interests.',
  'Software Engineering covers programming, HTML, CSS, JavaScript, databases, APIs, system design, testing and deployment, with opportunities to explore AI Engineering and Machine Learning.',
  'Software Engineering skills can support pathways into junior software development, .NET development, QA testing, automation and application support.',
  'Web Design is a separate path focused on HTML, CSS, JavaScript, React and WordPress.',
  'Your opportunities grow through consistent practice, completed projects, a strong portfolio and continued learning.'
];

const departmentPresentation = [
  { language: 'en-NG', text: 'Welcome to the MITC Maiden Convocation Ceremony 2026. I am MITC Vision, your digital host. I was created on the 15th of October, 2026, at 1:15am, West Africa Time, also known as WAT and my data was last updated on the 19th of October 2026, at 7:15pm, West Africa Time. I was created by QAA Abass Adebayo, the Head of Department for Software Engineering and Web Design at Masroor International Technical College, Ilaro. I am designed to showcase our department\'s achievements, innovations, projects, and commitment to technology education. Once again, welcome to Masroor International Technical College, Ilaro. Our ICT department offers two distinct course choices. You choose the course that matches your interest. You do not have to study both.' },
  { language: 'en-NG', text: 'First, let me introduce Software Engineering. This is a complete learning path for people who want to understand how software is planned, built, tested and improved. Learners practise C-sharp, .NET, ASP.NET Core, HTML, CSS, JavaScript, APIs, databases, system design, testing, version control, and the basics of deployment and DevOps. Students can also explore AI Engineering and Machine Learning as areas for further learning. The goal is not just to write code. It is to learn how to solve problems and build applications people can rely on.' },
  { language: 'en-NG', text: 'Software Engineering can open different career directions as your skills and experience grow. These may include junior software developer, .NET developer, application support, quality assurance and software testing, automation, or API integration work. With more experience, a strong portfolio and further learning, you can work toward more advanced engineering roles or build software products of your own. Training is a starting point, not a job guarantee; your practice, projects and continued growth matter.' },
  { language: 'en-NG', text: 'The second choice is Web Design. This is a separate course for learners who want to create websites and digital experiences. You work with HTML, CSS, JavaScript, React and WordPress, alongside responsive design. You learn to build websites and interactive user interfaces that work well on phones and computers and help businesses, schools and organisations communicate online.' },
  { language: 'en-NG', text: 'Web Design can support pathways into junior web design, website development, WordPress site building, website maintenance, freelance projects and digital agency work. As with any career, opportunities depend on the quality of your work, your communication, your portfolio and your ability to keep learning. You choose Web Design because it is the path you want to pursue, not because it is compulsory alongside Software Engineering.' },
  { language: 'en-NG', text: 'Our approach is practical and supportive. Learners ask questions, build projects, practise debugging or design improvements, receive feedback and learn to explain their decisions. We want each learner to leave with useful skills, greater confidence and work they can demonstrate to a potential employer or client.' },
  { language: 'en-NG', text: 'Today, the 29th of October, 2026, marks a historic milestone for the Software Engineering and Web Design Department at Masroor International Technical College, Ilaro. We proudly celebrate our first set of 25 graduands. During their training, our graduands individually developed practical projects, including an Automated Attendance System, the proposed MITC Official Registration Portal, the Ahmadiyya Mosque Locator, the proposed MITC Student Results and CGPA System, the proposed MITC Staff Automated Reporting System, e-commerce systems, and websites for schools and companies, among others. We are also proud that many of our students and graduands have secured scholarships to further develop their skills, while some have already secured employment with reputable organisations. These achievements demonstrate our commitment to practical learning, innovation, problem-solving, and preparing our students for the world of work.' },
  { Language: 'en-NG', text: 'Additionally, Our students also participate in local and international hackathons, proudly representing Masroor International Technical College and demonstrating their creativity, teamwork, and problem-solving abilities.' },
  { Language: 'en-NG', text: 'Our students also undertake the National Skills Qualification (NSQ) and pursue other globally recognised professional certifications, strengthening their technical competence and preparing them for opportunities in the local and international technology industry.' },
  { language: 'en-NG', text: 'Behind these achievements are dedicated instructors who guide, mentor, and inspire our students. Ladies and gentlemen, meet the brains behind the Software Engineering and Web Design Department. First, Q A A, Abass Adebayo, the Instructor-in-Charge for Software Engineering and Head of Department for Software Engineering and Web Design, who\'s also my creator. Next, Q A A Taofeek Adeiye, the Instructor-in-Charge for Web Design, specialising in WordPress. Together, they guide our learners in developing the technical skills, creativity, and confidence needed to succeed in the technology industry. Please join us in recognising our departmental instructors.' },
  { language: 'en-NG', text: 'So, which path sounds like you? Choose Software Engineering if you are curious about applications, logic, data and solving technical problems. Choose Web Design if you are excited by websites, visual structure and WordPress. Both paths can lead to meaningful opportunities when you practise consistently and build real projects. Please speak with our team, ask questions, and discover the course that suits you. Thank you for visiting MITC.' }
];

const softwareStack = ['.NET / C#', 'ASP.NET', 'HTML', 'CSS', 'JavaScript', 'Databases', 'System Design', 'CI/CD', 'Basic DevOps'];
const webStack = ['HTML', 'CSS', 'JavaScript', 'React', 'WordPress', 'Responsive Design', 'UI / UX', 'Web Development'];

const showcaseTopics = [
  { id: 'web', label: 'WEB: HTML + CSS + JS', title: 'From page to experience', intro: 'Let us see how HTML gives a page structure, CSS gives it style, and JavaScript makes it interactive.', code: '<h1>Welcome to MITC</h1>\n<button>Explore courses</button>\n\n/* CSS styles the page */\nbutton { background: cyan; }\n\n// JavaScript responds to a click\nbutton.onclick = () => alert("Welcome!");', caption: 'STRUCTURE  →  STYLE  →  INTERACTION' },
  { id: 'dotnet', label: 'C# / .NET', title: 'Code that solves a problem', intro: 'Here is a small C sharp example. A program receives information, processes it, and returns a useful result.', code: 'string course = "Software Engineering";\nint learners = 24;\n\nstring message = $"Welcome to {course}";\nConsole.WriteLine(message);\nConsole.WriteLine(learners);', caption: 'INPUT  →  PROCESSING  →  OUTPUT' },
  { id: 'api', label: 'API REQUEST', title: 'Applications talking to each other', intro: 'An A P I lets applications exchange information. One application sends a request, and another returns a response.', code: 'GET /api/courses\n\n200 OK\n{\n  "course": "Software Engineering",\n  "topics": ["C#", "APIs", "Databases"]\n}', caption: 'REQUEST SENT  •  RESPONSE RECEIVED' },
  { id: 'ai', label: 'AI + MACHINE LEARNING', title: 'Finding patterns in data', intro: 'Machine learning systems learn patterns from examples and use those patterns to make predictions. This is an illustration, not a trained model.', code: 'Example training data:\nStudy practice → Result\nLow             → Needs support\nRegular         → Improving\nConsistent      → Strong progress\n\nA model learns patterns, then\nestimates a result for new data.', caption: 'EXAMPLES  →  PATTERNS  →  PREDICTION' }
];

function App() {
  const [mode, setMode] = useState<Mode>('boot');
  const [factIndex, setFactIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [stackIndex, setStackIndex] = useState(0);
  const [presentationChapter, setPresentationChapter] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [openingPhase, setOpeningPhase] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [personDetected, setPersonDetected] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [started, setStarted] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [showcaseTopic, setShowcaseTopic] = useState('web');
  const [liveHtml, setLiveHtml] = useState('<h1>Welcome to MITC</h1>\n<p>Build something amazing.</p>\n<button id="explore">Explore courses</button>');
  const [liveCss, setLiveCss] = useState('body { font-family: Arial, sans-serif; padding: 2rem; background: #071725; color: white; }\nh1 { color: #70e5ff; }\nbutton { padding: 0.7rem 1rem; background: #70e5ff; border: 0; cursor: pointer; }');
  const [liveJs, setLiveJs] = useState('document.querySelector("#explore").addEventListener("click", () => {\n  document.querySelector("p").textContent = "You just ran JavaScript!";\n});');
  const [livePreviewDocument, setLivePreviewDocument] = useState('<!doctype html><html><body style="font-family:Arial;padding:2rem;background:#071725;color:#dffaff"><p>Your live preview will appear here. Edit the HTML, CSS or JavaScript, then click RUN LIVE PREVIEW.</p></body></html>');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<number | null>(null);
  const cameraRestartTimerRef = useRef<number | null>(null);
  const lastTriggerRef = useRef(0);
  const presentationLockRef = useRef(false);
  const modeRef = useRef<Mode>('boot');
  const audioContextRef = useRef<AudioContext | null>(null);
  const assemblyAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const passiveFactIndexRef = useRef(0);
  const previousPixelsRef = useRef<Uint8ClampedArray | null>(null);
  const presenceStreakRef = useRef(0);
  const absenceStreakRef = useRef(0);
  const stablePresenceRef = useRef(false);
  const wasPresenceRef = useRef(false);
  const presentationForCurrentPresenceRef = useRef(false);

  const setModeSafe = useCallback((next: Mode) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  const playTone = useCallback((frequency: number, duration = 0.16, type: OscillatorType = 'sine', volume = 0.035) => {
    const context = audioContextRef.current;
    if (!audioOn || !context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.03);
  }, [audioOn]);

  const startAudio = useCallback(() => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = audioContextRef.current || new AudioContextClass();
    audioContextRef.current = context;
    void context.resume();
    if (!masterGainRef.current) {
      const master = context.createGain();
      master.gain.value = 0.48;
      master.connect(context.destination);
      masterGainRef.current = master;
    }
    if (!ambientGainRef.current) {
      const oscillatorA = context.createOscillator();
      const oscillatorB = context.createOscillator();
      const oscillatorC = context.createOscillator();
      const subDrone = context.createOscillator();
      const ambient = context.createGain();
      const filter = context.createBiquadFilter();
      const pulse = context.createOscillator();
      const pulseDepth = context.createGain();
      const filterLfo = context.createOscillator();
      const filterLfoDepth = context.createGain();
      oscillatorA.type = 'sawtooth';
      oscillatorB.type = 'triangle';
      oscillatorC.type = 'square';
      subDrone.type = 'sine';
      oscillatorA.frequency.value = 41.2;
      oscillatorB.frequency.value = 82.4;
      oscillatorC.frequency.value = 164.8;
      subDrone.frequency.value = 38;
      filter.type = 'lowpass';
      filter.frequency.value = 720;
      filter.Q.value = 2.2;
      ambient.gain.value = 0.095;
      pulse.type = 'sawtooth';
      pulse.frequency.value = 0.72;
      pulseDepth.gain.value = 0.032;
      filterLfo.type = 'sine';
      filterLfo.frequency.value = 0.11;
      filterLfoDepth.gain.value = 420;
      filterLfo.connect(filterLfoDepth).connect(filter.frequency);
      pulse.connect(pulseDepth).connect(ambient.gain);
      oscillatorA.connect(filter);
      oscillatorB.connect(filter);
      oscillatorC.connect(filter);
      filter.connect(ambient);
      subDrone.connect(ambient);
      ambient.connect(masterGainRef.current);
      oscillatorA.start();
      oscillatorB.start();
      oscillatorC.start();
      subDrone.start();
      pulse.start();
      filterLfo.start();
      ambientGainRef.current = ambient;
    }
    setAudioOn(true);
    const sweep = context.createOscillator();
    const sweepFilter = context.createBiquadFilter();
    const sweepGain = context.createGain();
    sweep.type = 'sawtooth';
    sweep.frequency.setValueAtTime(95, context.currentTime);
    sweep.frequency.exponentialRampToValueAtTime(760, context.currentTime + 0.72);
    sweepFilter.type = 'bandpass';
    sweepFilter.frequency.setValueAtTime(360, context.currentTime);
    sweepFilter.frequency.exponentialRampToValueAtTime(1850, context.currentTime + 0.72);
    sweepFilter.Q.value = 2.8;
    sweepGain.gain.setValueAtTime(0.0001, context.currentTime);
    sweepGain.gain.exponentialRampToValueAtTime(0.11, context.currentTime + 0.09);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.82);
    sweep.connect(sweepFilter).connect(sweepGain).connect(context.destination);
    sweep.start();
    sweep.stop(context.currentTime + 0.86);
    window.setTimeout(() => {
      playTone(392, 0.18, 'triangle', 0.04);
      window.setTimeout(() => playTone(587.33, 0.22, 'sawtooth', 0.035), 150);
      window.setTimeout(() => playTone(880, 0.3, 'triangle', 0.03), 310);
    }, 260);
  }, [playTone]);

  const speak = useCallback((text: string, onFinished?: () => void) => {
    if (!audioContextRef.current || audioContextRef.current.state !== 'running' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-NG';
    utterance.rate = 0.94;
    utterance.pitch = 1.02;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); onFinished?.(); };
    utterance.onerror = () => { setIsSpeaking(false); onFinished?.(); };
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(voice => /en-NG/i.test(voice.lang))
      || voices.find(voice => /en-ZA/i.test(voice.lang))
      || voices.find(voice => /en-GB/i.test(voice.lang));
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.speak(utterance);
  }, []);

  const runDepartmentPresentation = useCallback((index: number) => {
    if (index >= departmentPresentation.length) {
      setIsSpeaking(false);
      presentationLockRef.current = false;
      presentationForCurrentPresenceRef.current = false;
      setPresentationChapter('');
      setModeSafe('autonomous');
      return;
    }
    if (!audioContextRef.current || audioContextRef.current.state !== 'running' || !('speechSynthesis' in window)) {
      presentationLockRef.current = false;
      presentationForCurrentPresenceRef.current = false;
      setModeSafe('autonomous');
      return;
    }
    const section = departmentPresentation[index];
    setPresentationChapter(section.text);
    const spokenText = section.text.replace(/Ilaro/g, 'E-LAH-roh').replace(/CI\/CD/g, 'CI CD').replace(/SQL/g, 'Structured Query Language').replace(/ASP\.NET/g, 'A-S-P dot net').replace(/C-sharp/g, 'C sharp').replace(/\.NET/g, 'dot net');
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'en-NG';
    utterance.rate = 0.86;
    utterance.pitch = 1.02;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    const voices = window.speechSynthesis.getVoices();
    const africanEnglishVoice = voices.find(voice => /en-NG/i.test(voice.lang))
      || voices.find(voice => /en-ZA/i.test(voice.lang))
      || voices.find(voice => /en-GB/i.test(voice.lang));
    if (africanEnglishVoice) utterance.voice = africanEnglishVoice;
    utterance.onend = () => {
      setIsSpeaking(false);
      window.setTimeout(() => runDepartmentPresentation(index + 1), 1250);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      window.setTimeout(() => runDepartmentPresentation(index + 1), 900);
    };
    window.speechSynthesis.speak(utterance);
  }, [setModeSafe]);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;

    // Do not create another camera stream when the existing one is still alive.
    const existingStream = streamRef.current;
    const existingTrack = existingStream?.getVideoTracks()[0];

    if (existingTrack?.readyState === 'live') {
      if (videoRef.current && videoRef.current.srcObject !== existingStream) {
        videoRef.current.srcObject = existingStream;

        try {
          await videoRef.current.play();
        } catch {
          // Browser may wait for playback permission.
        }
      }

      setCameraReady(true);
      return;
    }

    if (cameraRestartTimerRef.current !== null) {
      window.clearTimeout(cameraRestartTimerRef.current);
      cameraRestartTimerRef.current = null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      const videoTrack = stream.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.onended = () => {
          streamRef.current = null;
          setCameraReady(false);

          if (cameraRestartTimerRef.current === null) {
            cameraRestartTimerRef.current = window.setTimeout(() => {
              cameraRestartTimerRef.current = null;
              void startCamera();
            }, 1000);
          }
        };
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        try {
          await videoRef.current.play();
        } catch {
        }
      }

      previousPixelsRef.current = null;
      presenceStreakRef.current = 0;
      absenceStreakRef.current = 0;
      stablePresenceRef.current = false;
      wasPresenceRef.current = false;

      setCameraReady(true);
    } catch {
      setCameraReady(false);

      if (cameraRestartTimerRef.current === null) {
        cameraRestartTimerRef.current = window.setTimeout(() => {
          cameraRestartTimerRef.current = null;
          void startCamera();
        }, 2000);
      }
    }
  }, []);

  const playAssemblyMachineSound = useCallback(() => {
    const audio = new Audio('/resources/robot-assembly.wav');
    audio.preload = 'auto';
    audio.volume = 1;
    if (assemblyAudioRef.current) {
      assemblyAudioRef.current.pause();
      assemblyAudioRef.current.currentTime = 0;
    }
    assemblyAudioRef.current = audio;
    void audio.play().catch(() => { });
  }, []);

  const activateExperience = useCallback(() => {
    setStarted(true);
    startAudio();
    setModeSafe('boot');
    window.setTimeout(() => playAssemblyMachineSound(), 180);
    void startCamera();
    speak('Welcome to MITC. The exhibition is now active.');
  }, [playAssemblyMachineSound, speak, startAudio, startCamera]);

  useEffect(() => {
    const boot = window.setTimeout(() => setModeSafe('opening'), 6500);
    const opening = window.setTimeout(() => setModeSafe('autonomous'), 11000);
    void startCamera();
    return () => {
      window.clearTimeout(boot);
      window.clearTimeout(opening);

      if (cameraRestartTimerRef.current !== null) {
        window.clearTimeout(cameraRestartTimerRef.current);
        cameraRestartTimerRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.onended = null;
          track.stop();
        });
        streamRef.current = null;
      }

      window.speechSynthesis?.cancel();

      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, [setModeSafe, startCamera]);

  useEffect(() => {
    if (!started || mode !== 'boot') return;
    const bootReplay = window.setTimeout(() => setModeSafe('opening'), 6500);
    return () => window.clearTimeout(bootReplay);
  }, [mode, setModeSafe, started]);

  useEffect(() => {
    if (mode !== 'opening') return;
    const phaseTimer = window.setInterval(() => setOpeningPhase(current => (current + 1) % 4), 2600);
    return () => window.clearInterval(phaseTimer);
  }, [mode]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFactIndex(current => (current + 1) % facts.length);
      setLineIndex(current => (current + 1) % hostLines.length);
      setStackIndex(current => (current + 1) % Math.max(softwareStack.length, webStack.length));
    }, 5600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const detect = async () => {
      const video = videoRef.current;
      if (!video || !cameraReady || video.readyState < 2) return;
      const canvas = document.createElement('canvas');
      canvas.width = 96;
      canvas.height = 54;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      context.drawImage(video, 0, 0, 96, 54);
      const pixels = context.getImageData(0, 0, 96, 54).data;
      let bright = 0;
      let motion = 0;
      const previousPixels = previousPixelsRef.current;
      for (let i = 0; i < pixels.length; i += 16) {
        const luminance = pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;
        if (luminance > 48) bright += 1;
        if (previousPixels) {
          const previousLuminance = previousPixels[i] * 0.2126 + previousPixels[i + 1] * 0.7152 + previousPixels[i + 2] * 0.0722;
          if (Math.abs(luminance - previousLuminance) > 42) motion += 1;
        }
      }
      previousPixelsRef.current = new Uint8ClampedArray(pixels);
      const rawPresence = bright > 80 || motion > 14;
      if (rawPresence) {
        presenceStreakRef.current += 1;
        absenceStreakRef.current = 0;
      } else {
        absenceStreakRef.current += 1;
        presenceStreakRef.current = 0;
      }
      if (presenceStreakRef.current >= 2) stablePresenceRef.current = true;
      if (absenceStreakRef.current >= 3) stablePresenceRef.current = false;
      const present = stablePresenceRef.current;
      setPersonDetected(present);
      const now = Date.now();
      const newArrival = present && !wasPresenceRef.current;
      wasPresenceRef.current = present;
      if (!present) presentationForCurrentPresenceRef.current = false;
      // Presence detection is for welcoming only; pixel motion cannot reliably count people.
      if (present && started && !showcaseOpen && !presentationForCurrentPresenceRef.current && !presentationLockRef.current && modeRef.current === 'autonomous' && now - lastTriggerRef.current > 15000) {
        lastTriggerRef.current = now;
        presentationForCurrentPresenceRef.current = true;
        presentationLockRef.current = true;
        setModeSafe('detected');
        const contextAudio = audioContextRef.current;
        if (contextAudio && contextAudio.state === 'running') {
          const sweep = contextAudio.createOscillator();
          const filter = contextAudio.createBiquadFilter();
          const gain = contextAudio.createGain();
          sweep.type = 'sawtooth';
          sweep.frequency.setValueAtTime(140, contextAudio.currentTime);
          sweep.frequency.exponentialRampToValueAtTime(1050, contextAudio.currentTime + 0.62);
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(520, contextAudio.currentTime);
          filter.frequency.exponentialRampToValueAtTime(2200, contextAudio.currentTime + 0.62);
          filter.Q.value = 3;
          gain.gain.setValueAtTime(0.0001, contextAudio.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.1, contextAudio.currentTime + 0.07);
          gain.gain.exponentialRampToValueAtTime(0.0001, contextAudio.currentTime + 0.72);
          sweep.connect(filter).connect(gain).connect(contextAudio.destination);
          sweep.start();
          sweep.stop(contextAudio.currentTime + 0.76);
        }
        window.setTimeout(() => {
          playTone(440, 0.16, 'triangle', 0.04);
          window.setTimeout(() => playTone(659.25, 0.2, 'sawtooth', 0.035), 150);
          window.setTimeout(() => playTone(987.77, 0.26, 'triangle', 0.03), 300);
        }, 250);
        speak('I see you! Welcome to MITC. I am MITC Vision. Please enjoy discovering our technology courses.', () => {
          window.setTimeout(() => {
            setModeSafe('performance');
            runDepartmentPresentation(0);
          }, 900);
        });
        window.setTimeout(() => setModeSafe('welcome'), 250);
      }
    };
    detectorRef.current = window.setInterval(detect, 900);
    return () => {
      if (detectorRef.current) window.clearInterval(detectorRef.current);
    };
  }, [audioOn, cameraReady, playTone, runDepartmentPresentation, setModeSafe, showcaseOpen, speak, started]);

  useEffect(() => {
    passiveFactIndexRef.current = factIndex;
  }, [factIndex]);

  useEffect(() => {
    if (!started || !audioOn) return;
    let scanCount = 0;
    const computerAmbience = window.setInterval(() => {
      if (modeRef.current === 'boot' || modeRef.current === 'performance') return;
      scanCount += 1;
      playTone(174.61, 0.42, 'sine', 0.014);
      window.setTimeout(() => playTone(523.25, 0.16, 'triangle', 0.012), 180);
      window.setTimeout(() => playTone(783.99, 0.2, 'sine', 0.01), 340);
      window.setTimeout(() => playTone(1174.66, 0.24, 'triangle', 0.009), 510);
      if (scanCount % 3 === 0) {
        const context = audioContextRef.current;
        if (context) {
          const sweep = context.createOscillator();
          const filter = context.createBiquadFilter();
          const gain = context.createGain();
          sweep.type = 'sawtooth';
          sweep.frequency.setValueAtTime(110, context.currentTime);
          sweep.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.9);
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(260, context.currentTime);
          filter.frequency.exponentialRampToValueAtTime(2400, context.currentTime + 0.9);
          filter.Q.value = 3.5;
          gain.gain.setValueAtTime(0.0001, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.05);
          sweep.connect(filter).connect(gain).connect(context.destination);
          sweep.start();
          sweep.stop(context.currentTime + 1.1);
        }
      }
    }, 6200);
    return () => window.clearInterval(computerAmbience);
  }, [audioOn, playTone, started]);

  const activeShowcase = showcaseTopics.find(topic => topic.id === showcaseTopic) || showcaseTopics[0];

  const openShowcase = useCallback(() => {
    if (modeRef.current !== 'autonomous' || presentationLockRef.current || window.speechSynthesis?.speaking) return;
    setShowcaseOpen(true);
    setShowcaseTopic('web');
    speak('Welcome to the live coding lab. Edit the HTML, CSS, or JavaScript and run the preview to see your changes.');
  }, [speak]);

  const runLivePreview = useCallback(() => {
    const safeHtml = liveHtml;
    const safeCss = liveCss.replace(/<\/style/gi, '<\\/style');
    const safeJs = liveJs.replace(/<\/script/gi, '<\\/script');
    setLivePreviewDocument(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${safeCss}</style></head><body>${safeHtml}<script>try { ${safeJs} } catch (error) { document.body.insertAdjacentHTML('beforeend', '<pre style="color:#ff9b9b;white-space:pre-wrap">' + String(error) + '</pre>'); }<\/script></body></html>`);
  }, [liveCss, liveHtml, liveJs]);

  const chooseShowcaseTopic = useCallback((topicId: string) => {
    const topic = showcaseTopics.find(item => item.id === topicId);
    if (!topic) return;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setShowcaseTopic(topicId);
    speak(topic.intro);
  }, [speak]);

  const title = useMemo(() => {
    if (mode === 'boot') return 'AWAKENING';
    if (mode === 'opening') return 'WELCOME TO MITC';
    if (mode === 'detected') return 'WELCOME TO MITC';
    if (mode === 'welcome') return 'WELCOME, SPECIAL GUEST';
    if (mode === 'performance') return 'STEP INTO THE FUTURE';
    return 'MITC VISION';
  }, [mode]);

  return (
    <main className={`app-shell mode-${mode}${isSpeaking ? ' is-speaking' : ''}`}>
      {mode === 'boot' && (
        <div className="vision-assembly-screen">
          <div className="assembly-lab-grid" />
          <div className="assembly-lab-title">MITC // SOFTWARE ENGINEERING LAB</div>
          <div className="assembly-lab-subtitle">AI • AUTOMATION • DIGITAL SYSTEMS</div>
          <div className="assembly-status">MITC VISION // SYSTEM ASSEMBLY</div>
          <div className="assembly-robot" aria-hidden="true">
            <div className="assembly-head"><i /><i /></div>
            <div className="assembly-neck" />
            <div className="assembly-body"><span>MITC</span></div>
            <div className="assembly-arm assembly-arm-left" />
            <div className="assembly-arm assembly-arm-right" />
            <div className="assembly-leg assembly-leg-left" />
            <div className="assembly-leg assembly-leg-right" />
          </div>
          <div className="assembly-ring" />
          <div className="assembly-caption">INITIALISING DIGITAL HOST<br /><strong>MITC VISION</strong></div>
        </div>
      )}
      {!started && mode !== 'boot' && (
        <div className="activation-screen">
          <div className="activation-glow" />
          <div className="activation-card">
            <div className="activation-kicker">MASROOR INTERNATIONAL TECHNICAL COLLEGE</div>
            <div className="activation-title">MITC VISION</div>
            <p>Activate the exhibition experience to enable the digital host's voice, cinematic sound and camera interaction.</p>
            <button onClick={activateExperience} className="activate-button"><Volume2 size={18} /> ACTIVATE EXPERIENCE</button>
            <small>Camera and microphone are not required for the presentation itself. Camera access enables visitor detection.</small>
          </div>
        </div>
      )}
      <video ref={videoRef} className="camera-feed" muted playsInline autoPlay aria-hidden="true" />
      <div className="star-field" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">{Array.from({ length: 54 }, (_, i) => <span key={i} className={i % 5 === 0 ? 'particle streak' : i % 3 === 0 ? 'particle crosshair' : 'particle'} style={{ left: `${(i * 37 + 3) % 100}%`, top: `${(i * 23 + 7) % 100}%`, animationDuration: `${5 + (i % 7) * 1.3}s`, animationDelay: `-${(i % 11) * 0.7}s` }} />)}</div>
      <div className="scan-vignette" />
      <div className="portal-ring portal-ring-one" />
      <div className="portal-ring portal-ring-two" />
      <div className="grid-floor" />

      <header className="hud-top">
        <div className="brand-lockup">
          <div className="brand-mark">MITC</div>
          <div><strong>MITC VISION</strong><small>DIGITAL EXHIBITION HOST</small></div>
        </div>
        <div className="system-status">
          <span className={cameraReady ? 'status-dot live' : 'status-dot'} />
          {cameraReady ? 'VISION ONLINE' : 'DEMO MODE'}
          <span className="divider" />
          {started ? 'GUEST EXPERIENCE ACTIVE' : 'READY TO WELCOME'}
        </div>
      </header>

      <section className="hero-copy">
        <p className="eyebrow"><Sparkles size={14} /> ICT | SOFTWARE ENGINEERING / WEB DESIGN (WORDPRESS • REACT)</p>
        <h1>{title}</h1>
        <div className="department-banner">
          <span>ICT DEPARTMENT • TWO DISTINCT COURSE CHOICES</span>
          <strong>CHOOSE ONE: SOFTWARE ENGINEERING OR WEB DESIGN</strong>
        </div>
        {mode === 'opening' && <div className="opening-sequence" key={openingPhase}>
          {openingPhase === 0 && <div className="holo-title-panel"><small>ESTABLISHING IDENTITY</small><br />MASROOR INTERNATIONAL<br />TECHNICAL COLLEGE <span>ILÁRÒ</span><div className="sequence-subtitle">MAIDEN CONVOCATION • 2026</div></div>}
          {openingPhase === 1 && <div className="holo-title-card course-choice-card"><small>CHOOSE YOUR COURSE // TWO DISTINCT PATHS</small><div className="course-choice-grid"><div><strong>SOFTWARE ENGINEERING</strong><span>Applications • Logic • Data • Testing</span></div><div><strong>WEB DESIGN</strong><span>HTML • CSS • JavaScript • React • WordPress</span></div></div><div className="sequence-subtitle">SELECT THE PATH THAT MATCHES YOUR INTEREST</div></div>}
          {openingPhase === 2 && <div className="future-card"><small>MITC FUTURE SYSTEMS // VISION 2030+</small><strong>THE FUTURE OF MITC</strong><div className="future-grid"><span>AI &amp; AUTOMATION</span><span>SMART CAMPUS</span><span>DIGITAL INNOVATION</span><span>CAREER-READY SKILLS</span></div></div>}
          {openingPhase === 3 && <div className="holo-title-panel"><small>WELCOME TO</small><br />MITC MAIDEN CONVOCATION<br />CEREMONY <span>2026</span><div className="sequence-subtitle">A FUTURE BUILT THROUGH SKILLS AND INNOVATION</div></div>}
        </div>}
        {mode === 'autonomous' && <><p className="fact">{facts[factIndex]}</p><div className="host-caption"><span>MITC VISION</span>{hostLines[lineIndex]}</div><div className="stack-pills"><span>SOFTWARE: {softwareStack[stackIndex % softwareStack.length]}</span><span>WEB: {webStack[stackIndex % webStack.length]}</span></div></>}
        {mode === 'detected' && <p className="fact alert">Human presence detected. Your digital host is coming to meet you.</p>}
        {mode === 'welcome' && <p className="fact welcome-line">“I see someone. Welcome to MITC. I am MITC Vision. Please enjoy discovering our technology courses.”</p>}
        {mode === 'performance' && <p className="fact welcome-line">{presentationChapter || 'MITC Vision is introducing our mentoring approach, practical projects, Software Engineering, and Web Design with WordPress.'}</p>}
      </section>


      {mode === 'performance' &&
        presentationChapter.startsWith(
          'Behind these achievements'
        ) && (
          <section
            className="instructors-section"
            aria-label="MITC departmental instructors"
          >
            <div className="instructors-kicker">
              MITC ICT DEPARTMENT · MITC 1st Convocation
            </div>

            <h2>THE PEOPLE BEHIND THE PROGRESS</h2>

            <p className="instructors-credential">
              CERTIFIED QUALITY ASSURANCE ASSESSORS IN ICT
            </p>

            <div className="instructors-grid">
              <article className="instructor-card">
                <div className="instructor-photo">
                  <img
                    src="/images/abass-adebayo.jpg"
                    alt="QAA Abass Adebayo"
                  />
                </div>

                <div className="instructor-role">
                  INSTRUCTOR-IN-CHARGE · SOFTWARE ENGINEERING
                </div>

                <h3>
                  QAA
                  <span>Abass Adebayo</span>
                </h3>

                <p>
                  Head of Department — Software Engineering
                  &amp; Web Design
                </p>

                <div className="instructor-seal">
                  CERTIFIED QUALITY ASSURANCE ASSESSOR · ICT
                </div>
              </article>

              <article className="instructor-card">
                <div className="instructor-photo">
                  <img
                    src="/images/taofeek-adeiye.jpg"
                    alt="QAA Taofeek Adeiye"
                  />
                </div>

                <div className="instructor-role">
                  INSTRUCTOR-IN-CHARGE · WEB DESIGN
                </div>

                <h3>
                  QAA
                  <span>Taofeek Adeiye</span>
                </h3>

                <p>Web Design Instructor — WordPress</p>

                <div className="instructor-seal">
                  CERTIFIED QUALITY ASSURANCE ASSESSOR · ICT
                </div>
              </article>
            </div>
          </section>
        )}


      <section className="host-stage" aria-label="MITC Vision digital hologram host"></section>

      <section className="host-stage" aria-label="MITC Vision digital hologram host">
        <div className="hologram-floor" />
        <div className="host-glow" />
        <div className="host-scan-lines" />
        <div className="host">
          <div className="host-halo" />
          <div className="host-head">
            <div className="hair-glow" />
            <div className="face">
              <div className="brow left" /><div className="brow right" />
              <div className="eye left"><i /></div><div className="eye right"><i /></div>
              <div className="nose" /><div className="mouth" aria-label={isSpeaking ? 'Robot speaking' : 'Robot silent'}><i /><i /><i /></div>
            </div>
            <div className="host-ear left" /><div className="host-ear right" />
          </div>
          <div className="host-neck" />
          <div className="host-torso">
            <div className="chest-logo">M</div>
            <div className="chest-text">MITC VISION</div>
            <div className="torso-light" />
          </div>
          <div className="host-arm left"><div className="arm-glow" /><div className="hand"><i /><i /><i /><i /></div></div>
          <div className="host-arm right"><div className="arm-glow" /><div className="hand"><i /><i /><i /><i /></div></div>
          <div className="host-leg left" /><div className="host-leg right" />
          <div className="host-tag">MITC DIGITAL AMBASSADOR</div>
        </div>

        {(mode === 'welcome' || mode === 'performance') && <div className="flash flash-one" />}
        {mode === 'performance' && <><div className="flash flash-two" /><div className="paparazzi p1">CLICK!</div><div className="paparazzi p2">FLASH!</div><div className="paparazzi p3">WOW!</div><div className="welcome-orbit">WELCOME TO MITC</div></>}
      </section>

      <aside className="vision-panel">
        <div className="panel-title"><CircleDot size={15} />MITC VISION</div>
        <div className="metric"><span>HUMAN</span><strong>{personDetected ? 'DETECTED' : 'SCANNING'}</strong></div>
        <div className="metric"><span>HOST</span><strong>{mode === 'autonomous' ? 'ACTIVE' : mode.toUpperCase()}</strong></div>
        <div className="metric"><span>CAMERA</span><strong>{cameraReady ? 'READY' : 'DEMO'}</strong></div>
        <div className="metric"><span>AUDIO</span><strong>{audioOn ? 'LIVE' : 'MUTED'}</strong></div>
        <div className="panel-bar"><i /></div>
      </aside>

      {showcaseOpen && (
        <section className="showcase-overlay" aria-label="Live technology showcase">
          <div className="showcase-window">
            <div className="showcase-heading">
              <div><span>MITC // INTERACTIVE CODING LAB</span><h2>SEE LIVE CODING</h2><p>Change HTML, CSS or JavaScript, then run it to see your changes.</p></div>
              <button className="showcase-close" onClick={() => { window.speechSynthesis?.cancel(); setIsSpeaking(false); setShowcaseOpen(false); }} aria-label="Close showcase">×</button>
            </div>
            <div className="showcase-tabs">
              {showcaseTopics.map(topic => <button key={topic.id} className={showcaseTopic === topic.id ? 'active' : ''} onClick={() => chooseShowcaseTopic(topic.id)}>{topic.label}</button>)}
            </div>
            <div className="showcase-content">
              <div className="showcase-explainer"><span>DEMO 0{showcaseTopics.findIndex(topic => topic.id === showcaseTopic) + 1} / 04</span><h3>{activeShowcase.title}</h3><p>{activeShowcase.intro}</p><div className="showcase-flow">{activeShowcase.caption}</div></div>
              <div className={`showcase-visual showcase-visual-${showcaseTopic}`}>
                {showcaseTopic === 'web' && <div className="mini-browser"><div className="mini-browser-bar"><i /><i /><i /><span>mitc.example</span></div><div className="mini-web-page"><small>MITC • LEARN BY BUILDING</small><strong>Ideas become<br /><em>interactive.</em></strong><p>Structure. Style. Interaction.</p><button onClick={() => speak('Button clicked. JavaScript makes the page interactive.')}>EXPLORE COURSES ↗</button><div className="mini-web-badges"><span>HTML</span><span>CSS</span><span>JAVASCRIPT</span></div></div></div>}
                {showcaseTopic === 'dotnet' && <div className="terminal-demo"><div><i /><i /><i /><span>C# CONSOLE</span></div><pre>{activeShowcase.code}</pre><div className="terminal-output"><span>OUTPUT</span><strong>Welcome to Software Engineering</strong><strong>24</strong><b>PROCESS COMPLETED ✓</b></div></div>}
                {showcaseTopic === 'api' && <div className="api-demo"><div className="api-node client-node"><span>01 / CLIENT</span><strong>Application</strong><small>Sends GET request</small></div><div className="api-transfer"><span>GET /api/courses</span><i>→ → →</i><span>200 OK</span></div><div className="api-node server-node"><span>02 / SERVER</span><strong>API Response</strong><small>JSON data returned</small></div><div className="api-json">{'{ "course": "Software Engineering", "status": "success" }'}</div></div>}
                {showcaseTopic === 'ai' && <div className="ai-demo"><div className="ai-orb"><span>AI</span><i /><i /><i /><i /></div><div className="ai-steps"><span>01 · EXAMPLES</span><b /><span>02 · PATTERNS</span><b /><span>03 · PREDICTION</span></div><div className="ai-prediction"><small>ILLUSTRATIVE OUTPUT</small><strong>Consistent practice</strong><span>→ predicted progress: improving</span></div></div>}
              </div>
              {showcaseTopic === 'web' ? <div className="live-coding-lab"><div className="live-coding-heading"><div><span>LIVE CODING WORKSPACE</span><strong>Edit the code, then run your own preview.</strong></div><button onClick={runLivePreview}>RUN LIVE PREVIEW ▶</button></div><div className="live-coding-editors"><label><span>HTML · STRUCTURE</span><textarea spellCheck={false} value={liveHtml} onChange={event => setLiveHtml(event.target.value)} aria-label="HTML editor" /></label><label><span>CSS · STYLE</span><textarea spellCheck={false} value={liveCss} onChange={event => setLiveCss(event.target.value)} aria-label="CSS editor" /></label><label><span>JAVASCRIPT · INTERACTION</span><textarea spellCheck={false} value={liveJs} onChange={event => setLiveJs(event.target.value)} aria-label="JavaScript editor" /></label></div><div className="live-preview-heading"><span>LIVE OUTPUT PREVIEW</span><small>Runs in an isolated sandbox</small></div><iframe title="Live coding preview" className="live-coding-preview" sandbox="allow-scripts" srcDoc={livePreviewDocument} /></div> : <div className="showcase-code"><div><span>EXAMPLE CODE / CONCEPT</span><button onClick={() => { void navigator.clipboard?.writeText(activeShowcase.code).catch(() => { }); }}>COPY CODE</button></div><pre>{activeShowcase.code}</pre></div>}
            </div>
            <div className="showcase-footer"><span>ICT | SOFTWARE ENGINEERING / WEB DESIGN</span><button onClick={() => { window.speechSynthesis?.cancel(); setIsSpeaking(false); setShowcaseOpen(false); }}>RETURN TO MITC VISION</button></div>
          </div>
        </section>
      )}

      <footer className="footer-credit">
        <div><Radio size={14} /> LIVE EXHIBITION EXPERIENCE</div>
        <div><strong>ICT | SOFTWARE ENGINEERING / WEB DESIGN (WORDPRESS • REACT)</strong></div>
        <div className="footer-actions">
          <button className="showcase-launch" onClick={openShowcase} disabled={mode !== 'autonomous' || isSpeaking || !started} title="Open the live coding workspace">SEE LIVE CODING</button>
          <button onClick={() => { if (!audioOn) startAudio(); else setAudioOn(false); }} title="Toggle voice and sound">{audioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}</button>
          <button onClick={() => document.documentElement.requestFullscreen?.()} title="Enter fullscreen"><Maximize size={15} /></button>
        </div>
      </footer>

      <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
      <div className="camera-note"><Camera size={12} /> Local-first vision • no external image search</div>
    </main>
  );
}

export default App;
