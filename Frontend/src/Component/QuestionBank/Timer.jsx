import { useEffect, useState, useRef } from "react";

export default function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, onTimeUp]);

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate percentage for progress bar
  const progressPercent = (timeLeft / duration) * 100;

  // Choose progress bar color based on time left
  let progressColor = "bg-green-500";
  if (progressPercent <= 30) progressColor = "bg-red-500";
  else if (progressPercent <= 60) progressColor = "bg-yellow-500";

  return (
    <section
      aria-label="Test countdown timer"
      className="w-full max-w-xs mx-auto"
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="flex justify-between mb-1 font-mono font-semibold text-gray-700 select-none"
      >
        <span>Time Left</span>
        <span>{`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className={`${progressColor} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  );
}
