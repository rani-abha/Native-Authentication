import React from 'react';
import LottieView from "lottie-react-native";
import {  Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');



export default function AnimationComponent(){
    return(
        <LottieView
      source={require("../../assets/animation/MainScene.json")}
      style={{
        width: width/0.3, 
        height: height*6,
        opacity: 0.5,
        position: "absolute", 
      }}
      autoPlay
      loop
    />
    )
}