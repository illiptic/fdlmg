import _ from 'lodash'
import moment from 'moment';
import friday from '../../../data/friday.json';

let tmp = 1;
friday.forEach(function(i){
  i.id = tmp++;
});

const initialState = {
  shows: friday,
  sorting: {
    'column': 'time',
    'dir': 1
  },
  filters: {},
  activePage: 1
}

export default function program(state = initialState, action){
  switch (action.type) {
    case 'SORT_COLUMN': return sort(state, action.column)
    case 'SELECT_PAGE': return selectPage(state, action.page)
    case 'SELECT_SHOW': return selectShow(state, action.show)
    default:
      return state
  }
}

function sort(state, column){
  return Object.assign({}, state, {
    sorting: {
    'column': column,
    'dir': state.sorting.column === column ? !state.sorting.dir : true
    }
  })
}

function selectPage(state, page){
  return Object.assign({}, state, {
    activePage: page
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
