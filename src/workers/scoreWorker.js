import asHandler from 'workers/asWorker'

export default class scoreWorker {
    constructor() {
        this.dataHandler = asHandler('feedLusicScore');
        this.dataHandler.load().then(value=> this.topList = value);
    }

    get TopList() {
        return this.topList;
    }

    checkNewScore(score) {
        for (let i = 0; i < this.topList.length; i++) {
            if (score > this.topList[i].score) {
                return i;
            }
        }
    }

    insertNewScore(newScore, pos) {
        this.topList.splice(pos, 0, newScore);
        let last = this.topList.pop();
        this.dataHandler.save(this.topList);
    }
}