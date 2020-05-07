import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const baseStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43dede'
  },
  header: {
    fontSize: 44,
    color: '#5400ff',
    fontFamily: 'Lobster'
  },
  menuHeader: {
    fontSize: 34,
    color: '#5400ff',
    fontFamily: 'Lobster',
    textAlign: "center"
  },
  logo: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.4,
    borderRadius: 10
  },
  ingameLogo: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.3,
    borderRadius: 10
  },
  modal: {
    position: "absolute",
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
    top: screenHeight * 0.1,
    left: screenWidth * 0.1,
    backgroundColor: "rgba(0,212,255,1)",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10
  },
  messageModal: {
    position: "absolute",
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    top: screenHeight * 0.3,
    left: screenWidth * 0.1,
    backgroundColor: "rgba(0,212,255,1)",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10
  },
  input: {
    width: '70%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab'
  },
  toplist: {
    height: screenHeight * 0.5
  },
  listItem: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#5400ff'
  },
  gameImg: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3
  },
  gameButton: {
    flexDirection: "row",
    padding: 10,
    height: screenHeight * 0.07,
    width: screenWidth * 0.3,
    borderRadius: 10,
    backgroundColor: "#5400ff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  menuButton: {
    flexDirection: "row",
    padding: 10,
    height: screenHeight * 0.07,
    width: screenWidth * 0.5,
    borderRadius: 10,
    backgroundColor: "#5400ff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  gameMenuButton: {
    padding: 10,
    height: screenHeight * 0.07,
    width: screenHeight * 0.07,
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold"
  },
  buttonImg: {
    width: 25,
    height: 25
  }
})