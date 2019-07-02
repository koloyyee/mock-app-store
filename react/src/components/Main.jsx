import React from 'react';
import { FaSistrix } from 'react-icons/fa'
import './css/Search.css'
import { connect } from 'react-redux'
import { loadDataThunk } from '../redux/thunk'
import loading from '../icons/loading.gif'
import TopFree from './TopFree'
import TopGrossing from './TopGrossing'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            total:100,
            currentCount: 10,
            offset:10,
            listOfTopFree:[],
            isFetching:false
        }
    }
    componentDidMount() {
        this.props.loadDataThunk('top-free', 10)
        this.props.loadDataThunk('top-grossing')
        window.addEventListener('scroll', this.loadOnScroll)

    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadOnScroll)
    }

    loadOnScroll=()=>{
        if(!this.state.search) {
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
    }


    updateSearch = (e) => {
        this.setState({
            search: e.currentTarget.value.substr(0, 20)
        })
    }

    render() {
        const filteredFreeResult = this.props.topFree.filter(result => {
            return result.trackName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        const filteredGrossingResult = this.props.topGrossing.filter(result => {
            return result.trackName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        const topFreeResult = filteredFreeResult.map((result, i) => {
            return (
                <TopFree 
                    artworkUrl100={result.artworkUrl100}
                    trackName={result.trackName} 
                    genres = {result.genres}
                    averageUserRating={result.averageUserRating}
                    userRatingCount = {result.userRatingCount}
                    index={i}
                    />
            )
        })

        const allTopFree = this.props.topFree.map((app, i) => {
            return(

                    <TopFree 
                        index = {i}
                        artworkUrl100={app.artworkUrl100}
                        trackName={app.trackName} 
                        genres = {app.genres}
                        averageUserRating={app.averageUserRating}
                        userRatingCount = {app.userRatingCount}
                        />

            )
        })

        const topGrossingResult = filteredGrossingResult.map((result,i) => {
            return (
                <TopGrossing 
                artworkUrl100={result.artworkUrl100}
                trackName={result.trackName}
                genres={result.genres}
                index={i}
                />
            )
        })

        const allTopGrossing = this.props.topGrossing.map((app,i)=>{
            return (
                <TopGrossing 
                artworkUrl100={app.artworkUrl100}
                trackName={app.trackName}
                genres={app.genres}
                index={i}
                />
            )
        })

        return (
            <div className="main">
                <div className="search-area">
                    <FaSistrix />
                <input className="search" value={this.state.search} onChange={this.updateSearch} placeholder={`搜尋`} />
                </div>
                <div className= "grossing-and-free">
                        <h2> 推介 </h2>
                    <div className = "top-grossing-section">
                        {this.state.search ? topGrossingResult:allTopGrossing}
                    </div>
                    <div className = "top-free">
                        {this.state.search ? topFreeResult:allTopFree}
                    {!this.state.search?
                    this.state.currentCount !== this.state.total?
                                <img id ="loading-app" src={loading} alt="loading..." />
                                :
                                null
                            
                    :null
                    }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return{
        topFree : state.app.topFree,
        topGrossing: state.app.topGrossing
    }
}

const mapDispatchToProps = {loadDataThunk}

export default connect(mapStateToProps,mapDispatchToProps)(Main)