import {DatabaseLoader} from "./DatabaseLoader";
import {HTMLLoader} from "./HTMLLoader";
import {UserInputs} from "./UserInputs";

export type Country = {
    name: string,
    code: string,
    capital: string,
    region: string,
    currency: { code: string, name: string, symbol: string },
    language: { code: string, name: string },
    flag: string,
    dialling_code: number,
    isoCode: number
}

export class Index {

    public dbLoader: DatabaseLoader;
    public htmlLoader: HTMLLoader;
    public userInputs: UserInputs;

    public Initialize() {
        this.InitializeEvents();
    }

    private InitializeEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            this.InitializeClasses();
        });
    }

    private InitializeClasses() {
        this.dbLoader = new DatabaseLoader();
        this.htmlLoader = new HTMLLoader();
        this.userInputs = new UserInputs();
    }

    constructor() {
        this.Initialize();
    }

}

export const index: Index = new Index();

