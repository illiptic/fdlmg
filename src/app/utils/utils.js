import _ from 'lodash'
import moment from 'moment'
import {sortableColumns} from './config.js'

export function sortable(column){
  return _.includes(sortableColumns, column)
}

export function orderAndSlice(shows, sorting, activePage, pageSize){
  let ordered = _.orderBy(shows, sorting.column, sorting.dir ? 'asc' : 'desc')

  let offset = (activePage-1)*pageSize

  let count = ordered.length
  if(count < offset) {
    let pages = Math.ceil(count / pageSize)
    offset = (pages-1) * pageSize
  }

  return ordered.slice(offset, offset + pageSize)
}

export function sorter(sorting, a,b) {
  let {column, dir } = sorting
  let [a1,b1] = [a[column], b[column]]
  if(moment.isDate(a1)) {
    return dateSorter(a1, b1, dir);
  } else {
    return textSorter(a1, b1, dir);
  }
}

function textSorter(a,b, dir){
  if (a > b){
    return dir
  } else if (b > a) {
    return -dir
  } else {
    return 0
  }
}

function dateSorter(a, b, dir){
  if(a.isBefore(b)){
    return dir
  } else if(b.isBefore(a)){
    return -dir
  } else {
    return 0
  }
}
