const Search = (props) => {
    return (
        <div>
            {props.text}
            <input
                value={props.searchValue}
                onChange={props.handleChange}
            />
        </div>
    )
} 

export default Search;