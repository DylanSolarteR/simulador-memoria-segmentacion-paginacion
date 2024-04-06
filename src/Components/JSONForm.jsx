import { useState } from "react";
import { useGlobalState } from "../context/GlobalState";

function JSONForm() {
    const { addTask } = useGlobalState();
    
    const initialJSON = 
    `{\n  "PID": "",\n  "task": "",\n  "text": "",\n  "data": "",\n  "bss": "",\n}`;          
    
    const [textArea, setTextArea] = useState(initialJSON);

    const onSubmit = () => {
        const formJSON = JSON.parse(textArea);

        addTask({
            PID: formJSON.PID,
            task: formJSON.task,
            size: formJSON.text+formJSON.bss+formJSON.data+65536+131072
        });

        setTextArea(initialJSON);
    };

    return (
        <div>
            <h1 className="mb-4 ml-2">JSON Asignation</h1>

            <div className="ml-4 mr-4">
                <textarea
                    value={textArea}
                    onChange={(e) => setTextArea(e.target.value)}
                    rows={10}
                    className="bg-zinc-700 text-slate-200 w-full rounded-md px-4 py-3 resize-none h-52"
                />
            </div>

            <div className="flex justify-center">
                <button onClick={onSubmit} className="mt-2 mb-4 text-white bg-teal-600 w-20 p-1 rounded">
                    Assign
                </button>
            </div>
        </div>
    )
}

export default JSONForm;