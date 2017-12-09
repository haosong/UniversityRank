import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Layout, Icon, Breadcrumb, Checkbox, Collapse, List} from 'antd'
import { Table, Divider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
const {Content, Footer, Sider} = Layout;

// import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Ranking', 'Safety', 'Convenience'];
const defaultCheckedList = ['Ranking','Safety', 'Convenience'];

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
            data: [],
            rankingdata: [],
            Crime2015: [],
            Crime2014: [],
            Crime2013: [],
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
        this.getCrimeInfo(this.state.id);
        // this.setState({name: "Yale University"});
        //this.setbasic_info();
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };
    


        getCrimeInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/api/v1/crime/`+uid)
            .then(res => {
                // alert(res.data["2015"]["crime"][0]["type"]);
                // var a = res.data[2015]["crime"];
                // console.log(a);
                var tmp = this.state.Crime2015;
                tmp["crime"] = res.data["2015"]["crime"];
                tmp["hate"] = res.data["2015"]["hate"];
                tmp["arrests"] = res.data["2015"]["arrests"];
                tmp["vawa"] = res.data["2015"]["vawa"];
                tmp["fire"] = res.data["2015"]["fire"];
                this.setState({Crime2015 : tmp});
                
                // tmp = this.state.Crime2014;
                // alert(res.data[2014]["vawa"][0]["type"]);
                tmp["crime"] = res.data["2014"]["crime"];
                tmp["hate"] = res.data["2014"]["hate"];
                tmp["arrests"] = res.data["2014"]["arrests"];
                tmp["vawa"] = res.data["2014"]["vawa"];
                tmp["fire"] = res.data["2014"]["fire"];
                this.setState({Crime2014 : tmp});
                // alert(tmp["vawa"][0]["type"]);
                
                // tmp = this.state.Crime2013;
                tmp["crime"] = res.data["2013"]["crime"];
                tmp["hate"] = res.data["2013"]["hate"];
                tmp["arrests"] = res.data["2013"]["arrests"];
                tmp["vawa"] = res.data["2013"]["vawa"];
                tmp["fire"] = res.data["2013"]["fire"];
                this.setState({Crime2013 : tmp});
                
                
                
            });
        };

        getFoodInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/api/v1/food/`+uid)
            .then(res => {
                this.setState({fooddata : res.data});
            });
        };

        getUniversityInfo = (uid) => {
        axios.get(`http://api.shcloud.top:8080/api/v1/university/`+uid)
            .then(res => {
                // alert(res.data.men_total);
                
                
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
                    }
                    
                    
                });
        };
    
    

    
    
    
    

    onChange = (checkedList) => {
        // alert(checkedList.length);
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
    
    
    for (var i = 0; i < checkedList.length; i++){
        if(checkedList[i] === 'Ranking') {
            this.setState({foodshow : false});
            this.setState({fooddata: [{"name":"","address":"","city":"","state":"","postal_code":""}]});
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
                                    <Table pagination={false} columns={rankingcolumns} dataSource={this.state.rankingdata} />
                                    <br />
                                    <br />
                                    <Table pagination={this.state.foodshow} showHeader={this.state.foodshow} columns={foodcolumns} dataSource={this.state.fooddata} />
                                    <br />
                                    <br />
                                    <h4>2015 Crime</h4>
                                    <Table pagination={false} columns={crimecolumns} dataSource={this.state.Crime2015["crime"]} />
                                     <br />
                                    <br />
                                    <h4>2015 Hate</h4>
                                    <Table pagination={false} columns={hatecolumns} dataSource={this.state.Crime2015["hate"]} />
                                    <br />
                                    <br />
                                    <h4>2015 Arrests</h4>
                                    <Table pagination={false}  columns={arrestscolumns} dataSource={this.state.Crime2015["arrests"]} />
                                    <br />
                                    <br />
                                    <h4>2015 Arrests</h4>
                                    <Table pagination={false}  columns={vawacolumns} dataSource={this.state.Crime2015["vawa"]} />
                                    <br />
                                    <br />
                                    <h4>2015 Fire</h4>
                                    <Table pagination={false}  columns={firecolumns} dataSource={this.state.Crime2015["fire"]} />
                                    
                                    <br />
                                    <br />
                                    <h4>2014 Crime</h4>
                                    <Table pagination={false} columns={crimecolumns} dataSource={this.state.Crime2014["crime"]} />
                                    <br />
                                    <br />
                                    <h4>2014 Hate</h4>
                                    <Table pagination={false} columns={hatecolumns} dataSource={this.state.Crime2014["hate"]} />
                                    <br />
                                    <br />
                                    <h4>2014 Arrests</h4>
                                    <Table pagination={false}  columns={arrestscolumns} dataSource={this.state.Crime2014["arrests"]} />
                                    <br />
                                    <br />
                                    <h4>2014 Vawa</h4>
                                    <Table pagination={false}  columns={vawacolumns} dataSource={this.state.Crime2014["vawa"]} />
                                     <br />
                                    <br />
                                    <h4>2014 Fire</h4>
                                    <Table pagination={false}  columns={firecolumns} dataSource={this.state.Crime2014["fire"]} />
                                    
                                    <br />
                                    <br />
                                    <h4>2013 Crime</h4>
                                    <Table pagination={false} columns={crimecolumns} dataSource={this.state.Crime2013["crime"]} />
                                    <br />
                                    <br />
                                    <h4>2013 Hate</h4>
                                    <Table pagination={false} columns={hatecolumns} dataSource={this.state.Crime2013["hate"]} />
                                    <br />
                                    <br />
                                    <h4>2013 Arrests</h4>
                                    <Table pagination={false}  columns={arrestscolumns} dataSource={this.state.Crime2013["arrests"]} />
                                    <br />
                                    <br />
                                    <h4>2013 Vawa</h4>
                                    <Table pagination={false}  columns={vawacolumns} dataSource={this.state.Crime2013["vawa"]} />
                                    <br />
                                    <br />
                                    <h4>2013 Fire</h4>
                                    <Table pagination={false}  columns={firecolumns} dataSource={this.state.Crime2013["fire"]} />
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



const firecolumns = [{
  title: 'facility',
  dataIndex: 'facility',
  key: 'facility',
}, {
  title: 'fires',
  dataIndex: 'fires',
  key: 'fires',
}, {
  title: 'injuries',
  dataIndex: 'injuries',
  key: 'injuries',
}, {
  title: 'deaths',
  dataIndex: 'deaths',
  key: 'deaths',
}, {
  title: 'cause',
  dataIndex: 'cause',
  key: 'cause',
}, {
  title: 'category',
  dataIndex: 'category',
  key: 'category',
}, {
  title: 'damage',
  dataIndex: 'damage',
  key: 'damage',
}];

const crimecolumns = [{
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'Murder Manslaughter',
  dataIndex: 'murder_manslaughter',
  key: 'murder_manslaughter',
}, {
  title: 'negligent_manslaughter',
  dataIndex: 'negligent_manslaughter',
  key: 'negligent_manslaughter',
}, {
  title: 'arson',
  dataIndex: 'arson',
  key: 'arson',
}, {
  title: 'motor_vehicle_theft',
  dataIndex: 'motor_vehicle_theft',
  key: 'motor_vehicle_theft',
}, {
  title: 'burglary',
  dataIndex: 'burglary',
  key: 'burglary',
}, {
  title: 'aggravated_assault',
  dataIndex: 'aggravated_assault',
  key: 'aggravated_assault',
}, {
  title: 'robbery',
  dataIndex: 'robbery',
  key: 'robbery',
}];

const vawacolumns = [{
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'domestic_violence',
  dataIndex: 'domestic_violence',
  key: 'domestic_violence',
}, {
  title: 'dating_violence',
  dataIndex: 'dating_violence',
  key: 'dating_violence',
}, {
  title: 'staking',
  dataIndex: 'staking',
  key: 'staking',
}];



const arrestscolumns = [{
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'weapon_carrying_possessing',
  dataIndex: 'weapon_carrying_possessing',
  key: 'weapon_carrying_possessing',
}, {
  title: 'drug_abuse_violation',
  dataIndex: 'drug_abuse_violation',
  key: 'drug_abuse_violation',
}, {
  title: 'liquor_law_violation',
  dataIndex: 'liquor_law_violation',
  key: 'liquor_law_violation',
}];

const hatecolumns = [{
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'Murder Manslaughter',
  dataIndex: 'murder_manslaughter',
  key: 'murder_manslaughter',
}, {
  title: 'robbery',
  dataIndex: 'robbery',
  key: 'robbery',
}, {
  title: 'aggravated_assault',
  dataIndex: 'aggravated_assault',
  key: 'aggravated_assault',
}, {
  title: 'burglary',
  dataIndex: 'burglary',
  key: 'burglary',
}, {
  title: 'motor_vehicle_theft',
  dataIndex: 'motor_vehicle_theft',
  key: 'motor_vehicle_theft',
},  {
  title: 'arson',
  dataIndex: 'arson',
  key: 'arson',
},  {
  title: 'simple_assault',
  dataIndex: 'simple_assault',
  key: 'simple_assault',
} ];



const rankingcolumns = [{
  title: 'Overall Score',
  dataIndex: 'overallScore',
  key: 'overallScore',
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

}, 
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