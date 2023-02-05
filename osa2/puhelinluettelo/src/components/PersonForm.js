const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addContact}>
            <div>
            name: <input 
                id='name'
                value={props.newName}
                onChange={props.handleInputChange}
            />
            </div>
            <div>
            number: <input
                id='number'
                value={props.newNumber}
                onChange={props.handleInputChange}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </div>
    )
}

export default PersonForm;