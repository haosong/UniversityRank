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
        this.getRankingInfo(this.state.id);
        //this.setState({name: "setnameuniversity"});
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };
    
//     {
//   "national_rank": 1,
//   "citation": 100
// }

// name["national_rank"]



    getRankingInfo = (uid) => {
        axios.get(`http://172.26.75.27:8081/api/v1/ranking/` +uid )
            .then(res => {
                //alert(this.data.national_rank);
                // console.log(res.data.national_rank);
                this.setState({overallScore: res.data.overallScore});
                this.setState({resourceScore: res.data.resourceScore});                
                this.setState({engagementScore: res.data.engagementScore});
                this.setState({outcomesScore: res.data.outcomesScore});
                this.setState({environmentScore: res.data.environmentScore});
                this.setState({tuitionFees: res.data.tuitionFees});
                this.setState({roomAndBoard: res.data.roomAndBoard});
                this.setState({salaryTenYears: res.data.salaryTenYears});
                // this.setState({score: res.data.score});
            });
    };
    
    

    getUniversityInfo = (uid) => {
        axios.get(`http://172.26.75.27:8081/api/v1/university/`+uid)
            .then(res => {
                //alert(this.data.national_rank);
                // console.log(res.data.national_rank);
                this.setState({name: res.data.name});
                this.setState({address: res.data.address});
                this.setState({city: res.data.city});
                this.setState({zip: res.data.zip});

                this.setState({men_total: res.data.men_total});
                this.setState({women_total: res.data.women_total});
                this.setState({total: res.data.total});
                this.setState({men_ratio: res.data.men_ratio});
                this.setState({women_ratio: res.data.women_ratio});

                // this.setState({male_female_ratio: res.data.male_female_ratio});
                // this.setState({international_students: res.data.international_students});
                // this.setState({state: res.data.state});
                // this.setState({latitude: res.data.latitude});
                // this.setState({longitude: res.data.longitude});
                
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
                                    <h1>This is {this.state.name},citation {this.state.citation} UID: {this.state.id}</h1>
                                    <p>Take a look at getUniversityInfo() and componentWillMount(),
                                        you can see the name "Yale" is fetched from remote API</p>
                                    {/*To-Do: Add the main content of this page*/}
                                
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
                                
                                </div>
                                
                                
                                
                                    
                                
                              
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