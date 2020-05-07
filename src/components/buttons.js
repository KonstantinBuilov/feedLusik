import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native';
import { baseStyle } from 'workers/styleWorker';

export function GameButton({ caption, img, fun, type }) {
    let buttonStyle = type === 'gameButton' ? baseStyle.gameButton : baseStyle.menuButton;
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={fun}
        >
            <Image
                style={baseStyle.buttonImg}
                source={img}
            />
            <Text style={baseStyle.buttonText}>{caption}</Text>
        </TouchableOpacity>
    )
}

export function GameMenuButton({ img, fun }) {
    return (
        <TouchableOpacity
            style={baseStyle.gameMenuButton}
            onPress={fun}
        >
            <Image
                style={baseStyle.buttonImg}
                source={img}
            />
        </TouchableOpacity>
    )
}