import React, { useState } from 'react';
import { Modal, View, Text, FlatList, Alert } from 'react-native';
import { loc, settings, scores, audio } from 'app';
import { GameButton } from 'components/buttons';
import { baseStyle } from 'workers/styleWorker';
import { TextInput } from 'react-native-gesture-handler';

const images = {
    sound_true: require("img/menu/sound_true.png"),
    sound_false: require("img/menu/sound_false.png"),
    music_true: require("img/menu/music_true.png"),
    music_false: require("img/menu/music_false.png")
}

function SoundButton() {
    const [soundImg, setSoundImg] = useState(images['sound_' + settings.Sound]);

    function changeSound() {
        settings.Sound = !settings.Sound;
        audio.setSound(settings.Sound);
        setSoundImg(images['sound_' + settings.Sound]);
    }

    return (
        <GameButton
            caption={loc.sound_btn}
            img={soundImg}
            fun={changeSound}
        />
    )
}

function MusicButton() {
    const [musicImg, setMusicImg] = useState(images['music_' + settings.Music]);

    function changeMusic() {
        settings.Music = !settings.Music;
        audio.setMusic(settings.Music);
        setMusicImg(images['music_' + settings.Music]);
    }

    return (
        <GameButton
            caption={loc.music_btn}
            img={musicImg}
            fun={changeMusic}
        />
    )
}

export function SettingModal({ visible, setVisible }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.modal}>
                <Text style={baseStyle.menuHeader}>{loc.set_btn}</Text>
                <SoundButton />
                <MusicButton />
                <GameButton
                    caption={loc.back_btn}
                    img={require("img/menu/back.png")}
                    fun={setVisible}
                />
            </View>
        </Modal>
    )
}

export function MenuModal({ visible, setVisible, backToMain }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.modal}>
                <Text style={baseStyle.menuHeader}>{loc.menu_cap}</Text>
                <GameButton
                    caption={loc.cont_btn}
                    img={require("img/menu/play.png")}
                    fun={setVisible}
                />
                <SoundButton />
                <MusicButton />
                <GameButton
                    caption={loc.ret_btn}
                    img={require("img/menu/back.png")}
                    fun={backToMain}
                />
            </View>
        </Modal>
    )
}

export function WinModal({ visible, fun }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.messageModal}>
                <Text style={baseStyle.menuHeader}>{loc.win_cap}</Text>
                <GameButton
                    caption={loc.cont_btn}
                    img={require("img/menu/play.png")}
                    fun={fun}
                />
            </View>
        </Modal>
    )
}

export function LoseModal({ visible, repeat, toMain }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.messageModal}>
                <Text style={baseStyle.menuHeader}>{loc.lose_cap}</Text>
                <GameButton
                    caption={loc.rep_btn}
                    img={require("img/menu/play.png")}
                    fun={repeat}
                />
                <GameButton
                    caption={loc.ret_btn}
                    img={require("img/menu/back.png")}
                    fun={toMain}
                />
            </View>
        </Modal>
    )
}

export function NewRecordModal({ visible, fun }) {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            fun(value)
            setValue('')
        } else {
            Alert.alert(loc.name_cap)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.messageModal}>
                <Text style={baseStyle.menuHeader}>{loc.newrec_cap}</Text>
                <TextInput
                    style={baseStyle.input}
                    onChangeText={setValue}
                    value={value}
                    placeholder={loc.name_cap}
                    placeholderTextColor="black"
                    autoCorrect={false}
                />
                <GameButton
                    caption={loc.ok_btn}
                    img={require("img/menu/ok.png")}
                    fun={pressHandler}
                />
            </View>
        </Modal>
    )
}

export function RecordModal({ visible, setVisible }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.modal}>
                <Text style={baseStyle.menuHeader}>{loc.score_cap}</Text>
                <View style={baseStyle.toplist}>
                    <FlatList
                        data={scores.TopList}
                        keyExtractor={item => item.name + item.score}
                        renderItem={({ item }) =>
                            <Text style={baseStyle.listItem}>{item.name} {item.score} {loc.pts_cap}</Text>
                        }
                    />
                </View>
                <GameButton
                    caption={loc.back_btn}
                    img={require("img/menu/back.png")}
                    fun={setVisible}
                />
            </View>
        </Modal>
    )
}

export function ExitModal({ visible, ok, cancel }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={baseStyle.messageModal}>
                <Text style={baseStyle.menuHeader}>{loc.exit_cap}</Text>
                <GameButton
                    caption={loc.ok_btn}
                    img={require("img/menu/ok.png")}
                    fun={ok}
                />
                <GameButton
                    caption={loc.cancel_btn}
                    img={require("img/menu/back.png")}
                    fun={cancel}
                />
            </View>
        </Modal>
    )
}