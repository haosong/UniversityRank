import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LocaleProvider, Menu, Icon, Table, Button, Dropdown, notification} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
import * as Actions from '../actions'
import '../style/App.css';

class App extends React.Component {

    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            namespace: [],
            userID: '',
            loading: true,
            jobList: [{"id": 0,"result": "","actions": [],"fullDisplayName": ". .","url": ""}]
        };
    }

    componentWillMount() {
        axios.get(`http://api.shcloud.top:8080/user2`)
            .then(res => {
                console.log(res);
                this.setState({userID: res.data[1]});
            });


        // const {fetchPosts} = this.props;
        // fetchPosts(`user`).then(() => {
        //     this.setState({namespace: this.context.store.getState().postsByData.user.items.namespace});
        //     this.setState({userID: this.context.store.getState().postsByData.user.items.id});
        // });
        // this.loadJobList();
    }

    loadJobList() {
        const {fetchPosts} = this.props;
        fetchPosts(`repo/jobList`, `?amount=50`).then(() => {
            this.setState({jobList: this.context.store.getState().postsByData.repo_jobList.items});
            this.setState({loading: false});
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    abort(url) {
        const {fetchPosts, fetchPostsWithData} = this.props;
        let postData = {'url': url};
        postData = JSON.stringify(postData);
        this.setState({loading: true});
        fetchPostsWithData(`jenkins/abort`, postData).then(() => {
            var result = this.context.store.getState().postsByData.jenkins_abort.items.message;
            if (result === 'Aborted') {
                notification['success']({
                    message: 'Abort Result',
                    description: 'Abort action succeed!',
                });
            } else {
                notification['info']({
                    message: 'Abort Result',
                    description: 'Abort action is still running, please check later',
                });
            }
            fetchPosts(`repo/jobList`, `?amount=50`).then(() => {
                this.setState({jobList: this.context.store.getState().postsByData.repo_jobList.items});
                this.setState({loading: false});
            });
        });
        console.log("abort: " + url);
    }

    render() {
        const {fetchPosts, fetchPostsWithData} = this.props;
        const tableOptions = {noDataText: 'Loading...'};
        const tableState = {
            bordered: false,
            size: 'small',
            pagination: {
                total: 50,
                defaultPageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
            },
        };
        const columns = [{
            title: 'Index',
            key: 'index',
            dataIndex: 'fullDisplayName',
            render: (url, data) => {
                return <a href={data.url}>{data.fullDisplayName.split(" ")[1]}</a>
            },
        }, {
            title: 'Env',
            dataIndex: 'actions',
            key: 'env',
            render: (action, data) => {
                return data.fullDisplayName.split(" ")[2];
            },
        }, {
            title: 'Type',
            dataIndex: 'actions',
            key: 'type',
            render: (action, data) => {
                return data.fullDisplayName.split(" ")[3];
            },
        }, {
            title: 'Status',
            dataIndex: 'result',
            key: 'status',
            render: (foo, data) => {
                const abortButton = (<Menu>
                    <Menu.Item>
                        <Button type="danger" icon="close-circle-o" size="default"
                                onClick={() => this.abort(data.url)}>Abort</Button>
                    </Menu.Item>
                </Menu>);
                if (data.result === null) {
                    return (
                        <Dropdown overlay={abortButton} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">in progress <Icon type="down"/></a>
                        </Dropdown>
                    )
                } else if (data.result === 'QUEUED') {
                    return (
                        <Dropdown overlay={abortButton} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">queued <Icon type="down"/></a>
                        </Dropdown>
                    )
                } else {
                    return data.result.toLowerCase()
                }
            },
        }];

        return (
            <LocaleProvider locale={enUS}>
                <div>
                    <div id="header">
                        <img id="jenkinsLogo" role="presentation"
                             src="https://cdn.smec.sap.corp/static/cd-srv-ui/3c556d89fd13791531684311861c223da3f7a08c/assets/images/logo.png"/>
                        <img id="jenkinsTitle" role="presentation"
                             src="https://cdn.smec.sap.corp/static/cd-srv-ui/3c556d89fd13791531684311861c223da3f7a08c/assets/images/title.png"/>
                        <p id="userID">{this.state.userID}</p>
                    </div>
                    <div id="leftMenu">
                        <Menu theme="light" style={{width: 310}} mode="inline">
                            <Menu.Item key="1">
                                <a href="https://jenkins.smec.sap.corp/"><span><Icon type="rollback"/></span>Back to
                                    Dashboard</a>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/react/install"><span><Icon type="plus"/></span>Install</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/react/upgrade"><span><Icon type="up"/></span>Upgrade</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/react/terminal"><span><Icon type="code-o"/></span>Terminal</Link>
                            </Menu.Item>
                        </Menu>
                        <div>
                            <h4 className="JobListTitle">Latest Build</h4>
                            <Table columns={columns}
                                   {...tableState}
                                   rowKey={job => job.url}
                                   dataSource={this.state.jobList}
                                   loading={this.state.loading}
                            />
                        </div>
                    </div>
                    <div id="rightWrap">
                        {/*/!*{ this.props.children }*!/*/}
                        {/*{React.cloneElement(this.props.children, {*/}
                            {/*fetchPosts: fetchPosts,*/}
                            {/*fetchPostsWithData: fetchPostsWithData,*/}
                            {/*namespace: this.state.namespace,*/}
                            {/*userId: this.state.userID*/}
                        {/*})}*/}


                    </div>
                </div>
            </LocaleProvider>
        );
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
// export default connect(mapStateToProps)(App);
