import Management from "./components/Management";
import ProcessAssignation from "./components/ProcessAssignation";
import MemMap from "./components/MemMap";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className="flex p-6 md:p-14 bg-zinc-800 h-screen w-screen justify-center items-center">
        <main className="h-full w-full flex flex-col gap-4">
          <h1 className="text-center font-bold md:text-4xl text-xl text-white">
            Memory Management Simulator
          </h1>
          <div className="outline outline-white h-full max-h-full outline-4 flex flex-col md:flex-row rounded-md bg-zinc-800 text-slate-100 overflow-auto">
            <ProcessAssignation />
            <Management />
            <MemMap />
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;
