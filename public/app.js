var state = {
  idx: 0,
  days: [
    {
      office: offices[1],
      store: stores[1]
    },
    {
    },
    {
      office: offices[0],
      store: stores[0]
    }
  ]
};

function onSelectDay(idx){
  state.idx = idx;
  renderDayPicker();
}

function onRemoveOffice(){
  state.days[state.idx].office = null;
  renderDayView();
}

function onRemoveStore(){
  state.days[state.idx].store = null;
  renderDayView();
}

function onAddOffice(office){
  state.days[state.idx].office = office;
  renderDayView();
}

function onAddStore(store){
  state.days[state.idx].store = store;
  renderDayView();
}

function onAddDay(){
  state.days.push({});
  state.idx = state.days.length - 1;
  renderDayPicker();
}

function onRemoveDay(){
  state.days.splice(state.days.index, 1);
  state.idx = 0;
  renderDayPicker();
}

var stateChangeHandlers = {
  onSelectDay,
  onAddOffice,
  onAddStore,
  onRemoveOffice,
  onRemoveStore,
  onAddDay,
  onRemoveDay
};

function renderDayView(){
  DayView('#dayView', state.days[state.idx], stateChangeHandlers.onRemoveOffice, stateChangeHandlers.onRemoveStore);
}

function renderDayPicker(){
  DayPicker(
      '#dayPicker',
      state.days,
      state.idx,
      stateChangeHandlers.onSelectDay,
      stateChangeHandlers.onAddDay,
      stateChangeHandlers.onRemoveDay
  );
  renderDayView();
}

function init(){
  renderDayPicker();
  VisitPickers('#visitPickers', stateChangeHandlers.onAddOffice, stateChangeHandlers.onAddStore);
}

init();
