function Program(props){
    return(
        <div className="my-1 p-4 bg-teal-800 w-full text-white rounded h-auto flex flex-row justify-between">
            <p className='w-2/4'>{props.name}</p>
            <input type="button" value="Edit" className=''/>
            <input type="button" value="Execute" className=''/>
        </div>
    )
}

export default Program;