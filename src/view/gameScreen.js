import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, BackHandler } from 'react-native';
import { baseStyle } from 'workers/styleWorker';
import { GameMenuButton } from 'components/buttons';
import { loc, scores, audio } from 'app';
import { GameTile } from 'components/gameTile';
import { WinModal, LoseModal, NewRecordModal, MenuModal } from 'components/modals';

const gameItems = [
    { img: require('img/hay.png'), type: true, sound: require('sound/shik.mp3') },
    { img: require('img/banana.png'), type: false, sound: require('sound/ut.mp3') },
    { img: require('img/grass.png'), type: true, sound: require('sound/shik.mp3') },
    { img: require('img/burger.png'), type: false, sound: require('sound/ut.mp3') },
    { img: require('img/water.png'), type: true, sound: require('sound/gulp.mp3') },
    { img: require('img/squash.png'), type: true, sound: require('sound/soft_hrum.mp3') },
    { img: require('img/cucumber.png'), type: true, sound: require('sound/soft_hrum.mp3') }
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function buildGrid() {
    let tempArr = [];
    for (let i = 1; i < 10; i++) {
        tempArr.push({ key: i });
    }
    return tempArr;
}

export class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            winModalVisible: false,
            loseModalVisible: false,
            newRecModalVisible: false,
            heartCount: 3,
            healthBar: [{ key: 0 }, { key: 1 }, { key: 2 }],
            level: 1,
            score: 0,
            gameFields: [],
            period: 1500,
        }
        this.changeField = this.changeField.bind(this);
        this.backToMain = this.backToMain.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.changeHealthBar = this.changeHealthBar.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.continueGame = this.continueGame.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.newRecord = this.newRecord.bind(this);
        this.startGame();
        audio.playMainTheme();
    }

    backToMain() {
        this.setState({ menuVisible: !this.state.menuVisible });
        this.props.navigation.navigate('MainScreen');
    }

    returnToMain() {
        this.setState({ loseModalVisible: !this.state.loseModalVisible });
        this.props.navigation.navigate('MainScreen');
    }

    changeHealthBar() {
        let tempArr = [];
        for (let i = 0; i < this.state.heartCount; i++) {
            let item = { key: i };
            tempArr.push(item);
        }
        this.setState({ healthBar: tempArr });
    }

    changeField() {
        let tempArr = buildGrid();
        let randNum = getRandomInt(0, 9);
        let obj = gameItems[getRandomInt(0, gameItems.length)];
        tempArr[randNum].text = <GameTile
            img={obj.img}
            fun={() => { this.hitTile(obj.type, obj.sound) }}
        />;
        this.setState({ gameFields: tempArr });
    }

    hitTile(type, sound) {
        audio.playSound(sound);
        if (type) {
            this.state.score < 10 ? this.setState({ score: this.state.score + 1 }) : this.endLevel();
        } else {
            this.state.heartCount > 0 ? this.setState({ heartCount: this.state.heartCount - 1 }) : this.gameOver();
        }
        this.setState({ gameFields: buildGrid() });
    }

    startGame() {
        this.inter = setInterval(this.changeField, this.state.period);
    }

    startNewGame() {
        audio.playMainTheme();
        this.setState({
            heartCount: 3,
            score: 0,
            level: 1,
            period: 1500
        });
        this.startGame();
    }

    pauseGame() {
        clearInterval(this.inter);
        this.setState({ menuVisible: !this.state.menuVisible });
        return true;
    }

    continueGame() {
        this.startGame();
        this.setState({ menuVisible: !this.state.menuVisible });
    }

    endLevel() {
        audio.playWin();
        clearInterval(this.inter);
        this.setState({ winModalVisible: !this.state.winModalVisible });
    }

    nextLevel() {
        audio.playMainTheme();
        this.setState({
            score: 0,
            level: this.state.level + 1,
            period: this.state.period - 80
        });
        this.startGame();
    }

    gameOver() {
        audio.playLose();
        clearInterval(this.inter);
        let totalScore = 10 * this.state.level + this.state.score - 10;
        if (scores.checkNewScore(totalScore) >= 0) {
            this.setState({ newRecModalVisible: !this.state.newRecModalVisible });
        } else {
            this.setState({ loseModalVisible: !this.state.loseModalVisible });
        }
    }

    newRecord(name) {
        this.setState({ newRecModalVisible: !this.state.newRecModalVisible });
        let totalScore = 10 * this.state.level + this.state.score - 10;
        let obj = { name: name, score: totalScore };
        let pos = scores.checkNewScore(totalScore);
        scores.insertNewScore(obj, pos);
        this.props.navigation.navigate('MainScreen');
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.pauseGame);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', this.pauseGame);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.heartCount !== this.state.heartCount) {
            this.changeHealthBar();
        }
    }

    componentWillUnmount() {
        clearInterval(this.inter);
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuModal
                    visible={this.state.menuVisible}
                    setVisible={this.continueGame}
                    backToMain={this.backToMain}
                />
                <WinModal
                    visible={this.state.winModalVisible}
                    fun={() => {
                        this.setState({ winModalVisible: !this.state.winModalVisible });
                        this.nextLevel()
                    }}
                />
                <NewRecordModal
                    visible={this.state.newRecModalVisible}
                    fun={this.newRecord}
                />
                <LoseModal
                    visible={this.state.loseModalVisible}
                    repeat={() => {
                        this.setState({ loseModalVisible: !this.state.loseModalVisible });
                        this.startNewGame()
                    }}
                    toMain={this.returnToMain}
                />
                <View style={styles.navbar}>
                    <GameMenuButton
                        img={require('img/menu/menu_blue.png')}
                        fun={this.pauseGame}
                    />
                    <View style={styles.healthbar}>
                        <FlatList
                            horizontal={true}
                            data={this.state.healthBar}
                            keyExtractor={(item) => item.key.toString()}
                            renderItem={({ item }) => <Image style={styles.buttonImg} resizeMode="stretch" source={require('img/menu/heart.png')} />}
                        />
                    </View>
                    <View style={styles.indicator}>
                        <Text style={styles.indicatorText}>{loc.lvl_cap}: {this.state.level}</Text>
                        <Text style={styles.indicatorText}>{loc.score_cap}: {this.state.score}</Text>
                    </View>
                </View>
                <Image
                style={baseStyle.ingameLogo}
                source={require("img/logo.jpg")}
            />
                <View style={styles.gamefield}>
                    <FlatList
                        numColumns={3}
                        data={this.state.gameFields}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.gametile}>
                                {item.text}
                            </View>}
                    />
                </View>
            </View>
        )
    }

}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "rgb(255,201,23)",
        alignItems: "center",
        paddingTop: 30
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: screenHeight * 0.1,
        width: screenWidth
    },
    healthbar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    indicator: {
        flex: 1.5,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonImg: {
        width: 30,
        height: 27,
        margin: 5
    },
    gameImg: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3
    },
    indicatorText: {
        fontSize: 24,
        color: '#5400ff',
        fontFamily: 'Lobster'
    },
    gamefield: {
        flex: 1
    },
    gametile: {
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#5400ff',
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        margin: 5,
        overflow: "hidden",
        alignItems: "center"
    }
})