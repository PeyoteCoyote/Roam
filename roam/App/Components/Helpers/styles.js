'use strict';

import React, { Component } from 'react';

import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 60,
    // fontFamily: 'Neutra Text',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  submit: {
    height: 50,
    padding: 10,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 300,
    flexDirection: 'row',
    backgroundColor: '#ff0066',
    borderRadius:10,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  unselected: {
    fontSize: 20,
    backgroundColor: 'orange',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  selected: {
    fontSize: 20,
    backgroundColor: 'green',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex:1,
    width:null,
    height: null,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

module.exports = styles;

