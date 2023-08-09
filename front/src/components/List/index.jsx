import PlaceAutoCompleteSearch from '../PlaceAutoCompleteSearch/index'
import ItemList from '../ItemList/index'
import SubHeader from 'components/SubHeader/index'
import ContentWrapper from 'components/ContentWrapper/styles'
import MainContentWrap from 'components/MainContentWrap/styles'
import { Wrapper } from '@googlemaps/react-wrapper';
import { Scrollbar } from 'react-scrollbars-custom';


const List = () => {
  return (

      <Wrapper apiKey='process.env.NEXT_PUBIC_GOOGLE_MAPS_API_KEY' libraries={"places"} > 

        {/* 작동함 🔵 */}
        {/* <GoogleMap> </GoogleMap> */}

        {/* 작동함 | 클러스터링 | 🔵 */}
        {/* <GoogleMap_2_1> </GoogleMap_2_1> */}

        {/* PlaceAutoCompleteSearch 작동함🔵 | 검색 기능, 마커 info window에 데이터 연결 가능, 클러스터 기능*/}

          <SubHeader />

          <MainContentWrap>
              
            <ContentWrapper>
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              <ItemList className="ItemList" /> 
              
            </ContentWrapper>
          
            <PlaceAutoCompleteSearch /> 
          </MainContentWrap>

      </Wrapper>
      
  );
}

export default List;
