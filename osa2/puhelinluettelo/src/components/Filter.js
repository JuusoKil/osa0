const Filter = (props) => {
    return (
      <div>
        {props.text}
        <input 
            id="search"
            value={props.searchValue}
            onChange={props.handleInputChange}
          />
      </div>
    )
  }

export default Filter;