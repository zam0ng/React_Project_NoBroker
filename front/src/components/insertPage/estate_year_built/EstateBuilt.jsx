import React from 'react'
import { Container , Title,BuiltBox} from './builtstyled'

const EstateBuilt = () => {
  return (
    <Container>
        <Title>매물 건축년도 <span>*</span></Title>
        <BuiltBox>
            <input type="date" />
        </BuiltBox>
    </Container>
  )
}

export default EstateBuilt