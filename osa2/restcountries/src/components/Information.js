const Information = (props) => {
    
    // Suoritetaan jos hakutuloksia on vain yksi
    if (props.countryData.length === 1) {
        const AllDataFromCountry = props.rawData.filter(data => data.name.common.includes(props.countryData))
        return (
            <div>
                <div>
                    <h2>{AllDataFromCountry[0].name.common}</h2>
                    <p>Capital: {AllDataFromCountry[0].capital}</p>
                    <p>Area: {AllDataFromCountry[0].area}</p>
                </div>
                <div>
                    <h3>Languages</h3>
                    {Object.values(AllDataFromCountry[0].languages).map(l => 
                        <li key={l}>
                            {l}
                        </li>
                    )}
                </div>
                <div>
                    <img 
                        src={AllDataFromCountry[0].flags.png}>
                    </img>
                </div>
            </div>
        )
    }
}

export default Information;