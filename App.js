import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import db from "./config";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      item: "",
      getList: [],
    };
  }
  getUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addData(item) {
    var randomRequestId = this.getUniqueId();
    db.collection("todolist").add({
      item: item,
    });

    Alert.alert("Added Item");
    this.setState({
      item: "",
    });
  }
  getData() {
    db.collection("todolist").onSnapshot((snapshot) => {
      var getList = snapshot.docs.map((document) => document.data());

      this.setState({
        getList: getList,
      });
    });
  }

  componentDidMount() {
    this.getData();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return <Text style={styles.textInput}>{item.item}</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>TO DO LIST APP</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.box}
            onChangeText={(text) => {
              this.setState({
                item: text,
              });
            }}
            value={this.state.item}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addData(this.state.item)}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.getList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
  },
  text: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 30,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "pink",
  },
  box: {
    width: "70%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 2,
    fontSize: 30,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  textInput: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "lightblue",
    padding: 10,
  },
});
