import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

type Props = {
  text: string;
  size?: "small" | "large";
  rgb?: boolean;
};

export default function Loader({ text, size = "large", rgb = false }: Props) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const dim = size === "small" ? 120 : 200;
  const r = dim / 2 - 10;

  return (
    <View style={{ width: dim, height: dim, alignItems: "center", justifyContent: "center", marginTop: 500, }}>      
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg width={dim} height={dim}>
          <Defs>
            <LinearGradient id="g" x1="0.1" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="red" />
              <Stop offset="20%" stopColor="orange" />
              <Stop offset="40%" stopColor="yellow" />
              <Stop offset="60%" stopColor="cyan" />
              <Stop offset="80%" stopColor="blue" />
              <Stop offset="100%" stopColor="red" />
            </LinearGradient>
          </Defs>

          <Circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            stroke="url(#g)"
            strokeWidth={10}
            fill="none"
            strokeLinecap="square"
            opacity={rgb ? 0.5 : 0.12}
          />
          <Circle
            cx={dim / 2.01}
            cy={dim / 2}
            r={r*0.8}
            stroke="url(#g)"
            strokeWidth={12}
            fill="#e6e6e69d"
            strokeLinecap="round"
            opacity={rgb ? 0.5 : 0.18}
          />
        </Svg>
      </Animated.View>

      <Text
        style={{
          position: "absolute",
          fontWeight: "bold",
          color: "#fff",
          fontSize: size === "small" ? 12 : 16,
        }}
      >
        {text}
      </Text>
    </View>
  );
}