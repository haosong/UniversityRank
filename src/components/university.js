import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
const {Content, Footer, Sider} = Layout;

class university extends React.Component {

    constructor(props) {
        super(props);
        let universityID = props.match.params.id;
        this.state = {
            id: universityID,
            collapsed: false
        };
    }

    componentWillMount() {
        this.getUniversityInfo(this.state.id);
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    getUniversityInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/university`)
            .then(res => {
                this.setState({name: res.data.name});
            });
    };

    render() {
        return (
            <LocaleProvider locale={enUS}>
                <div>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="logo"/>
                            <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
                                <Menu.Item key="1">
                                    <Link to="/"><Icon type="pie-chart"/><span>Overall</span></Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="layout"/><span>{this.state.name}</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content style={{margin: '0 16px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item><Link to="/">University</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.name}</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                    <h1>This is {this.state.name}, UID: {this.state.id}</h1>
                                    <p>Take a look at getUniversityInfo() and componentWillMount(),
                                        you can see the name "Yale" is fetched from remote API</p>
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

export default university