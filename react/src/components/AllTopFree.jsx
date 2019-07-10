import React from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import TopFree from "./TopFree";
import { connect } from "react-redux";
import loading from "../icons/loading.gif";

const TopFreeList = ({ items, loadMoreItems, hasNextPage }) => {
  const isItemLoaded = index => !hasNextPage || index < items.length;
  const Row = ({ index }) => (
    <div>
      {!isItemLoaded(index) ? (
        <img id="loading-app" src={loading} alt="loading..." />
      ) : (
        items.map((app, i) => {
          return (
            <TopFree
              key={i}
              index={i}
              artworkUrl100={app.artworkUrl100}
              trackName={app.trackName}
              genres={app.genres}
              averageUserRating={app.averageUserRating}
              userRatingCount={app.userRatingCount}
            />
          );
        })
      )}
    </div>
  );

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={450}
          itemSize={30}
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};

const mapStateToProps = state => {
  return { topFree: state.app.topFree };
};

export default connect(
  mapStateToProps,
  null
)(TopFreeList);
