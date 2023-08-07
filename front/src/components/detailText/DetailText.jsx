import React from 'react'
import { DetailLabel } from './detailText.styled'

const DetailText = ({estate, seller}) => {
    console.log(estate)
    console.log(seller)
    console.log(estate.additional_address);

  return (
    <div>
        <DetailLabel>{estate.additional_address}</DetailLabel>
        
    </div>
  )
}

export default DetailText