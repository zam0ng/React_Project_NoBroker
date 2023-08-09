import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Insert from "./components/insertPage/Insert";

import { QueryClient, QueryClientProvider } from "react-query";
import { Detail } from "./components";


import Home from './pages';
// import TestMarker from './components/TestMarker'
import GoogleMap from './components/GoogleMap'
import GoogleMap_2 from './components/GoogleMap_2'
import GoogleMap_3 from './components/GoogleMap_3'

import GoogleMap_2_1 from './components/GoogleMap_2_1'
import PlaceAutoCompleteSearch from './components/PlaceAutoCompleteSearch/index'

import ItemList from './components/ItemList/index'

import SuperCluster_Test from './components/SuperCluster_Test/index'
import Supercluster_Test2 from './components/Supercluster_Test2/index'
import ItemListWrapper from './components/ItemListWrapper'

import NavHeader from 'components/navbar/NavHeader'
import SubHeader from 'components/SubHeader/index'


import ContentWrapper from 'components/ContentWrapper/styles'

import { Wrapper } from '@googlemaps/react-wrapper';
import SearchBox from './components/SearchBox/index';

const queryClient = new QueryClient();



function App() {
  return (
    <div className="App">
      

      <Wrapper apiKey='process.env.NEXT_PUBIC_GOOGLE_MAPS_API_KEY' libraries={"places"} > 
        {/* <Home> </Home> */}

        {/* 작동함 🔵 */}
        {/* <GoogleMap> </GoogleMap> */}

        {/* <GoogleMap_2> </GoogleMap_2> */}

        {/* 작동함 | 클러스터링 | 🔵 */}
        {/* <GoogleMap_2_1> </GoogleMap_2_1> */}

        {/* 유튜브 버전으로 진행 */}
      
        {/* <GoogleMap_3> </GoogleMap_3> */}

        {/* 작동함🔵 | 검색 기능, 마커 info window에 데이터 연결 가능, 클러스터 기능*/}
        
          <NavHeader />
          <SubHeader />

          <ContentWrapper>
            <ItemList className="ItemList" /> 
            <ItemList className="ItemList" /> 
            <ItemList className="ItemList" /> 
            <ItemList className="ItemList" /> 
            <ItemList className="ItemList" /> 
            {/* <PlaceAutoCompleteSearch />  */}
          </ContentWrapper>


        {/* <SuperCluster_Test> </SuperCluster_Test> */}

        {/* 클러스터링 할 때, 계산되는지, 테스트 */}
        {/* <Supercluster_Test2> </Supercluster_Test2> */}

        {/* <TestMarker> </TestMarker> */}

        {/* <SearchBox> </SearchBox> */}

      </Wrapper>
      

    </div>
    // <QueryClientProvider client={queryClient}>
    //   <div className="App">
    //     <NavHeader></NavHeader>
    //     <Routes>
    //       <Route path="/insert" element={<Insert />} />
    //       <Route path="/detail/:id" element={<Detail />} />
    //     </Routes>
    //   </div>
    // </QueryClientProvider>
  );
}

export default App;
