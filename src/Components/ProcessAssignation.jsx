import AsignationForm from "./AsignationForm";
import ProgramsDefault from "./ProgramsDefault";

function ProcessAssignation() {
  return (
    <div className="md:overflow-auto flex flex-col w-full max-w-full md:max-w-[30%] border-2 border-white">
      <div className="border border-white border-b-1 border-r-0 border-l-0 border-t-0">
        <AsignationForm />
      </div>
      <div className="flex flex-col justify-center items-center h-full max-h-full">
        <ProgramsDefault />
      </div>
    </div>
  );
}

export default ProcessAssignation;
