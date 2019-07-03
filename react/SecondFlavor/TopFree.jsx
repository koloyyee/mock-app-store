import React from 'react';
import './css/TopFree.css'
import {connect} from 'react-redux'
import {loadDataThunk} from '../src/redux/thunk'
import StarRatings from 'react-star-ratings';
import loading from '../icons/loading.gif'

class TopFree extends React.Component{


    constructor(props){
        super(props)
        this.state={
            total:100,
            currentCount: 10,
            offset:10,
            listOfTopFree:[],
            isFetching:false
        }
    }

    componentDidMount(){
        this.props.loadDataThunk('top-free',10)
        window.addEventListener('scroll', this.loadOnScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadOnScroll)
    }

    loadOnScroll=()=>{
        if(this.state.currentCount  === this.state.total) {
            return;
        }
        const loading = document.querySelector('#loading-app')
        const  rect = loading.getBoundingClientRect();
        const atTheBottom=(
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeigh) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
        if(atTheBottom){
            if(!this.state.isFetching){
                this.setState({isFetching:true})
            }
        
                let count = this.state.currentCount + this.state.offset
                if(this.state.currentCount !== this.state.total){
                    this.setState({
                        isFetching:false,
                        currentCount:count,
                    })
                    this.props.loadDataThunk('top-free',count )
                }
        }
    }

    render(){
        return (

            <div className='top-free'> 
                <div className="fetched-data">
                    {this.props.app.map((appInfo,i)=>{
                    return(
                        <div key={i} className='vertical' >
                        <h3>{i+1}</h3>
                            <div className="app-img">
                                <img className={(i+1)%2 ===0? "even" : "odd"} src={appInfo.artworkUrl100} alt={appInfo.trackName}/>
                            </div>
                            <div className="app-info">
                                <div className='app-name'>{appInfo.trackName}</div> 
                                <div className='genre'>{appInfo.genres}</div>
                                <div className="app-rating">
                                <StarRatings
                                    rating={appInfo.averageUserRating}
                                    starDimension="15px"
                                    starSpacing="1px"
                                    starRatedColor='rgb(254,149,0)'
                                    starEmptyColor='rgb(250,250,255)'
                                />
                                    <div className='count'>{appInfo.userRatingCount? `(${appInfo.userRatingCount})`: `(0)`}</div>
                                </div>

                                
                            </div>
                            
                        </div>
                        )
                    })} 
                    </div>
                    { this.state.currentCount !== this.state.total?
                        <img id ="loading-app" src={loading} alt="loading..." />
                        :
                        null
                    }
                </div>
        )
    }
}


const mapStateToProps=(state)=>{return {app : state.app.topFree}}

const mapDispatchToProps= {loadDataThunk}


export default connect(mapStateToProps,mapDispatchToProps )(TopFree)
