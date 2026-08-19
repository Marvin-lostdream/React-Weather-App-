import "./App.css";
import WeatherComponent from "./components/WeatherComponent";



function App() {
  return (
    <>
      <div className=" w-full min-h-screen py-3 bg-linear-to-t from-blue-500 to-cyan-400 flex justify-center">
        <div className="absolute w-full overflow-hidden">
          <div className="w-[200%] h-80 bg-[url(/clouds.avif)] bg-size-[auto_350px] bg-repeat-x animate-[cloud-move_128s_alternate_infinite] will-change-transform"></div>
        </div>
        <WeatherComponent />
      </div>
    </>
  );
}

export default App;
