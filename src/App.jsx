import Management from "./Components/Management";
import ProcessAssignation from "./Components/ProcessAssignation";
import MemMap from "./Components/MemMap";
import { GlobalProvider } from "./context/GlobalState";

import ProcessList from "./Components/ProcessList";

function App() {
  return (
    <GlobalProvider>
      <div className="flex p-6 md:p-14  bg-zinc-800 h-screen w-screen justify-center items-center">
        <main className="h-full flex flex-col gap-4">
          <h1 className="text-center font-bold text-4xl text-white">
            Memory Management Simulator
          </h1>
          <div className="outline outline-white h-full outline-4 flex flex-col md:flex-row rounded-md bg-zinc-800 text-slate-100 overflow-auto">
            <ProcessAssignation />
            <ProcessList />
            {/* <Management /> */}
            {/* <MemMap/>           */}
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;
