import ticketsUI from '../views/tickets';
class Favorites{
    constructor(){
        this.store = [];
    }
    getStore(){
        return this.store;
    }
    addToStore(ticket){
        this.store.push(ticket);
    }
    removeToStore(ticket){
        const index = this.store.indexOf(ticket);
        this.store.splice(index,1);
    }
   
}

const favorite = new Favorites();
export default favorite;