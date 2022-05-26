import useSound from "use-sound";

const sfxA = "/assets/sounds/mixkit-bell-sound-with-delay-585.wav";
const sfxB = "/assets/sounds/mixkit-bike-magical-bell-591.wav";
const sfxC = "/assets/sounds/mixkit-bike-notification-bell-590.wav";
const sfxD = "/assets/sounds/mixkit-discrete-door-bell-announcement-225.wav";
const sfxE = "/assets/sounds/mixkit-happy-bell-alert-601.wav";
const sfxF = "/assets/sounds/mixkit-melodic-classic-door-bell-111.wav";
const sfxG = "/assets/sounds/mixkit-service-bell-double-ding-588.wav";
const sfxH = "/assets/sounds/mixkit-small-door-bell-589.wav";

export const useSoundEffects = () => {
  const [playSound] = useSound(sfxA);
  const play = () => {
    playSound();
  };
  return { play };
};
