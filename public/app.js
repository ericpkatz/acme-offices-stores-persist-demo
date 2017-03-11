var state = {
  idx: 0,
  days: [
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
  $.post('/api/days')
    .then(function(day){
      state.days.push(day);
      state.idx = state.days.length - 1;
      renderDayPicker();
    });
}

function onRemoveDay(){
  var day = state.days[state.idx];
  $.ajax({
    url: `/api/days/${day.id}`,
    method: 'DELETE'
  })
  .then(function(){
    state.days.splice(state.idx, 1);
    state.idx = 0;
    renderDayPicker();
  });
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


$.get('/api/days')
  .then(function(days){
    state.days = days;
    init();
  });
  
