import { useRef, useEffect } from "react";
import "./App.css";

//credit https://stackoverflow.com/questions/3417183/modulo-of-negative-numbers
function wrap(i, i_max) {
  return ((i % i_max) + i_max) % i_max;
}

const rando = 20;
function App() {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, 1800, 1000);

      function gen(colors, walk = [0.45, 0.4], initial = [0, 0]) {
        let pos = [...initial];
        let t = 0;
        let ct = 0;
        return () => {
          ctx.fillStyle = colors[ct % colors.length];
          ctx.fillRect(
            pos[0] + 500 * Math.cos(ct / 1000) * Math.sin(t),
            pos[1] + 500 * Math.cos(ct / 1000) * Math.cos(t),
            Math.random() * 200 * Math.sin(ct / 100),
            Math.random() * 200 * Math.sin(ct / 100)
          );
          pos[0] = wrap(pos[0] + rando * (Math.random() - walk[0]), 1800);
          pos[1] = wrap(pos[1] + rando * (Math.random() - walk[1]), 1000);
          t += 0.01;
          ct++;
        };
      }
      const walkers = [
        gen(["blue", "navy"], [0.5, 0.5], [600, 100]),
        gen(["green", "darkgreen"], [0.5, 0.48], [400, 400]),
        gen(["red", "darkred"], [0.5, 0.5], [1000, 400]),
        gen(["yellow", "orange"], [0.49, 0.5], [1000, 400]),
        gen(["#f0f", "purple"], [0.49, 0.49], [1100, 300]),
        gen(["#232", "black"], [0.49, 0.49], [200, 200]),
        gen(["#249", "43a"], [0.49, 0.49], [900, 400]),
        gen(["#2A1B0E ", "#654321"], [0.49, 0.49], [600, 500]),
      ];
      setInterval(() => {
        walkers.forEach((walker) => walker());
      }, 10);

      setInterval(() => {
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = "#333";
          ctx.fillRect(
            (Math.random() - 0.1) * 2000,
            (Math.random() - 0.1) * 1200,
            150,
            150
          );
        }
      }, 10);
    }
  }, []);
  return (
    <div className="App">
      <canvas ref={ref} height={1000} width={1800} />
    </div>
  );
}

export default App;
