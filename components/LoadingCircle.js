import React from "react";
import { View, Animated, Text, Easing } from "react-native";
import { PURPLE, LIGHT_PURPLE, } from "../styles/shared";
import styles from "../styles/loadingCircle";

export default class LoadingCircle extends React.Component {
  state = {
    spin1: new Animated.Value(0),
    spin2: new Animated.Value(0),
    spin3: new Animated.Value(0),
    opac1: new Animated.Value(0),
    opac2: new Animated.Value(0),
    opac3: new Animated.Value(0),
    textColor: new Animated.Value(0),
    animation: {},
  }
  componentDidMount() {
    const animation = this.startAnimations();
    this.setState(() => ({
      animation: animation,
    }));
  }
  startAnimations = () => {
    const circle1Animation = Animated.loop(
      Animated.timing(this.state.spin1,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear(),
        useNativeDriver: false,
      })
    );
    const circle2Animation = Animated.loop(
      Animated.timing(
      this.state.spin2, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    );
    const circle3Animation = Animated.loop(Animated.timing(
      this.state.spin3, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    );
    Animated.parallel([
        circle1Animation,
        circle2Animation,
        circle3Animation,
        this.getCircle1OpacityAnimation(),
        this.getCircle2OpacityAnimation(),
        this.getCircle3OpacityAnimation(),
        this.getTextAnimation()
      ]).start();
  }
  getCircle1OpacityAnimation = () => {
    return Animated.loop(Animated.sequence([
      Animated.timing(
        this.state.opac1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      Animated.timing(
        this.state.opac1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        })
    ]));
  }
  getCircle2OpacityAnimation = () => {
    return Animated.loop(Animated.sequence([
      Animated.timing(
        this.state.opac2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      Animated.timing(
        this.state.opac2, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        })
    ]));
  }
  getCircle3OpacityAnimation = () => {
    return Animated.loop(Animated.sequence([
      Animated.timing(
        this.state.opac3, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      Animated.timing(
        this.state.opac3, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        })
    ]));
  }
  getTextAnimation = () => {
    return Animated.loop(Animated.sequence([
      Animated.timing(
        this.state.textColor, {
          toValue: 150,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(
          this.state.textColor, {
            toValue: 300,
            duration: 1000,
            useNativeDriver: false,
          })
    ]));
  }
  render() {
    const { spin1, spin2, spin3, opac1, opac2, opac3, textColor } = this.state;

    const interpolate1 = spin1.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "720deg"],
    });

    const style1 = {
      transform: [{ rotate: interpolate1}],
      opacity: opac1,
    };
    const interpolate2 = spin2.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: ["0deg", "0deg", "270deg", "405deg", "720deg"],
    });
    const style2 = {
      transform: [{ rotate: interpolate2 }],
      opacity: opac2,
    }
    const interpolate3 = spin3.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "1080deg"],
    });
    const style3 = {
      transform: [{ rotate: interpolate3 }],
      opacity: opac3,
    }
    const interpolateColor = textColor.interpolate({
      inputRange: [0, 150, 300],
      outputRange: [PURPLE, LIGHT_PURPLE, PURPLE],
    })
    const textStyle = {
      color: interpolateColor,
    };

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Animated.View style={[styles.circle1, style1]}></Animated.View>
          <Animated.View style={[styles.circle2, style2]}></Animated.View>
          <Animated.View style={[styles.circle3, style3]}></Animated.View>
          <Animated.Text style={[styles.text, textStyle]}>Loading</Animated.Text>
        </View>
      </View>
    );
  }
}
