export default class localiseWorker {
    constructor(lang){
        if(this[lang]){
            return this[lang];
        } else {
            return this["en-US"]
        }       
    }

    "ru-RU" = {
        title:'Покорми Люсика',
        any_cap: 'Нажмите чтобы начать',
        play_btn:'Играть',
        rate_btn:'Рейтинг',
        set_btn:'Настройки',
        back_btn:'Назад',
        sound_btn:'Звук',
        music_btn:'Музыка',
        menu_cap:'Меню',
        cont_btn:'Продолжить',
        ret_btn:'Главное меню',
        lvl_cap:'Уровень',
        score_cap:'Счет',
        newrec_cap:'Новый рекорд!',
        name_cap: 'Введите имя',
        ok_btn:'OK',
        cancel_btn: 'Отмена',
        inpname_cap: 'Введите имя',
        lose_cap:'Играла с Люсиком - проиграла!',
        rep_btn: 'Повторить',
        win_cap:'Люсик доволен!',
        pts_cap:'очков',
        lang_btn: 'Язык',
        exit_cap: 'Выйти?'
    }  

    "en-US" = {
        title:'Feed Lusik',
        any_cap:'Press to start',
        play_btn:'Play',
        rate_btn:'Rating',
        set_btn:'Settings',
        back_btn:'Back',
        sound_btn:'Sound',
        music_btn:'Music',
        menu_cap:'Menu',
        cont_btn:'Continue',
        ret_btn:'Main menu',
        lvl_cap:'Level',
        score_cap:'Score',
        newrec_cap:'New record!',
        name_cap: 'Input name',
        ok_btn:'OK',
        cancel_btn: 'Cancel',
        inpname_cap: 'Input name',
        lose_cap:'Played with Lusik - Lose!',
        rep_btn: 'Repeat',
        win_cap:'Lusik satisfied!',
        pts_cap:'points',
        lang_btn: 'Language',
        exit_cap: 'Close app?'
    }   
}