import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { colWidth } from '../utils/config.js'
import { orderAndSlice, sortable, sorter } from '../utils/utils.js';
import _ from 'lodash';
import moment from 'moment';

class Program extends Component{

  render() {
    // Injected by connect() call:
    const { doSearch, filter, filters, toggleSelection, selected, shows, sort, sorting, activePage, selectPage, selectShow } = this.props;

    let pageSize = 5;

    return (
      <div>
        <h1>Program</h1>
        <form>
        <div className="form-group">
        {['friday', 'saturday', 'sunday'].map(day =>
          <div className="checkbox" key={day}>
            <label>
              <input type="checkbox" value={day} checked={filters[day]} onChange={filter}/>
              {moment(day, "dddd").format("dddd")}
            </label>
          </div>
        )}
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={filters.selection} onChange={toggleSelection}/>
            Selection only
          </label>
        </div>
        <div className="form-group">
          <label>General Search</label>
          <input className="form-control" type="text" value={filters.search} onChange={doSearch}/>
        </div>
        </form>
        <table style={{height: '400px'}} className="table table-striped table-hover">
          <colgroup>
          {[
            'selection',
            'time',
            'act',
            'stage',
            'genre'
          ].map(key =>
            <col key={key} className={key}/>
          )}
          </colgroup>
          <thead>
            <tr>
              {[
                'selection',
                'time',
                'act',
                'stage',
                'genre'
              ].map(label =>
                <th className={sortable(label) ? 'sortable' : ''} key={label} onClick={() => {
                  sort(label)
                }}>
                <i className={iconClass(label, sorting)}></i>
                 {label}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {orderAndSlice(shows, sorting, activePage, pageSize)
              .map(show =>
              <tr key={show.id} onClick={selectShow.bind(this, show)}>
                <td><input type="checkbox" checked={!!show.selected} readOnly={true}/></td>
                <td>{moment(show.time).format('dddd, LT')}</td>
                <td>{show.act}</td>
                <td>{show.stage}</td>
                <td>{show.genre}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          bsSize="medium"
          items={Math.ceil(shows.length / pageSize)}
          boundaryLinks={true}
          maxButtons={5}
          activePage={activePage}
          onSelect={selectPage} />
      </div>
    )
  }
}

function iconClass(label, sorting){
  if(label !== sorting.column){
    return 'fa fa-sort'
  } else {
    let base = 'fa fa-sort-'
    return base + (sorting.dir ? 'asc' : 'desc')
  }
}

function filterShows(show){
  let filters = this.filters;

  if(!filters[show.day]) {
    return false
  }

  if(filters.selection && !show.selected){
     return false
  }

  if(filters.search) {
    let rgex = new RegExp(filters.search, 'i')
    return _.some(_.values(_.pick(show, ['act', 'stage'])), (value) => {
      return rgex.test(value)
    })
  }

  return true;
}

Program.propTypes = {
  shows: PropTypes.array
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
const mapStateToProps = (state) => {
  return {
    shows: state.program.shows.filter(filterShows.bind(state.program)),
    sorting: state.program.sorting,
    activePage: state.program.activePage,
    filters: state.program.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sort: (column) => {
      dispatch({ type: 'SORT_COLUMN', column: column })
    },
    selectPage: (event, data) => {
      dispatch({ type: 'SELECT_PAGE', page: data.eventKey });
    },
    selectShow: (show) => {
      dispatch({ type: 'SELECT_SHOW', show: show });
    },
    filter: (event) => {
      dispatch({ type: 'CHANGE_FILTERS', key: event.target.value})
    },
    toggleSelection: (event) => {
      dispatch({ type: 'CHANGE_FILTERS', key: 'selection'})
    },
    doSearch: (event) => {
      dispatch({ type: 'DO_SEARCH', value: event.target.value})
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Program)
