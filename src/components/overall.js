import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb, Table, Input, Button, TreeSelect, Spin} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
import * as Actions from '../actions'
import '../style/App.css';

const {Content, Footer, Sider} = Layout;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

//a local copy of the data must be stored so that after searching the data can be recovered
var searchData = [];
var encode;

const treeData = [{
    label: 'Criminal Offenses',
    value: '0',
    key: '0',
    children: [{
        label: 'Manslaughter',
        value: '0-0',
        key: '0-0',
    },{
        label: 'Robbery',
        value: '0-1',
        key: '0-1',
    },{
        label: 'Vehicle Theft',
        value: '0-2',
        key: '0-2',
    },{
        label: 'Burglary',
        value: '0-3',
        key: '0-3',
    },{
        label: 'Arson',
        value: '0-4',
        key: '0-4',
    },{
        label: 'Assault',
        value: '0-5',
        key: '0-5',
    }],
}, {
    label: 'Hate Crimes',
    value: '1',
    key: '1',
    children: [{
        label: 'Manslaughter',
        value: '1-0',
        key: '1-0',
    }, {
        label: 'Robbery',
        value: '1-1',
        key: '1-1',
    }, {
        label: 'Vehicle Theft',
        value: '1-2',
        key: '1-2',
    }, {
        label: 'Burglary',
        value: '1-3',
        key: '1-3',
    }, {
        label: 'Arson',
        value: '1-4',
        key: '1-4',
    }, {
        label: 'Assault',
        value: '1-5',
        key: '1-5',
    }],
},{
    label: 'VAWA Offenses',
    value: '2',
    key: '2',
    children: [{
        label: 'Domestic Violence',
        value: '2-0',
        key: '2-0',
    }, {
        label: 'Dating Violence',
        value: '2-1',
        key: '2-1',
    }, {
        label: 'Stalking',
        value: '2-2',
        key: '2-2',
    }],
},{
    label: 'Arrests',
    value: '3',
    key: '3',
    children: [{
        label: 'Weapons',
        value: '3-0',
        key: '3-0',
    }, {
        label: 'Drug Abuse Violations',
        value: '3-1',
        key: '3-1',
    }, {
        label: 'Liquor Law Violations',
        value: '3-2',
        key: '3-2',
    }],
}];

function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            filterDropdownVisible: false,
            data: [],
            searchText: '',
            filtered: false,
            treeValue: [],
            loading:false,
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        axios.get(`http://172.26.75.27:8080/api/v1/info`)  // `http://api.shcloud.top:8080/api/v1/info/`+this.state.value
            .then(res => {
                console.log(res);
                this.setState({data: res.data, loading: false});
                searchData = res.data;
            });
    }

    createFac(){
        var arrayLength = this.state.treeValue.length;
        encode = "";
        var initial = this.state.treeValue[0].charAt(0);
        for (var i = 0; i < arrayLength; i++) {
            var curr = this.state.treeValue[i];
            if(curr.charAt(0) != initial) {
                encode += "_";
                initial = curr.charAt(0);
            }
            encode += curr + "_";
        }
        encode = encode.substring(0, encode.length - 1);

        this.setState({loading: true});
        axios.get(`http://172.26.75.27:8080/api/v1/info/`+encode)
            .then(res => {
                console.log(res);
                this.setState({data: res.data, loading: false});
                searchData = res.data;
            });
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    };

    onSearch = () => {
        const {searchText} = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: searchData.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
              {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    onChange = (value) => {
        console.log('onChange ', value, arguments);
        this.setState({ treeValue:value }, () => this.createFac()); //setState(updater, callback)
    }


    render() {
        const columns = [{
            title: 'University',  //display on screen
            dataIndex: 'name', //used by the data: dataIndex: 'data_value',
            id: 'id',
            width: 350,
            render: (title, record) => <a href={"/" + record.id}>{title}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterDropdown: (
                <div >
                    <Input
                        placeholder="Search university name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <p/>
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="bulb" style={{ fontSize: 16, color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange:(visible) => {
                this.setState({ filterDropdownVisible: visible });
            },
        }, {
            title: 'Crime',
            dataIndex: 'crime',
            sorter: (a, b) => a.crime - b.crime,
        }, {
            title: 'Food',
            dataIndex: 'food',
            sorter: (a, b) => a.food - b.food,
            render: (record) => (record == 0) ? "Unavailable" : record,
        }, {
            title: 'Rank',
            dataIndex: 'rank',
            render: (record) => (record == 1500 || record == 900 || record == 700 || record == 550) ? "~"+record : record,
            sorter: (a, b) => a.rank - b.rank,
        }, {
            title: 'Total',
            dataIndex: 'total',
            sorter: (a, b) => a.total - b.total,
        }];
        const pagination = {
            pageSize:12,
            showQuickJumper:true,
            //showSizeChanger:true,
        };
        const tProps = {
            treeData,
            value: this.state.treeValue,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 800,
            },
        };

        let show = null;
        if (!this.state.loading) {
            show =  <div><h4>select crime factors: <TreeSelect {...tProps} /></h4><Table columns={columns} dataSource={this.state.data} pagination={pagination} onChange={onChange}/></div>;
        } else {
            show =  <div style={{paddingTop:50, textAlign: 'center'}}><Spin size="large" /></div>;
        }

        return (
            <LocaleProvider locale={enUS}>
                <div>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="logo"/>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <Menu.Item key="1">
                                    <Icon type="pie-chart"/><span>Overall</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content style={{margin: '0 16px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Overall Ranking</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                    <h1 align="middle">University Overall Ranking</h1>
                                        {/*To-Do: Add the main content of this page*/
                                        show
                                    }
                                </div>
                            </Content>
                            <Footer style={{textAlign: 'center'}}>Database Project ©2017</Footer>
                        </Layout>
                    </Layout>
                </div>
            </LocaleProvider>
        )

    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        namespace: state.namespace
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
