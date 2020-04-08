import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Covid = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('https://api.covid19api.com/summary')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, [])


    if (data) {
        const dataSort = data.Countries.sort((a, b) => {
            if (a.TotalConfirmed > b.TotalConfirmed) {
                return -1;
            }
            if (a.TotalConfirmed < b.TotalConfirmed) {
                return 1;
            }
            return 0;

        })

        return (
            <div>
                <div className="inline">

                    <h1>CORONAVIRUS DATA </h1>
                    <h2>Global Cases</h2>
                    <small>at {data.Date}</small>
                </div>

                <div>
                    <p>Total confirmed: {data.Global.TotalConfirmed}</p>
                    <p>New confirmed: {data.Global.NewConfirmed}</p>
                    <p>New deaths: {data.Global.NewDeaths}</p>
                    <p>New recovered: {data.Global.NewRecovered}</p>
                    <p>Total recovered: {data.Global.TotalRecovered}</p>
                </div>

                <h2>Cases By Country</h2>


                <div className="inline">
                    {data.Countries.map(elm => (
                        <div className='country'>
                            <h5 key={elm.Country}>{elm.Country}</h5>
                            <hr></hr>
                            <p>Total confirmed: {elm.TotalConfirmed}</p>
                            <p>New confirmed: {elm.NewConfirmed}</p>
                            <p>New deaths: {elm.NewDeaths}</p>
                            <p>New recovered: {elm.NewRecovered}</p>
                            <p>Total recovered: {elm.TotalRecovered}</p>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
    return (
        <p>Loading..</p>
    )

}

export default Covid

