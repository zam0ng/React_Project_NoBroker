import React , {useState} from 'react'
import { InputWrapper } from 'components/PlaceAutocomplete/styles'

import { FaSearch } from 'react-icons/fa'


const ComboboxInput = () => {

    const [searchBarInput, setSearchBarInput] = useState("")

    // 사용자 입력값을 1) 저장하고 2) 서버에 보냄
    const handleChange = (inputValue) => {
        // 사용자 입력값을 searchBarInput 에 저장
        setSearchBarInput(inputValue)
        
        // 사용자 입력값을 서버로 보내서 필요한 데이터를 받는 과정 | 전제는 서버에 접근할 수 있는 덩어리가 있어야 함

    }

    return (
    <div>    
            <InputWrapper>
                <FaSearch id="search-icon" />
                <input 
                    placeholder='Type to search...'  
                    value = {searchBarInput}
                    onChange={(e) => {handleChange(e.target.value)}}
                />
                    {console.log(searchBarInput)}
            </InputWrapper>
    </div>
)
}

export default ComboboxInput

