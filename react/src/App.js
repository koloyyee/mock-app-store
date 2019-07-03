import React,{Suspense} from 'react';
import store from './store'
import {Provider} from 'react-redux'
import loading from '../src/icons/loading.gif'


const Main = React.lazy(() => import('./components/Main.jsx'));

function App() {
  return (
    <Provider store={store}>
      <div className="App" >    
        <Suspense fallback={ <img id ="loading-app" src={loading} alt="loading..." />}>
          <Main />
        </Suspense>
      </div>
    </Provider>
  );
}
export default App;
