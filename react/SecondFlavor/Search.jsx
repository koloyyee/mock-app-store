import React from 'react';
import { FaSistrix } from 'react-icons/fa'
import './css/Search.css'
import { connect } from 'react-redux'
import { loadDataThunk } from '../src/redux/thunk'


class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    updateSearch = (e) => {
        this.setState({
            search: e.currentTarget.value.substr(0, 20)
        })
    }

    render() {
        const filteredFreeResult = this.props.topFreeApp.filter(result => {
            return result.trackName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        const filteredGrossingResult = this.props.topGrossingApp.filter(result => {
            return result.trackName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        const topFreeResult = filteredFreeResult.map(result => {
            return (
                <div key={result.trackName} className="search-info">
                    <img className='result-img' src={result.artworkUrl100} alt={result.trackName} />
                    <div className='app-name'>{result.trackName}</div>
                    <div className='genre'>{result.genres}</div>
                </div>
            )
        })

        const topGrossingResult = filteredGrossingResult.map(result => {
            return (
                <div key={result.trackName} className="search-info">
                    <img className='result-img' src={result.artworkUrl100} alt={result.trackName} />
                    <div className='app-name'>{result.trackName}</div>
                    <div className='genre'>{result.genres}</div>
                </div>
            )
        })

        const sameResult = filteredFreeResult === filteredGrossingResult

        return (
            <div className="search-area">
                <FaSistrix />

                {/* the idea is to show both result at the same time  */}

                <input className="search" value={this.state.search} onChange={this.updateSearch} placeholder={`搜尋`} />

                {this.state.search ?
                    // this is a very messy logic, but here is explanation
                    // sameResult checking the if the input is the same, if same return nothing
                    // if filteredFreeResult is null and filteredGrossingResult is null, it will be negative
                    // else if not the same, if is on filteredFreeResult, show topFree, 
                    // else if search keyword is on filteredGrossResult instead of filteredFreeResult, show topGross,
                    // else just return nothing for topGross
                    // else just return nothing for topFree

                    sameResult ? "" :
                        //check topFree, show it if the search has the letter 
                        filteredFreeResult ?
                            <div className='result'>
                                {topFreeResult}
                            </div> :
                                // the else for filteredFreeResult
                            //check topGrossing, show it if the search has the key letter
                            filteredGrossingResult ?
                                <div className='result'>
                                    {topGrossingResult}
                                </div>
                                // the else for filteredGrossingResult
                                : ""
                    // the else for this.state.search
                    : ""
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        topFreeApp: state.app.topFree,
        topGrossingApp: state.app.topGrossing
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadDataThunk: category => dispatch(loadDataThunk(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)