import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { GameLobby } from "./components/game/GameLobby";
import { LocalTriviaGame } from "./components/game/LocalTriviaGame";
import { MultiplayerLobby } from "./components/game/MultiplayerLobby";
import { OneVsOneLobby } from "./components/game/OneVsOneLobby";
import { CustomQuestionsSetup } from "./components/game/CustomQuestionsSetup";
import { useTriviaGame } from "./lib/stores/useTriviaGame";
import { useAudio } from "./lib/stores/useAudio";
import { IntroScreen } from "./components/game/IntroScreen";
import { Toaster } from "./components/ui/sonner";
import { MultiplayerTriviaGame } from "./components/game/MultiplayerTriviaGame";
import { WebSocketProvider } from "./lib/contexts/WebSocketContext";
import { ModeSelect } from "./components/game/ModeSelect";

function IntroScreenWrapper() {
  const navigate = useNavigate();
  return <IntroScreen onStart={() => navigate('/mode')} />;
}




function AppContent() {
  const {
    setBackgroundMusic,
    setHitSound,
    setSuccessSound,
  } = useAudio();
  const location = useLocation();

  // Audio setup
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const bgMusic = new Audio("/sounds/background.mp3");
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        setBackgroundMusic(bgMusic);
        
        const hitSound = new Audio("/sounds/hit.mp3");
        hitSound.volume = 0.5;
        setHitSound(hitSound);
        
        const successSound = new Audio("/sounds/success.mp3");
        successSound.volume = 0.6;
        setSuccessSound(successSound);
      } catch (error) {
        console.log("Audio initialization failed:", error);
      }
    };
    initializeAudio();
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route
          path="/"
          element={<IntroScreenWrapper />}
        />
        <Route path="/mode" element={<ModeSelect />} />
        <Route path="/mode/local" element={<GameLobby />} />
        <Route path="/mode/multiplayer" element={<MultiplayerLobby />} />
        <Route path="/mode/1v1" element={<OneVsOneLobby />} />
        <Route path="/game" element={<LocalTriviaGame />} />
        <Route
          path="/multiplayer-game"
          element={
            <MultiplayerTriviaGame
              playerId={location.state?.playerId}
              players={location.state?.players}
            />
          }
        />
        <Route path="/custom-questions" element={<CustomQuestionsSetup />} />
        {/* You can add more routes for results, etc. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <AppContent />
      </Router>
    </WebSocketProvider>
  );
}

export default App;
