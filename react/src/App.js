import React,{Suspense} from 'react';
import Search from './components/Search'
import TopGrossing from './components/TopGrossing'
import store from './store'
import {Provider} from 'react-redux'

const TopFree = React.lazy(() => import('./components/TopFree'));

function App() {
  return (
    <Provider store={store}>
      <div className="App" >
        <Search />
        <TopGrossing />
        <Suspense fallback={<div> loading </div>}>
          <TopFree />
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
