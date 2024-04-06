import AsignationForm from "./AsignationForm";
import ProgramsDefault from "./ProgramsDefault";

function ProcessAssignation() {
  return (
    <div className="flex flex-col w-full max-w-full border border-white border-r-1 border-l-1 border-t-0 border-l-0 border-b-0">
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
