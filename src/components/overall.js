import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
import * as Actions from '../actions'
import '../style/App.css';

const {Content, Footer, Sider} = Layout;


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    componentWillMount() {
        axios.get(`http://api.shcloud.top:8080/user2`)
            .then(res => {
                console.log(res);
                this.setState({userID: res.data[1]});
            });
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
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
                                    <h1>This is index page</h1>
                                    <h3><a href={"/1"}>Go to the page of Yale University: localhost:3000/1</a></h3>
                                    {/*To-Do: Add the main content of this page*/}
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
