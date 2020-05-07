import { settings } from 'app';
import { Audio } from 'expo-av';

export default class audioWorker {
    constructor() {
        this.isPlaying = false;
        this.backgroundAudio = new Audio.Sound();
        this.clickAudio = new Audio.Sound();
    }

    async _playMusic(name, isLoop) {
        try {
            await this.backgroundAudio.unloadAsync();
            await this.backgroundAudio.loadAsync(name);
            await this.backgroundAudio.setIsLoopingAsync(isLoop);
            await this.backgroundAudio.setIsMutedAsync(!settings.Music);
            await this.backgroundAudio.playAsync();
        } catch (error) {
            console.error(error);
        }
    }

    async playSound(name) {
        try {
            await this.clickAudio.unloadAsync();
            await this.clickAudio.loadAsync(name);
            await this.clickAudio.setIsMutedAsync(!settings.Sound);
            await this.clickAudio.playAsync();
        } catch (error) {
            console.error(error);
        }
    }

    playTitle() {
        this._playMusic(require('sound/feed_Lusic_title.mp3'), true);
    }

    playMainTheme() {
        this._playMusic(require('sound/feed_Lusic_main.mp3'), true);
    }

    playWin() {
        this._playMusic(require('sound/feed_Lusic_win.mp3'), false);
    }

    playLose() {
        this._playMusic(require('sound/feed_Lusic_lose.mp3'), false);
    }

    async setMusic(val) {
        await this.backgroundAudio.setIsMutedAsync(!val);
    }

    async setSound(val) {
        await this.clickAudio.setIsMutedAsync(!val);
    }
}