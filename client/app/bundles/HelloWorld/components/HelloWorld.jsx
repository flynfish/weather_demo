/* global google */
import _ from "lodash";
import moment from "moment";

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Map, {Marker} from 'google-maps-react';
import Skycons from 'react-skycons';

export default class HelloWorld extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };

  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { markers: [], favorites: this.props.favorites};
  }

  getForecast = (latLng) => {
    $.get(`http://localhost:3000/forecast?lat=${latLng.lat}&lng=${latLng.lng}`, (data) => {
      this.setState({forecast: data})
      }
    )
  }

  geocode = (latLng) => {
    let geocoder = new window.google.maps.Geocoder;

    geocoder.geocode({'location': latLng}, (results, status) => {
      if (status === 'OK') {
        if (results[1]) {
          this.setState({currentName: results[1].formatted_address })
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    let lat = clickEvent.latLng.lat();
    let lng = clickEvent.latLng.lng();
    let latLng = {lat: lat, lng: lng};

    this.geocode(latLng);
    this.getForecast(latLng);

    let m = <Marker key={`${lat}${lng}`} position={latLng} name={this.state.currentName} onClick={this.onMarkerClick}/>

    this.setState({markers: [m], activeMarker: m})
  }

  onFavClick = (e) => {
    const params = { name: this.state.currentName, location: [this.state.activeMarker.props.position.lat, this.state.activeMarker.props.position.lng] }

    $.post('http://localhost:3000/favorites.json', {favorite: params}, (data) => {
      this.setState({favorites: [...this.state.favorites, params]})
    })
  }

  onRowClick = (fav) => {
    let m = <Marker key={`marker-${fav.id}`} position={{lat: fav.location.x, lng: fav.location.y }} name={fav.name}/>

    this.getForecast({lat: fav.location.x, lng: fav.location.y});
    this.setState({markers: [m], activeMarker: m, currentName: fav.name})
  }

  render() {
    const style = {
      width: '800px',
      height: '500px'
    }
    const pos = {lat: 40.3891496, lng: -102.4047142}

    return (
      <div>
        {this.state.currentName &&
          <h2 className="text-center">{this.state.currentName}
          <span style={{marginLeft: "10px"}}><a className="btn btn-primary btn-xs" onClick={this.onFavClick}><i className="fa fa-plus"></i> Add to Favorites</a></span>
          </h2>
        }
        {!_.isEmpty(this.state.forecast) &&
        <ul className="daily-forecasts row">
          {this.state.forecast.daily.data.map((day) => {
            return <li key={_.uniqueId()} className="">
              <h4 className="day-of-week">
                {moment.unix(day.time).format("ddd")}
              </h4>
              <h6 className="text-muted date">
                {moment.unix(day.time).format("MM/D")}
              </h6>
              <Skycons color='black' icon={day.icon.toUpperCase().replace(/-/g, "_")} />
              <div className="temps">{Math.round(day.temperatureMax)}°<span className="text-muted"> | {Math.round(day.temperatureMin)}°</span></div>
            </li>
          })}
        </ul>
        }
        <div className="row" >
          <div className="col-sm-9" style={{minHeight: "500px"}}>
            <Map
              google={window.google}
              zoom={4}
              style={style}
              initialCenter={pos}
              onClick={this.onMapClicked}>

              {this.state.markers}
            </Map>
          </div>
          <div className="col-sm-3" >
            <h3 className="text-center" style={{marginTop: "0"}}>Favorites
            </h3>
            <table className="table table-striped table-condensed">
              <tbody>
                  {!_.isEmpty(this.state.favorites) && this.state.favorites.map((fav) => {
                    return <tr key={`fav-${fav.id}`} onClick={() => this.onRowClick(fav)}><td>{fav.name}</td></tr>
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
