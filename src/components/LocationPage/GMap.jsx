import React, { Component } from 'react';
import { setLatitude, setLongitude } from '../../actions/locationPageActions';

class GMap extends Component {
  componentWillReceiveProps(nextProps) {
    this.marker.setMap(null);
    this.marker.setPosition({ lat: nextProps.lat, lng: nextProps.lng });
    this.marker.setMap(this.map);
    this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  componentDidMount() {
    const dispatch = this.props.dispatch;

    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 5
    });

    this.marker = new google.maps.Marker({
      position: { lat: this.props.lat, lng: this.props.lng },
      map: this.map
    });

    this.map.addListener('click', (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      dispatch(setLatitude(lat));
      dispatch(setLongitude(lng));
    });
  }

  render() {
    return (
      <div id="map" ref="map" />
    );
  }
}

export default GMap;
