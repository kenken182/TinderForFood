/* eslint-disable no-undef */
import React from 'react'
import { compose, withProps, withState, withHandlers} from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps"
import styled from 'styled-components'
import OptionsWrapper from './Options.js'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: '500px'
`

const OptionsWrapperWrapper = styled(OptionsWrapper)`
  position: absolute;
  top: 0px;
  right: -350px;
  width: 350px;
  height: 850px;
  overflow: scroll;
  display: flex;
  flex-direction: row;
`
const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%`}} />,
        containerElement: <div style={{ height: `870px`, width: '80%', position: 'relative'}}/>,
        mapElement: <div style={{ height: `100%`}} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },

            fetchPlaces: ({ updatePlaces }) => {
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    query: 'food near me',
                    bounds: bounds,
                    type: ['restaurant']
                };
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        updatePlaces(results);
                    }
                })
            }
        }
    }),
)((props) => {
    return (
      <Wrapper>
            <GoogleMap
                onTilesLoaded={props.fetchPlaces}
                ref={props.onMapMounted}
                onBoundsChanged={props.fetchPsasdasdlaces}
                defaultZoom={17}
                defaultCenter={{ lat: 43.4723, lng: -80.5449 }}
            >
                {props.places && props.places.map((place, i) =>
                    <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
                )}
            </GoogleMap>
            <OptionsWrapperWrapper places={props.places}/>
    </Wrapper>
    )
})

export default class MyFancyComponent extends React.PureComponent {
    render() {
        return (
            <MyMapComponent />
       )
    }
}
