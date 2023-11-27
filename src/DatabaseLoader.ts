import axios from 'axios';

export class DatabaseLoader {
    private databaseURL: string = "http://localhost:3004";
    private databaseCountriesURL: string = "http://localhost:3004/countries";
    public async GetCountries(): Promise<any> {
        try {
            const response = await axios.get(this.databaseCountriesURL);
            return response.data;
        } catch (error) {
            console.error("Could not load countries from database:", error);
            throw error;
        }
    }

    private reverseSort:boolean = false;
    private lastKeySorted:string;

    public async GetCountries_Sorted(keyToSortBy: string) {
        try {

            this.reverseSort = this.lastKeySorted === keyToSortBy ? !this.reverseSort : false;

            this.lastKeySorted = keyToSortBy;
            let apiUrl:string;

            if (this.inSearchMode) {
                apiUrl = this.searchedApiUrl;
                apiUrl += apiUrl.includes('?') ? '&' : '?';
            } else {
                apiUrl = this.databaseCountriesURL + '?';
            }

            apiUrl += this.reverseSort ? `_sort=${keyToSortBy}&_order=desc` : `_sort=${keyToSortBy}&_order=asc`;

            const response = await axios.get(apiUrl);
            return response.data;

        } catch (error) {
            console.error("Could not load countries from database", error);
            throw error;
        }
    }

    private searchedApiUrl:string;
    public inSearchMode:boolean = false;
    public async GetCountries_Search(name:string, capital:string, currency:string, language:string){
        try {

            let apiUrl:string = this.databaseCountriesURL + '?';

            if(name) apiUrl +=`&name=${name}`;
            if(capital) apiUrl +=`&capital=${capital}`;
            if(currency) apiUrl +=`&currency.name=${currency}`;
            if(language) apiUrl +=`&language.name=${language}`;

            this.searchedApiUrl = apiUrl;

            const response = await axios.get(apiUrl);

            this.inSearchMode = true;
            return response.data;

        } catch (error) {
            console.error("Could not load countries from database", error);
            throw error;
        }

    }
}

