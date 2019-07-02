import React from 'react';
import './css/TopGrossing.css'

const  TopGrossing = props => {

        return (
        <div className='top-grossing'>
                 <div index={props.index} className="horizontal">
                        <img className='image' src={props.artworkUrl100} alt={props.trackName}/>
                        <div className='app-name'>{props.trackName}</div>
                        <div className='genre'>{props.genres}</div>
                    </div>
                    
         </div>

        )
}

export default TopGrossing;