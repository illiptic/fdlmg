import moment from 'moment'

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
