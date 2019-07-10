import React from "react";
import { FaSistrix } from "react-icons/fa";
import "./css/Search.css";
import { connect } from "react-redux";
import { loadDataThunk } from "../redux/thunk";
import TopFree from "./TopFree";
import TopGrossing from "./TopGrossing";
import TopFreeList from "./AllTopFree";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      total: 100,
      currentCount: 10,
      offset: 10,
      listItems: [],
      moreItemsLoading: false,
      hasNextPage: true
    };
  }
  componentDidMount() {
    this.props.loadDataThunk("top-free", 10);
    this.props.loadDataThunk("top-grossing");
  }

  loadMore = () => {
    // loadMore follows the react-window-infinite-loader instruction
    // start from an empty array. Duplicate the array and concat 
    // at the same time fetch new data according variable count.
    let count = this.state.currentCount + this.state.offset;
    this.setState({ moreItemsLoading: true }, () => {
      if (count <= this.state.total) {
        this.setState(state => ({
          hasNextPage: state.listItems.length < this.state.total,
          moreItemsLoading: false,
          currentCount: count,
          item: [...state.listItems].concat(this.props.topFree)
        }));
        this.props.loadDataThunk("top-free", count);
      }
    });
  };

  updateSearch = e => {
    this.setState({
      search: e.currentTarget.value.substr(0, 20)
    });
  };

  render() {
    const filteredFreeResult = this.props.topFree.filter(result => {
      return result.trackName
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    const filteredGrossingResult = this.props.topGrossing.filter(result => {
      return result.trackName
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    const topFreeResult = filteredFreeResult.map((result, i) => {
      return (
        <TopFree
          key={i}
          artworkUrl100={result.artworkUrl100}
          trackName={result.trackName}
          genres={result.genres}
          averageUserRating={result.averageUserRating}
          userRatingCount={result.userRatingCount}
          index={i}
        />
      );
    });

    const topGrossingResult = filteredGrossingResult.map((result, i) => {
      return (
        <TopGrossing
          key={i}
          artworkUrl100={result.artworkUrl100}
          trackName={result.trackName}
          genres={result.genres}
          index={i}
        />
      );
    });

    const allTopGrossing = this.props.topGrossing.map((app, i) => {
      return (
        <TopGrossing
          key={i}
          artworkUrl100={app.artworkUrl100}
          trackName={app.trackName}
          genres={app.genres}
          index={i}
        />
      );
    });

    return (
      <div className="main">
        <div className="search-area">
          <FaSistrix />
          <input
            className="search"
            value={this.state.search}
            onChange={this.updateSearch}
            placeholder={`搜尋`}
          />
        </div>
        <div className="grossing-and-free">
          <h2> 推介 </h2>
          <div className="top-grossing-section">
            {this.state.search ? topGrossingResult : allTopGrossing}
          </div>
          <div className="top-free">
            {this.state.search ? (
              topFreeResult
            ) : (
              <TopFreeList
                items={this.props.topFree}
                moreItemsLoading={this.state.moreItemsLoading}
                loadMoreItems={this.loadMore}
                hasNextPage={this.state.hasNextPage}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    topFree: state.app.topFree,
    topGrossing: state.app.topGrossing
  };
};

const mapDispatchToProps = { loadDataThunk };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
