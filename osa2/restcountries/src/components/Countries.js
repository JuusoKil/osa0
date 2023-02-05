const Countries = (props) => {

    // Palautetaan tyhjä div, jos hakukenttä on tyhjä
    if (props.search === '') {
        return <div></div>
    }

    // Palautetaan ilmoitus, jos error tila on true > hakutuloksia on yli 10
    else if (props.error === true) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    // Jos muut ehdot eivät täyty ja hakutuloksia on enemmän kuin 1, palautetaan kaikki hakutulokset
    else if (props.countryData.length != 1) {
        return (
            <div>
                {props.countryData.map(country => 
                    <div key={country}>
                    {country}
                    <button onClick={() => props.setSearchValue(country)}>Show</button>
                    </div>
                )}
            </div>
        )
    }
}

export default Countries;