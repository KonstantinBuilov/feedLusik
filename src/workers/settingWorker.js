import asHandler from 'workers/asWorker'

export default class settingWorker {
    constructor() {
        this.dataHandler = asHandler('feedLusicSettings');
        this.dataHandler.load().then(value=> this.settingsList = value);
    }

    get Music() {
        return this.settingsList.music;
    }

    set Music(val) {
        if (typeof val == 'boolean') {
            this.settingsList.music = val;
            this.dataHandler.save(this.settingsList);
        }
    }

    get Sound() {
        return this.settingsList.sound;
    }

    set Sound(val) {
        if (typeof val == 'boolean') {
            this.settingsList.sound = val;
            this.dataHandler.save(this.settingsList);
            
        }
    }
}