import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { baseStyle } from 'workers/styleWorker';

export function GameTile({ img, fun }) {
    return (
        <TouchableOpacity onPress={fun}>
            <Image style={baseStyle.gameImg} source={img} />
        </TouchableOpacity>
    )
}