import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button, View } from "react-native";
import { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";

export default function HomeScreen() {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("fr-FR");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result: any) => {
    setResults(result.value);
  };

  const onSpeechError = (error: any) => {
    console.log(error);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {!started ? (
        <Button title="Start Speech to Text" onPress={startSpeechToText} />
      ) : undefined}
      {started ? (
        <Button title="Stop Speech to Text" onPress={stopSpeechToText} />
      ) : undefined}
      {results.map((result, index) => (
        <Text key={index}>{result}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}
