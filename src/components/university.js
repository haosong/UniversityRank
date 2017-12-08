import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb, Checkbox, Collapse, List} from 'antd'
import { Table, Divider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
const {Content, Footer, Sider} = Layout;

// import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Ranking', 'Crime', 'Business'];
const defaultCheckedList = ['Ranking'];

//Collapse
const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


var data1 = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];


// const rankingdata = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   address: 'New York No. 1 Lake Park',
// }];










class university extends React.Component {

    constructor(props) {
        super(props);
        let universityID = props.match.params.id;
        this.state = {
            id: universityID,
            
            collapsed: false,
            
            tableshow: [true, true, true],
            tabledata: [[],[],[]],
            data: [],
            rankingdata: [],
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            foodshow: true,
        };
    }

    componentWillMount() {
        this.getUniversityInfo(this.state.id);
        this.getRankingInfo(this.state.id);
        this.getFoodInfo(this.state.id);
        // this.setState({name: "Yale University"});
        //this.setbasic_info();
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };
    
//     {
//   "national_rank": 1,
//   "citation": 100
// }

// name["national_rank"]



        getFoodInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/api/v1/food/`+uid)
            .then(res => {
                const tabledata = this.state.tabledata;
                tabledata[1] = res.data;
                this.setState({tabledata,});
            });
    };

        getUniversityInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/api/v1/university/`+uid)
            .then(res => {
                // alert(res.data.men_total);
                // console.log(res.data.national_rank);
                
                // this.setState({address: res.data.address});
                // this.setState({city: res.data.city});
                // this.setState({zip: res.data.zip});

                // this.setState({men_total: res.data.men_total});
                // this.setState({women_total: res.data.women_total});
                // this.setState({total: res.data.total});
                // this.setState({men_ratio: res.data.men_ratio});
                // this.setState({women_ratio: res.data.women_ratio});
                
                this.setState({name: res.data.name});
                var addressline = "";
                var infodata = []
                // var addressline = "Address: ";
                addressline = addressline.concat(res.data.address);
                addressline = addressline.concat(", ");

                // addressline = addressline.concat("      City: ");
                addressline = addressline.concat(res.data.city);
                addressline = addressline.concat(", ");

                // addressline = addressline.concat(" State: ");
                addressline = addressline.concat(res.data.state);
                addressline = addressline.concat(", ");
                
                // addressline = addressline.concat("      ZIP Code: ");
                addressline = addressline.concat(res.data.zip);
                infodata.push(addressline);


                var totalline = "Total Enrollment: "
                totalline = totalline.concat(res.data.total);
                totalline = totalline.concat(" Students");
                infodata.push(totalline);
        
                var mentotalline = "Male Students: "
                mentotalline = mentotalline.concat(res.data.men_total);
                infodata.push(mentotalline);
        
                var menratioline = "Male Students Percentage: "
                menratioline = menratioline.concat(res.data.men_ratio);
                infodata.push(menratioline);
        
                var womentotalline = "Female Students: "
                womentotalline = womentotalline.concat(res.data.women_total);
                infodata.push(womentotalline);
        
                var womenratioline = "Female Students Percentage: "
                womenratioline = womenratioline.concat(res.data.women_ratio);
                infodata.push(womenratioline);
                this.setState({data: infodata});
                
                // this.state.tabledata[0] = infodata;
                // this.forceUpdate();
                

                // this.setState({male_female_ratio: res.data.male_female_ratio});
                // this.setState({international_students: res.data.international_students});
                // this.setState({state: res.data.state});
                // this.setState({latitude: res.data.latitude});
                // this.setState({longitude: res.data.longitude});
                
            });
    };



    getRankingInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/api/v1/ranking/` +uid )
            .then(res => {
                //alert(this.data.national_rank);
                // console.log(res.data.national_rank);
                
                this.setState({rankingdata : [{
                  overallScore: "Not Avaliable",
                  resourceScore: "Not Avaliable",
                  engagementScore: "Not Avaliable",
                  outcomesScore: "Not Avaliable",
                  environmentScore: "Not Avaliable",
                  tuitionFees: "Not Avaliable",
                  roomAndBoard: "Not Avaliable",
                  salaryTenYears: "Not Avaliable",
                }]});
                this.state.tabledata[1] = [{
                  overallScore: "Not Avaliable",
                  resourceScore: "Not Avaliable",
                  engagementScore: "Not Avaliable",
                  outcomesScore: "Not Avaliable",
                  environmentScore: "Not Avaliable",
                  tuitionFees: "Not Avaliable",
                  roomAndBoard: "Not Avaliable",
                  salaryTenYears: "Not Avaliable",
                }];
                if (res.data.overallScore) {
                this.setState({rankingdata : [{
                  overallScore: res.data.overallScore,
                  resourceScore: res.data.resourceScore,
                  engagementScore: res.data.engagementScore,
                  outcomesScore: res.data.outcomesScore,
                  environmentScore: res.data.environmentScore,
                  tuitionFees: res.data.tuitionFees,
                  roomAndBoard: res.data.roomAndBoard,
                  salaryTenYears: res.data.salaryTenYears,
                }]});
                
                this.state.tabledata[0] = [{
                  overallScore: res.data.overallScore,
                  resourceScore: res.data.resourceScore,
                  engagementScore: res.data.engagementScore,
                  outcomesScore: res.data.outcomesScore,
                  environmentScore: res.data.environmentScore,
                  tuitionFees: res.data.tuitionFees,
                  roomAndBoard: res.data.roomAndBoard,
                  salaryTenYears: res.data.salaryTenYears,
                }];
                
                }
                this.forceUpdate();
                
                
                // this.setState({overallScore: res.data.overallScore});
                // this.setState({resourceScore: res.data.resourceScore});                
                // this.setState({engagementScore: res.data.engagementScore});
                // this.setState({outcomesScore: res.data.outcomesScore});
                // this.setState({environmentScore: res.data.environmentScore});
                // this.setState({tuitionFees: res.data.tuitionFees});
                // this.setState({roomAndBoard: res.data.roomAndBoard});
                // this.setState({salaryTenYears: res.data.salaryTenYears});
                // this.setState({score: res.data.score});
            });
    };
    
    

    
    
    
    

    onChange = (checkedList) => {
        // alert(checkedList.length);
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
    // var boolp [];
    
    for (var i = 0, j = 0; i < plainOptions.length; i++){
        if(checkedList.indexOf(plainOptions[i]) != -1) {
            // boolp.push(true);
            // this.setState({foodshow : false});
            // this.setState({fooddata: [{"name":"","address":"","city":"","state":"","postal_code":""}]});
        }
        else {
            this.state.tableshow[i] = false;
            this.state.tabledata[i] = [{}];
            this.forceUpdate();
        }
    }
        
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
                                    
                                    
                                    <h1>{this.state.name}</h1>
                                    <Collapse defaultActiveKey={['1']} onChange={callback}>
                                        <Panel header="Basic Information" key="1">
                                        {/*<h3 style={{ marginBottom: 16 }}>Default Size</h3>*/}
                                        <List
                                          size="small"
                                          dataSource={this.state.data}
                                          renderItem={item => (<List.Item>{item}</List.Item>)}
                                        />
                                        </Panel>
                                      </Collapse>
                                      <br />
                                      <br />
                                      
                                    {/*<p>Take a look at getUniversityInfo() and componentWillMount(),
                                        you can see the name "Yale" is fetched from remote API</p>*/}
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
                                    <br />
                                    <br />
                                    <Table pagination={false} columns={rankingcolumns} dataSource={this.state.tabledata[0]} />
                                    <br />
                                    <br />
                                    <Table pagination={this.state.tableshow[1]} showHeader={this.state.tableshow[1]} columns={foodcolumns} dataSource={this.state.tabledata[1]} />
                                    <br />
                                    <br />
                                    <h4>2015</h4>
                                    <Table columns={foodcolumns} dataSource={this.state.fooddata} />
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



const rankingcolumns = [{
  title: 'Overall Score',
  dataIndex: 'overallScore',
  key: 'overallScore',
//   render: text => <a href="#">{text}</a>,
}, {
  title: 'Resource Score',
  dataIndex: 'resourceScore',
  key: 'resourceScore',
}, {
  title: 'Engagement Score',
  dataIndex: 'engagementScore',
  key: 'engagementScore',
}, {
  title: 'Outcomes Score',
  dataIndex: 'outcomesScore',
  key: 'outcomesScore',
}, {
  title: 'Environment Score',
  dataIndex: 'environmentScore',
  key: 'environmentScore',
}, {
  title: 'Tuition Fees',
  dataIndex: 'tuitionFees',
  key: 'tuitionFees',
}, {
  title: 'Room and Board',
  dataIndex: 'roomAndBoard',
  key: 'roomAndBoard',
}, {
  title: 'Expected Salary in Ten Years',
  dataIndex: 'salaryTenYears',
  key: 'salaryTenYears',
}];

const foodcolumns = [{
  title: 'Service and Merchant',
  dataIndex: 'name',
  key: 'name',
//   render: text => <a href="#">{text}</a>,
}, 
// {
//   title: 'Neighborhood',
//   dataIndex: 'neighborhood',
//   key: 'neighborhood',
// }, 
{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'City',
  dataIndex: 'city',
  key: 'city',
}, {
  title: 'State',
  dataIndex: 'state',
  key: 'state',
}, {
  title: 'ZIP Code',
  dataIndex: 'postal_code',
  key: 'postal_code',
}, {
  title: 'Score',
  dataIndex: 'stars',
  key: 'stars',
}, {
  title: 'Number of Reviews',
  dataIndex: 'review_count',
  key: 'review_count',
}];




//   render: (text, record) => (
//     <span>
//       <a href="#">Action 一 {record.name}</a>
//       <Divider type="vertical" />
//       <a href="#">Delete</a>
//       <Divider type="vertical" />
//       <a href="#" className="ant-dropdown-link">
//         More actions <Icon type="down" />
//       </a>
//     </span>
//   ),


// ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);


// ReactDOM.render(<App />, mountNode);
export default university