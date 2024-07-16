import { Text, TouchableOpacity, View, Image } from "react-native";

import React, { useEffect } from "react";
import Voice from "@react-native-voice/voice";

export default function HomeScreen() {
  const [started, setStarted] = React.useState("");
  const [ended, setEnded] = React.useState("");
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: any) => {
    console.log("onSpeechStart", e);
    setStarted("✅");
  };
  const onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd", e);
    setEnded("✅");
  };
  const onSpeechResults = (e: any) => {
    console.log("onSpeechResults", e);
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start("en-US");
      setStarted("");
      setEnded("");
      setResults([]);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setStarted("");
      setEnded("");
      setResults([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#000", fontSize: 20, alignSelf: "center" }}>
        Voice to text recognizing
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#fffA",
          marginTop: 50,
          padding: 20,
          borderRadius: 999,
        }}
        onPress={() => startRecognizing()}
      >
        <Image
          source={require("@/assets/mic.png")}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          justifyContent: "space-between",
        }}
      >
        <Text>Started : {started}</Text>
        <Text>Ended :{ended} </Text>
      </View>

      <TouchableOpacity
        style={{
          width: "80%",
          height: 60,
          backgroundColor: "black",
          position: "absolute",
          bottom: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => stopRecognizing()}
      >
        <Text style={{ color: "white" }}>Stop Listening</Text>
      </TouchableOpacity>
    </View>
  );
}

