import React from 'react';
import ReactDOM from 'react-dom';
import itemsjs from 'itemsjs'; 
import "react-bootstrap/dist/react-bootstrap.min.js"


class CompanySearch extends React.Component {
  constructor(props) {
    super(props);

    var rows = props.rows;

    this.state = {
      configuration: {
        searchableFields: ['Customer', 'Description', 'C19 Soln'],
        sortings: {
          name_asc: {
            field: 'Customer',
            order: 'asc'
          }
        },
        aggregations: {
          "C19 Cat": {
            title: 'Category',
            size: 10
          },
          "C19 SubCat": {
            title: 'Sub Category',
            size: 10
          },
          "C19 Stage": {
            title: 'Stage',
            size: 10
          }
        }
      }
    }

    var newFilters = {};
    Object.keys(this.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    })

    // Copying this.state using the spread op (...this.state)
    this.state = {
      ...this.state,
      // the rows comes from external resources
      // https://github.com/itemsapi/itemsapi-example-data/blob/master/jsfiddle/imdb.js
      
      // In React line below is:
      //itemsjs: require('itemsjs')(rows, this.state.configuration),
      itemsjs: itemsjs(rows, this.state.configuration),

      query: '',
      filters: newFilters,
    }
  }

  changeQuery(e) {
    this.setState({
      query: e.target.value
    });
  }

  reset() {
    var newFilters = {};
    Object.keys(this.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    })
    this.setState({
      filters: newFilters,
      query: '',
    })
  }

  handleCheckbox = (filterName, filterValue) => event => {
    const oldFilters = this.state.filters;
    let newFilters = oldFilters
    let check = event.target.checked;

    if (check) {
      newFilters[filterName].push(filterValue)

      this.setState({
        filters: newFilters
      })
    } else {
      var index = newFilters[filterName].indexOf(filterValue);
      if (index > -1) {
        newFilters[filterName].splice(index, 1);
        this.setState({
          filters: newFilters
        })
      }
    }
  }

  get searchResult() {

    var result = this.state.itemsjs.search({
      query: this.state.query,
      filters: this.state.filters
    })
    return result
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#" onClick={this.reset.bind(this)}>AWS Startup Pandemic Response</a>
            </div>
            <div id="navbar">
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" value={this.state.query} onChange={this.changeQuery.bind(this)} className="form-control" placeholder="Search" />

                </div>
              </form>
            </div>
          </div>
        </nav>

        <div className="container" style={{ marginTop: '10px' }}>

        {/*  <span>List of Companies ({this.searchResult.pagination.total}) - </span>
          <span className="text-muted">Search performed in {this.searchResult.timings.search} ms, facets in {this.searchResult.timings.facets} ms</span></--!> 
        */}

          <div className="row">
            <div className="col-md-2 col-xs-2">
              {
                Object.entries(this.searchResult.data.aggregations).map(([key, value]) => {
                  return (
                    <div key={key}>
                      <h5 style={{ marginBottom: '5px' }}><strong style={{ color: '#337ab7' }}>{value.title}</strong></h5>

                      <ul className="browse-list list-unstyled long-list" style={{ marginBottom: '0px' }}>
                        {
                          Object.entries(value.buckets).map(([keyB, valueB]) => {
                            return (
                              <li key={valueB.key}>
                                <div className="checkbox block" style={{ marginTop: '0px', marginBottom: '0px' }}>
                                  <label>
                                    <input className="checkbox" type="checkbox" checked={this.state.filters[value.name].indexOf(valueB.key)>-1 || false} onChange={this.handleCheckbox(value.name, valueB.key)} />
                                    {valueB.key} ({valueB.doc_count})
                                  </label>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </div>
            <div className="col-md-10 col-xs-10">
            <div className="breadcrumbs"></div>
            <div className="clearfix"></div>
            <table className="table table-striped">
              <tbody>
              {
              Object.entries(this.searchResult.data.items).map(([key, item]) => {
              
                var emailAddresses = item['C19 Primary Email'].replace(/,/g, ';');
              
                var contactString = "mailto:" + emailAddresses + "?cc=hcls-startups@amazon.com";
              
                return (
                <tr key={key}>
                  <td><img style={{width: '100px'}} src={item.image} /></td>
                  <td></td>
                  <td>
                    <b><a href={item["C19 URL"]}> {item.Customer}</a></b>
                    <br />
                    {item.Description}
                  </td>
                  <td></td>
                  <td>
                    <span><b><a href={contactString}> Contact Via Email </a></b></span>
                  </td>
                </tr>)})
              }
              </tbody>
            </table>
            <div className="clearfix"></div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompanySearch;