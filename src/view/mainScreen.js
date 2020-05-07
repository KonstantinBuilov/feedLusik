import React, { useState } from 'react';
import { BackHandler } from 'react-native';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { baseStyle } from 'workers/styleWorker';
import { SettingModal, RecordModal, ExitModal } from 'components/modals';
import { GameButton } from 'components/buttons';
import { loc, audio } from 'app';
import { useFocusEffect } from '@react-navigation/native';

export function MainScreen({ navigation }) {
    const [settingVisible, setSettingVisible] = useState(false);
    const [scoreVisible, setScoreVisible] = useState(false);
    const [exitVisible, setExitVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            audio.playTitle();
            const onBackPress = () => {
                setExitVisible(!exitVisible);
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <View style={styles.container}>
            <SettingModal
                visible={settingVisible}
                setVisible={() => setSettingVisible(!settingVisible)}
            />
            <RecordModal
                visible={scoreVisible}
                setVisible={() => setScoreVisible(!scoreVisible)}
            />
            <ExitModal
                visible={exitVisible}
                ok={() => { setExitVisible(!exitVisible); BackHandler.exitApp(); }}
                cancel={() => setExitVisible(!exitVisible)}
            />
            <Text style={baseStyle.header}>{loc.title}</Text>
            <Image
                style={baseStyle.logo}
                source={require("img/logo.jpg")}
            />
            <View style={styles.buttonArea}>
                <GameButton
                    caption={loc.play_btn}
                    img={require("img/menu/play.png")}
                    fun={() => navigation.navigate('GameScreen')}
                    type="gameButton"
                />
                <GameButton
                    caption={loc.rate_btn}
                    img={require("img/menu/topscore.png")}
                    fun={() => setScoreVisible(!scoreVisible)}
                    type="gameButton"
                />
                <GameButton
                    caption={loc.set_btn}
                    img={require("img/menu/settings.png")}
                    fun={() => setSettingVisible(!settingVisible)}
                    type="gameButton"
                />
            </View>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "rgb(255,201,23)",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 30
    },
    buttonArea: {
        width: screenWidth,
        height: screenHeight * 0.15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
})