import React from 'react'
import InfowindowContentWrap from 'components/PAC_Card_InfoWindow/styles'

const PAC_Card_InfoWindow = () => {
  return (
    
    <InfowindowContentWrap>
    {/* <div id="infowindow-content"> */}
        <span id="place-name" class="title"></span><br />
        <span id="place-address"></span>
    {/* </div> */}
    </InfowindowContentWrap>


  )
}

export default PAC_Card_InfoWindow