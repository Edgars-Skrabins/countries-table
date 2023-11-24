import {index} from "./scripts";
import {Country} from "./scripts";
export class HTMLLoader {

    private readonly tableRows:HTMLDivElement = document.querySelector(".table__rows");

    private rowsDrawnCount = 0;
    private readonly rowsToDrawPerCall:number = 20;

    public allDBElements:Country[] = [];

    public htmlRows:HTMLDivElement[] = [];

    public Initialize(){
        this.InitializeAsync();
    }

    private async InitializeAsync() {
        await this.SortRowsDefault();
    }

    public async SortRowsDefault()
    {
        await this.ClearAllHTMLRows();
        await this.GetAllDBElements();
        this.DrawRowElements();
    }

    public async SortRowsBy(keyToSortBy:string) {
        await this.ClearAllHTMLRows();
        await this.GetAllDBElements_Sorted(keyToSortBy);
        this.DrawRowElements()
    }

    public async SortRowsBySearch(name:string, capital:string, currency:string, language:string){
        await this.ClearAllHTMLRows();
        await this.GetAllDBElements_Search(name,capital,currency,language);
        this.DrawRowElements();
    }

    private async ClearAllHTMLRows(){
        this.htmlRows.forEach((row) => {
            row.remove();
        });

        this.allDBElements = [];
        this.htmlRows = [];
    }

    private async GetAllDBElements(){
        try {
            this.allDBElements = await index.dbLoader.GetCountries();
        }
        catch (error){
            console.error(error);
        }
    }

    private async GetAllDBElements_Sorted(keyToSortBy:string)
    {
        try {
            this.allDBElements = await index.dbLoader.GetCountries_Sorted(keyToSortBy);
        }
        catch (error){
            console.error(error);
        }
    }

    private async GetAllDBElements_Search(name:string,capital:string,currency:string,language:string){
        try {
            this.allDBElements = await index.dbLoader.GetCountries_Search(name,capital,currency,language)
        }
        catch (error){
            console.error(error);
        }
    }

    public DrawRowElements() {
        for (let i = 0; i < this.rowsToDrawPerCall; i++) {
            if(this.allDBElements.length === 0) return;

            this.DrawRowElement(this.allDBElements.shift());
        }
    }

    private DrawRowElement(country:Country) {

        const rowElement:HTMLDivElement = document.createElement('div');
        rowElement.className = 'table__rows-row';
        rowElement.innerHTML = ` 
                    <div class="table__row-col-1 table__row-col">
                        <p class="table__rows-row-name table_-rows-row-text"> ${country.name} </p>
                    </div>

                    <div class="table__row-col-2 table__row-col">
                        <p class="table__rows-row-capital table_-rows-row-text"> ${country.capital} </p>
                    </div>

                    <div class="table__row-col-3 table__row-col">
                        <p class="table__rows-row-currency table_-rows-row-text"> ${country.currency.name} </p>
                    </div>

                    <div class="table__row-col-4 table__row-col">
                        <p class="table__rows-row-language table_-rows-row-text"> ${country.language.name} </p>
                    </div>
        `

        this.tableRows.appendChild(rowElement);

        this.htmlRows.push(rowElement);
    }

    constructor() {
        this.Initialize();
    }
}
