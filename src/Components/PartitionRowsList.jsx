import Trash from "../IconComponents/Trash";

function PartitionRowsList(props){


    const listPartitionRows = props.partitions_rows.map((partition) => (
    <tr className="snap-end" key={partition.id}>
        <td className="max-w-[15%] w-[15%] border border-white text-center font-normal text-white">{partition.number}</td>
        <td className="max-w-[60%] w-[60%] border border-white text-center font-normal text-white">{partition.size}</td>
        <td className="max-w-[25%] w-[25%] border border-white text-center font-normal text-white">
            <button className="p-1" onClick={()=> DeletePartitionRow(partition.id)}>
                <Trash className="hover:text-teal-600"/>
            </button>
        </td>
    </tr>
    ));
    

    const DeletePartitionRow = (id) => {
        let filteredArr = props.partitions_rows.filter((el) => el.id !== id);
        props.setPartitions_rows(filteredArr);
    } 

    return(
        <div className="my-2 max-w-[90%] h-full max-h-[83.333333%] w-[90%] rounded outline outline-2 outline-white overflow-auto scroll-smooth snap-y"> {/*tabla de particiones a añadir*/}
            <table className="w-full max-w-full border-collapse">
            <thead>
                <tr>
                    <th className="max-w-[15%] w-full border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">#</th>
                    <th className="max-w-[60%] w-full border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">Size</th>
                    <th className="max-w-[25%] w-full border border-white text-center font-semibold text-teal-600 bg-white sticky top-0 z-10">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listPartitionRows}
            </tbody>
            </table>
        </div>
    )

}

export default PartitionRowsList;