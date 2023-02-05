const ShowMessage = ({ message }) => {
    if (message === null) {
        return null
    }
    else {
        return (
            <div className="messageStyle">
                {message}
            </div>
        )
    }
}

export default ShowMessage;