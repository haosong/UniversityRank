import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb, Table, Input, Button, TreeSelect} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
import * as Actions from '../actions'
import '../style/App.css';

const {Content, Footer, Sider} = Layout;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

/*
var f = [];
var s = 'A', e = 'Z';
for(var idx = s.charCodeAt(0), end = e.charCodeAt(0); idx <= end; ++idx){
    let obj = {};
    obj.text = String.fromCharCode(idx);
    obj.value = String.fromCharCode(idx);
    f.push(obj);
}
<h3><a href={"/1"}>Go to the page of Yale University: localhost:3000/1</a></h3>

*/

//a local copy of the data must be stored so that after searching the data can be recovered
var searchData = [];
var encode;

const treeData = [{
    label: 'Criminal Offenses',
    value: '0-0',
    key: '0-0',
    children: [{
        label: 'Manslaughter',
        value: '0-0-0',
        key: '0-0-0',
    },{
        label: 'Rape',
        value: '0-0-1',
        key: '0-0-1',
    },{
        label: 'Robbery',
        value: '0-0-2',
        key: '0-0-2',
    },{
        label: 'Burglary',
        value: '0-0-3',
        key: '0-0-3',
    }],
}, {
    label: 'Hate Crimes',
    value: '0-1',
    key: '0-1',
    children: [{
        label: 'Manslaughter',
        value: '0-1-0',
        key: '0-1-0',
    }, {
        label: 'Rape',
        value: '0-1-1',
        key: '0-1-1',
    }, {
        label: 'Assault',
        value: '0-1-2',
        key: '0-1-2',
    }, {
        label: 'Robbery',
        value: '0-1-3',
        key: '0-1-3',
    }, {
        label: 'Burglary',
        value: '0-1-4',
        key: '0-1-4',
    }],
},{
    label: 'VAWA Offenses',
    value: '0-2',
    key: '0-2',
    children: [{
        label: 'Domestic Violence',
        value: '0-2-0',
        key: '0-2-0',
    }, {
        label: 'Dating Violence',
        value: '0-2-1',
        key: '0-2-1',
    }, {
        label: 'Stalking',
        value: '0-2-2',
        key: '0-2-2',
    }],
},{
    label: 'Arrests',
    value: '0-3',
    key: '0-3',
    children: [{
        label: 'Weapons',
        value: '0-3-0',
        key: '0-3-0',
    }, {
        label: 'Drug Abuse Violations',
        value: '0-3-1',
        key: '0-3-1',
    }, {
        label: 'Liquor Law Violations',
        value: '0-3-2',
        key: '0-3-2',
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
            treeValue: []
        };
    }

    componentWillMount() {
        axios.get(`http://172.27.19.41:8081/api/v1/info`)  // `http://api.shcloud.top:8080/api/v1/info/`+this.state.value
            .then(res => {
                console.log(res);
                this.setState({data: res.data});
                searchData = res.data;
            });
    }

    createFac(){
        var arrayLength = this.state.treeValue.length;
        encode = "";
        for (var i = 0; i < arrayLength; i++) {
            encode += this.state.treeValue[i] + "_";
        }

        axios.get(`http://172.27.19.41:8081/api/v1/info/`+encode.slice(0, -1))
            .then(res => {
                console.log(res);
                this.setState({data: res.data});
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
            width: 220,
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
        }, {
            title: 'Rank',
            dataIndex: 'rank',
            sorter: (a, b) => a.rank - b.rank,
        }, {
            title: 'Total',
            dataIndex: 'total',
            sorter: (a, b) => a.total - b.total,
        }];
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
                                    <h4>select crime factors: <TreeSelect {...tProps} /></h4>
                                    {/*To-Do: Add the main content of this page*/
                                        <Table columns={columns} dataSource={this.state.data} onChange={onChange}/>
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
