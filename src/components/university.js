import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb, Checkbox} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
const {Content, Footer, Sider} = Layout;

// import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Ranking', 'Crime', 'Business'];
const defaultCheckedList = ['Ranking'];




class university extends React.Component {

    constructor(props) {
        super(props);
        let universityID = props.match.params.id;
        this.state = {
            id: universityID,
            
            collapsed: false,
            
            
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
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
                console.log("hi");
                console.log(res.data.name);
                this.setState({name: res.data.name});
            });
    };


    onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
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
                                
                                
                                
                                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                  <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                  >
                                    Check all
                                  </Checkbox>
                                </div>
                                <br />
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                              
                            </Content>
                            <Footer style={{textAlign: 'center'}}>Database Project ©2017</Footer>
                        </Layout>
                    </Layout>
                </div>
            </LocaleProvider>
        );
    }
}
// ReactDOM.render(<App />, mountNode);
export default university