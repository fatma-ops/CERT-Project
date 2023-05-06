import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LeftIcon, StyledTextInputDate } from './styles';
import { Octicons } from '@expo/vector-icons';
import { StyledInputLabel2 } from './styles';
import { StyledTextInput , Colors } from './styles';
import RowContainer2 from './Containers/RowContainer2';
const {brand , secondary , tertiary} = Colors;
export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedDate: new Date(),
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.selectedDate;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      selectedDate: currentDate,
    });
  };

  render() {
    return (
      <View >
        <View>
          {this.state.show && (
            <DateTimePicker
              testId="dateTimePicker"
              value={this.state.selectedDate}
              mode={'date'}
              is24Hour={false}
              display="default"
              onChange={this.onChange}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.label}
          onPress={() => this.setState({ show: true })}
        >
  
        <MyTextInput
        label="Date "
          icon="calendar"
          selectedDate={this.state.selectedDate}
        />
                </TouchableOpacity>

      </View>
    );
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  dateText: {
    marginTop: 20,
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  Input:{
    backgroundColor: secondary,
    padding: 15,
    paddingLeft:55,
    borderRadius: 20,
    fontSize:16,
    height:60,
    marginVertical:3,
    marginBottom:10,
    color:'black',
    shadowOpacity:0.25,
    shadowOffset:2,
    shadowRadius:1,
    elevation:5,
    marginLeft:-10,
    marginRight:-10
    
   
  },label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'left'

  },
});
const MyTextInput = ({ label, icon, selectedDate, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={24} color={brand} />
      </LeftIcon>
      <StyledInputLabel2>{label}</StyledInputLabel2>
      <StyledTextInputDate
        {...props}
        value={selectedDate.toLocaleDateString()}
        editable={false}
      />
    </View>
  );
};