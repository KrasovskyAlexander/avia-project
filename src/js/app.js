import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favorite from './store/favorites';
import favoriteTicket from './views/favoriteTicket';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const container = document.querySelector('.tickets-sections .row');
  // const containerTic = document.querySelector('.dropdown-content');
  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);
  }
  container.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('add-favorite')){
      const parent = e.target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const obj = findEl(id);
      favorite.addToStore(obj);
      console.log(favorite.getStore());
      favoriteTicket.renderFavoriteTicket(favorite.getStore());
    }
  });
  
  favoriteTicket.favoriteContainer.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.classList.contains('delete-favorite')){
      const parent = e.target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const obj = findEl(id);
      favorite.removeToStore(obj);
      favoriteTicket.renderFavoriteTicket(favorite.getStore());
    }
  });

  function findEl(dataId){
    const el = locations.lastSearch.find(item => item['id'] == dataId);
    return el;
  }
});

