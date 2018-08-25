import { observable, action, computed } from 'mobx';
import { setupMaster } from 'cluster';

class Store{
    @observable isAuthenticated: boolean = false;

    @observable userName: string = 'karlos';


    @action authenticate(cb: any) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    }

    @action signout(cb: any) {
        this.isAuthenticated = false;
        setTimeout(cb, 100) // fake async
    }

}

export const store = new Store();