import { useRef, useEffect } from "react";
import "./App.css";

function f(t) {
  return [t * Math.sin(t), t * Math.cos(t)];
}

//credit https://stackoverflow.com/questions/3417183/modulo-of-negative-numbers
function wrap(i, i_max) {
  return ((i % i_max) + i_max) % i_max;
}
function App() {
  const ref = useRef();
  useEffect(() => {
    let t = 0;
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      const color = ["#dde", "#dcc", "dde"];

      // setInterval(() => {
      //   ctx.fillStyle = color[t % color.length];
      //   ctx.fillRect(
      //     Math.random() * 1000 - 300,
      //     Math.random() * 800 - 200,
      //     Math.random() * 1000,
      //     Math.random() * 800
      //   );
      //   t++;
      // }, 400);
      function gen(colors, walk = [0.45, 0.4], initial = [0, 0]) {
        let pos = [...initial];
        return () => {
          ctx.fillStyle = colors[t % colors.length];
          ctx.fillRect(pos[0], pos[1], Math.random() * 20, Math.random() * 20);
          pos[0] = wrap(pos[0] + 20 * (Math.random() - walk[0]), 1800);
          pos[1] = wrap(pos[1] + 20 * (Math.random() - walk[1]), 1000);
        };
      }
      const walkers = [
        gen(["blue", "navy"]),
        gen(["green", "darkgreen"], [0.5, 0.48], [400, 600]),
        gen(["red", "darkred"], [0.5, 0.5], [1000, 400]),
      ];
      setInterval(() => {
        walkers.forEach((walker) => walker());

        t++;
      }, 10);

      setTimeout(() => {
        ctx.fillStyle = "black";
        ctx.moveTo(...f(t));
        ctx.lineTo(...f(t + 1));
      });
    }
  }, []);
  return (
    <div className="App">
      <canvas ref={ref} height={1000} width={1800} />
    </div>
  );
}

export default App;
