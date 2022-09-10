import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Platform } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });

            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "top",
                        position: "absolute",
                        width: 200,
                        resizeMode: "contain",
                        right: 60,
                        top: 20
                    }}>
                    <Text>What time should I remind you to cancel you subscriptions if needed?</Text>
                    <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "12 AM", value: "12 AM" },
                    { label: "1 AM", value: "1 AM" },
                    { label: "2 AM", value: "2 AM" },
                    { label: "3 AM", value: "3 AM" },
                    { label: "4 AM", value: "4 AM" },
                    { label: "5 AM", value: "5 AM" },
                    { label: "6 AM", value: "6 AM" },
                    { label: "7 AM", value: "7 AM" },
                    { label: "8 AM", value: "8 AM" },
                    { label: "9 AM", value: "9 AM" },
                    { label: "10 AM", value: "10 AM" },
                    { label: "11 AM", value: "11 AM" },
                    { label: "12 PM", value: "12 PM" },
                    { label: "1 PM", value: "1 PM" },
                    { label: "2 PM", value: "2 PM" },
                    { label: "3 PM", value: "3 PM" },
                    { label: "4 PM", value: "4 PM" },
                    { label: "5 PM", value: "5 PM" },
                    { label: "6 PM", value: "6 PM" },
                    { label: "7 PM", value: "7 PM" },
                    { label: "8 PM", value: "8 PM" },
                    { label: "9 PM", value: "9 PM" },
                    { label: "10 PM", value: "10 PM" },
                    { label: "11 PM", value: "11 PM" }
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 80,
                    borderRadius: RFValue(20),
                    marginBottom: RFValue(20),
                    marginHorizontal: RFValue(10)
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{
                    backgroundColor: this.state.light_theme ? "#eee" : "#2f345d"
                  }}
                  labelStyle={
                    this.state.light_theme
                      ? styles.dropdownLabelLight
                      : styles.dropdownLabel
                  }
                  arrowStyle={
                    this.state.light_theme
                      ? styles.dropdownLabelLight
                      : styles.dropdownLabel
                  }
                  onChangeItem={item =>
                    this.setState({
                      previewImage: item.value
                    })
                  }
                />
                </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
  dropdownLabel: {
    color: "black",
    fontFamily: "Bubblegum-Sans"
  },
  dropdownLabelLight: {
    color: "black",
    fontFamily: "Bubblegum-Sans"
  }
});

