import React from 'react'

const PAC_Card = () => {
return (
    <>
        <div class="pac-card" id="pac-card">
            <div>

                {/* 제목 */}
                <div id="title">Autocomplete search</div>
                
                {/* 타입 1*/}
                <div id="type-selector" class="pac-controls">
                    <input
                        type="radio"
                        name="type"
                        id="changetype-all"
                        checked="checked"
                    />

                    <label for="changetype-all">All</label>

                    <input type="radio" name="type" id="changetype-establishment" />
                    <label for="changetype-establishment">establishment</label>

                    <input type="radio" name="type" id="changetype-address" />
                    <label for="changetype-address">address</label>

                    <input type="radio" name="type" id="changetype-geocode" />
                    <label for="changetype-geocode">geocode</label>

                    <input type="radio" name="type" id="changetype-cities" />
                    <label for="changetype-cities">(cities)</label>

                    <input type="radio" name="type" id="changetype-regions" />
                    <label for="changetype-regions">(regions)</label>
                </div>
                <br />

                {/* 타입 2 */}
                <div id="strict-bounds-selector" class="pac-controls">
                    <input type="checkbox" id="use-location-bias" value="" checked />
                    <label for="use-location-bias">Bias to map viewport</label>

                    <input type="checkbox" id="use-strict-bounds" value="" />
                    <label for="use-strict-bounds">Strict bounds</label>
                </div>
            </div>

                {/* 검색창 | seachbar */}
                <div id="pac-container">
                    <input id="pac-input" type="text" placeholder="Enter a location" />
                </div>
            </div>
    </>
)
}

export default PAC_Card