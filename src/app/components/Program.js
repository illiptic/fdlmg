import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { sorter } from '../utils/utils.js';
import _ from 'lodash';
import moment from 'moment';

class Program extends Component{

  render() {
    // Injected by connect() call:
    const { filters, selected, shows, sort, sorting, activePage, selectPage, selectShow } = this.props;

    let pageSize = 5;
    let selectRowProp = {
      mode: "checkbox",  //checkbox for multi select, radio for single select.
      clickToSelect: true,   //click row will trigger a selection on that row.
      bgColor: "rgb(10, 120, 120)"   //selected row background color
    };

    /*
    <BootstrapTable
      data={shows}
      striped={true}
      selectRow={selectRowProp}
      columnFilter={true}>
      <TableHeaderColumn dataField="time" dataAlign="left" dataSort={true} dataFormat={(a) => {a}}>Time</TableHeaderColumn>
      <TableHeaderColumn dataField="act" isKey={true} dataAlign="left" dataSort={true}>Act</TableHeaderColumn>
      <TableHeaderColumn dataField="stage" dataAlign="left" dataSort={true}>Stage</TableHeaderColumn>
    </BootstrapTable>
    */

    return (
      <div>
        <h1>Program</h1>
        <input type="checkbox" value="filter.friday"/> Friday
        <input type="checkbox" value="filter.saturday"/> Saturday
        <input type="checkbox" value="filter.sunday"/> Sunday
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {[
                'selection',
                'time',
                'act',
                'stage',
                'genre'
              ].map(label =>
                <th key={label} onClick={() => sort(label)}>
                {label}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {_.orderBy(shows, sorting.column, sorting.dir ? 'asc' : 'desc')
              .slice( (activePage-1)*pageSize, activePage * pageSize )
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
          last={true}
          maxButtons={5}
          activePage={activePage}
          onSelect={selectPage} />
      </div>
    )
  }
}


Program.propTypes = {
  shows: PropTypes.array
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
const mapStateToProps = (state) => {
  return {
    shows: state.program.shows,
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
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Program)
