import React from "react";
import "./css/TopFree.css";
import StarRatings from "react-star-ratings";

export default class TopFree extends React.Component {
  render() {
    return (
      <div key={this.props.index} className="vertical">
        <h3>{this.props.index + 1}</h3>
        <div className="app-img">
          <img
            className={(this.props.index + 1) % 2 === 0 ? "even" : "odd"}
            src={this.props.artworkUrl100}
            alt={this.props.trackName}
          />
        </div>
        <div className="app-info">
          <div className="app-name">{this.props.trackName}</div>
          <div className="genres">{this.props.genres}</div>
          <div className="app-rating">
            <StarRatings
              rating={this.props.averageUserRating}
              starDimension="15px"
              starSpacing="1px"
              starRatedColor="rgb(254,149,0)"
              starEmptyColor="rgb(250,250,255)"
            />
            <div className="count">
              {this.props.userRatingCount
                ? `(${this.props.userRatingCount})`
                : `(0)`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
