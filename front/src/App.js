import './App.css';

import Home from './pages';
// import TestMarker from './components/TestMarker'
import GoogleMap from './components/GoogleMap'
import GoogleMap_2 from './components/GoogleMap_2'
import GoogleMap_3 from './components/GoogleMap_3'

import GoogleMap_2_1 from './components/GoogleMap_2_1'


import { Wrapper } from '@googlemaps/react-wrapper';
import SearchBox from './components/SearchBox/index';


function App() {
  return (
    <div className="App">
      

      <Wrapper apiKey='process.env.NEXT_PUBIC_GOOGLE_MAPS_API_KEY' libraries={"places"} > 
        {/* <Home> </Home> */}

        {/* 작동함 🔵 */}
        {/* <GoogleMap> </GoogleMap> */}

        {/* <GoogleMap_2> </GoogleMap_2> */}

        {/* 작동함 🔵 */}
        {/* <GoogleMap_2_1> </GoogleMap_2_1> */}

        {/* 유튜브 버전으로 진행 */}
      
        {/* <GoogleMap_3> </GoogleMap_3> */}

        {/* <TestMarker> </TestMarker> */}

        <SearchBox> </SearchBox>

      </Wrapper>
      

    </div>
  );
}

export default App;
