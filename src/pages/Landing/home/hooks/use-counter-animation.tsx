import { useEffect, useState } from "react";

export function useCounterAnimation(
  ref: React.RefObject<HTMLElement>,
  target: number,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animateCounter();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const animateCounter = () => {
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      setCount(Math.floor(current));
      
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);
  };

  return count;
}
