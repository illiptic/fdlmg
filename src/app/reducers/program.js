import _ from 'lodash'
import moment from 'moment';
import friday from '../../../data/friday.json';
import saturday from '../../../data/saturday.json';
import sunday from '../../../data/sunday.json';
import {sortableColumns} from '../utils/config.js'

let tmp = 1;
friday.forEach(function(i){
  i.id = tmp++;
});
saturday.forEach(function(i){
  i.id = tmp++;
});
sunday.forEach(function(i){
  i.id = tmp++;
});

const initialState = {
  shows: friday.concat(saturday).concat(sunday),
  sorting: {
    'column': 'time',
    'dir': true
  },
  filters: {
    friday: true,
    saturday: true,
    sunday: false,
    selection: false,
    search: ''
  },
  activePage: 1
}

export default function program(state = initialState, action){
  switch (action.type) {
    case 'SORT_COLUMN': return sort(state, action.column)
    case 'SELECT_PAGE': return selectPage(state, action.page)
    case 'SELECT_SHOW': return selectShow(state, action.show)
    case 'CHANGE_FILTERS': return changeFilters(state, action.key)
    case 'DO_SEARCH': return doSearch(state, action.value)
    default:
      return state
  }
}

function sort(state, column){
  if(_.includes(sortableColumns, column)){
    return Object.assign({}, state, {
      sorting: {
      'column': column,
      'dir': state.sorting.column === column ? !state.sorting.dir : true
      }
    })
  } else {
    return state;
  }
}

function selectPage(state, page){
  return Object.assign({}, state, {
    activePage: page
  })
}

function changeFilters(state, key){
  let filters = Object.assign({}, state.filters)
  filters[key] = !filters[key]
  return Object.assign({}, state, {
    filters: filters
  })
}

function doSearch(state, value) {
  let filters = Object.assign({}, state.filters)
  filters.search = value
  return Object.assign({}, state, {
    filters: filters
  })
}

function selectShow(state, show){
  return Object.assign({}, state, {
    shows: state.shows.map(s => {
      if(s.id === show.id){
        return Object.assign({},s,{selected: !s.selected})
      } else {
        return s
      }
    })
  })
}
