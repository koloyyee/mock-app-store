import React from 'react';
import {connect} from 'react-redux'
import './css/TopGrossing.css'
import {loadDataThunk} from '../src/redux/thunk'

class TopGrossing extends React.Component{

    componentDidMount(){
        this.props.loadDataThunk('top-grossing')
    }
    render(){return (
        <div className='top-grossing-section'>
            <h2> 推介 </h2>
            <div className='top-grossing' > {this.props.app.map((appInfo,i)=>{
                return <div key={i} className="horizontal">
                        <img className='image' src={appInfo.artworkUrl100} alt={appInfo.trackName}/>
                        <div className='app-name'>{appInfo.trackName}</div>
                        <div className='genre'>{appInfo.genres}</div>
                    </div>
                    
                })} </div>
        </div>
        )

    }
}
const mapStateToProps=(state)=>{return {app : state.app.topGrossing}}

const mapDispatchToProps= (dispatch)=>({
    loadDataThunk: category=>dispatch(loadDataThunk(category))
})
export default connect(mapStateToProps,mapDispatchToProps)(TopGrossing)

