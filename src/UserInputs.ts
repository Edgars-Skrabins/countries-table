import {index} from "./scripts";

import {Country} from "./scripts";

export class UserInputs{
    private readonly countryNameBtn:HTMLButtonElement = document.querySelector('.js-btn-countryname');
    private readonly capitalNameBtn:HTMLButtonElement = document.querySelector('.js-btn-capitalname');
    private readonly currencyNameBtn:HTMLButtonElement = document.querySelector('.js-btn-currencyname');
    private readonly languageNameBtn:HTMLButtonElement = document.querySelector('.js-btn-languagename');

    private readonly resetBtn:HTMLButtonElement = document.querySelector('.js-btn-reset');
    private readonly searchBtn:HTMLButtonElement = document.querySelector('.js-btn-search');

    private readonly nameInput:HTMLInputElement = document.querySelector('.js-input-name');
    private readonly capitalInput:HTMLInputElement = document.querySelector('.js-input-capital');
    private readonly currencyInput:HTMLInputElement = document.querySelector('.js-input-currency');
    private readonly languageInput:HTMLInputElement = document.querySelector('.js-input-language');

    public Initialize() {
        this.InitializeInputEvents()
    }

    private InitializeInputEvents(){
        this.countryNameBtn.addEventListener('click', () => {
            index.htmlLoader.SortRowsBy("name");
        })

        this.capitalNameBtn.addEventListener('click', () => {
            index.htmlLoader.SortRowsBy("capital");
        })

        this.currencyNameBtn.addEventListener('click', () => {
            index.htmlLoader.SortRowsBy("currency.name");
        })

        this.languageNameBtn.addEventListener('click', () => {
            index.htmlLoader.SortRowsBy("language.name");
        })

        this.searchBtn.addEventListener('click', () => {
            index.htmlLoader.SortRowsBySearch(
                this.nameInput.value,
                this.capitalInput.value,
                this.currencyInput.value,
                this.languageInput.value);

            this.ClearInputFields();
        })

        this.resetBtn.addEventListener('click', () => {
            index.htmlLoader.SortRowsDefault();
            index.dbLoader.inSearchMode = false;
            this.ClearInputFields();
        })

        window.addEventListener('scroll', () => {

            if(this.IsScrollAtBottom())
            {
                index.htmlLoader.DrawRowElements();
            }

        });
    }

    private ClearInputFields(){
        this.nameInput.value = '';
        this.capitalInput.value = '';
        this.currencyInput.value = '';
        this.languageInput.value = '';
    }

    private IsScrollAtBottom():boolean{
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;

        return scrollTop + clientHeight >= scrollHeight;
    }

    constructor() {
        this.Initialize()
    }
}
