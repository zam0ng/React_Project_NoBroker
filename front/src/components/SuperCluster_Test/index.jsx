import React, { useEffect, useRef } from 'react';
import Supercluster from 'supercluster';

function SuperCluster_Test({ points }) {
    const mapRef = useRef(null); // Reference to the map DOM element
    const mapInstanceRef = useRef(null); // Reference to the Google Maps instance
    const markersRef = useRef([]); // Reference to keep track of rendered markers

    useEffect(() => {
        // Check if Google Maps API is available
        if (!window.google || !window.google.maps) return;

        // Validate the points prop to ensure it's an array
        if (!points || !Array.isArray(points)) return;

        // Initialize Google Maps instance if it's not yet created
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: { lat: 37, lng: 127 },
                zoom: 5
            });
        }

        const map = mapInstanceRef.current;

        // Initialize the Supercluster instance
        const clusterer = new Supercluster({
            radius: 40,
            maxZoom: 16,
            map: (props) => ({ value: props.value, count: 1 }),
            reduce: (accumulated, props) => {
                accumulated.value += props.value;
                accumulated.count += props.count;
            }
        });

        clusterer.load(points); // Load points into the clusterer

        let debounceTimer; 
        const updateClusters = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const bounds = map.getBounds();
                const clusters = clusterer.getClusters([
                    bounds.getSouthWest().lng(),
                    bounds.getSouthWest().lat(),
                    bounds.getNorthEast().lng(),
                    bounds.getNorthEast().lat(),
                ], map.getZoom());

                // Remove previous markers
                markersRef.current.forEach(marker => marker.setMap(null));
                markersRef.current = [];

                // Render new clusters/markers
                clusters.forEach(cluster => {
                    let marker;
                    if (cluster.properties.cluster) {
                        const avgValue = (cluster.properties.value / cluster.properties.count).toFixed(2);
                        marker = new window.google.maps.Marker({
                            position: { lat: cluster.geometry.coordinates[1], lng: cluster.geometry.coordinates[0] },
                            label: avgValue.toString(),
                            map: map
                        });
                    } else {
                        marker = new window.google.maps.Marker({
                            position: { lat: cluster.geometry.coordinates[1], lng: cluster.geometry.coordinates[0] },
                            map: map
                        });
                    }
                    markersRef.current.push(marker);
                });
            }, 250); // Debounce for 250ms to optimize performance
        };

        map.addListener('bounds_changed', updateClusters); // Listen for map bounds change to update clusters
        updateClusters(); // Update clusters initially

        return () => {
            // Cleanup: Remove all markers when the component unmounts
            markersRef.current.forEach(marker => marker.setMap(null));
        };

    }, [points]);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div> // Map container
    );
}

export default SuperCluster_Test;
