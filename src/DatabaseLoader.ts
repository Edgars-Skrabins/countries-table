import axios from 'axios';

export class DatabaseLoader {
    private databaseURL: string = "http://localhost:3004";
    private databaseCountriesURL: string = "http://localhost:3004/countries";

    public GetCountries(): Promise<any> {
        return axios.get(this.databaseCountriesURL)
            .then(response => response.data)
            .catch(error => {
                console.error("Could not load countries from database:", error);
                throw error;
            });
    }

    private reverseSort: boolean = false;
    private lastKeySorted: string;

    public GetCountries_Sorted(keyToSortBy: string): Promise<any> {
        this.reverseSort = this.lastKeySorted === keyToSortBy ? !this.reverseSort : false;
        this.lastKeySorted = keyToSortBy;
        let apiUrl: string;

        if (this.inSearchMode) {
            apiUrl = this.searchedApiUrl;
            apiUrl += apiUrl.includes('?') ? '&' : '?';
        } else {
            apiUrl = this.databaseCountriesURL + '?';
        }

        apiUrl += this.reverseSort ? `_sort=${keyToSortBy}&_order=desc` : `_sort=${keyToSortBy}&_order=asc`;

        return axios.get(apiUrl)
            .then(response => response.data)
            .catch(error => {
                console.error("Could not load countries from database", error);
                throw error;
            });
    }

    private searchedApiUrl: string;
    public inSearchMode: boolean = false;

    public GetCountries_Search(name: string, capital: string, currency: string, language: string): Promise<any> {
        let apiUrl: string = this.databaseCountriesURL + '?';

        if (name) apiUrl += `&name=${name}`;
        if (capital) apiUrl += `&capital=${capital}`;
        if (currency) apiUrl += `&currency.name=${currency}`;
        if (language) apiUrl += `&language.name=${language}`;

        this.searchedApiUrl = apiUrl;

        return axios.get(apiUrl)
            .then(response => {
                this.inSearchMode = true;
                return response.data;
            })
            .catch(error => {
                console.error("Could not load countries from database", error);
                throw error;
            });
    }
}
