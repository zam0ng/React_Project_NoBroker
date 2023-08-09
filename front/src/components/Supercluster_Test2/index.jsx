import React, { useState, useEffect , useRef} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Supercluster from 'supercluster';

// 지도 크기 
const mapContainerStyle = {
    width: '100%',
    height: '80vh'
};

// 지도 처음 위치
const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194
};



function Supercluster_Test2() {
    const mapRef = useRef(null);

    // 클러스터리된 결과물 저장
    const [clusters, setClusters] = useState([]);

    // 선택된 클러스터, 포인터 정보를 저장 
    const [selectedCluster, setSelectedCluster] = useState(null);

    // 현재 zoom 수준을 저장하기 위한 상태
    const [currentZoom, setCurrentZoom] = useState(15);


    // 임의의 예시 포인트 데이터
    const points = [
        { type: 'Feature', properties: {value:10}, geometry: { type: 'Point', coordinates: [-122.414, 37.778] } },
        { type: 'Feature', properties: {value:20}, geometry: { type: 'Point', coordinates: [-122.414, 37.779] } },
        { type: 'Feature', properties: {value:30}, geometry: { type: 'Point', coordinates: [-122.414, 37.780] } },
        { type: 'Feature', properties: {value:50}, geometry: { type: 'Point', coordinates: [-122.415, 37.778] } },
        { type: 'Feature', properties: {value:70}, geometry: { type: 'Point', coordinates: [-122.415, 37.776] } },
    ];


    useEffect(() => {
        const index = new Supercluster({
            radius: 5,
            maxZoom: 10,
            map: (props) => ({ sum: props.value, count: 1 }),
            reduce: (accumulated, props) => {
                accumulated.sum += props.sum;
                accumulated.count += props.count;
            }
        });

        index.load(points);

        const bounds = mapRef.current.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const resultClusters = index.getClusters([sw.lng(), sw.lat(), ne.lng(), ne.lat()], currentZoom);
        setClusters(resultClusters);
    }, [currentZoom]);

    return (
        <GoogleMap 
            id="cluster-map"
            mapContainerStyle={mapContainerStyle}
            zoom={currentZoom}
            center={defaultCenter}
            ref={mapRef}
            onZoomChanged={() => {
                setCurrentZoom(mapRef.current.getZoom());
            }}

        >
            {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster_id, point_count } = cluster.properties;
                const isClustered = point_count !== undefined;
                const infoText = isClustered
                    ? `Average value: ${(cluster.properties.sum / point_count).toFixed(2)}`
                    : `Value: ${cluster.properties.value}`;

                return (
                    <React.Fragment key={cluster_id || cluster.properties.value }>
                        <Marker
                            position={{ lat: latitude, lng: longitude }}
                            label={isClustered ? String(point_count) : undefined}
                        />
                        <InfoWindow position={{ lat: latitude, lng: longitude }}>
                            <div>
                                <h2>Cluster Info</h2>
                                <p>{infoText}</p>
                            </div>
                        </InfoWindow>
                    </React.Fragment>
                );
            })}

        </GoogleMap>
    );
}

export default Supercluster_Test2;
