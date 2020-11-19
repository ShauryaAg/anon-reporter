import Web3 from 'web3';
import React from 'react';
import { Button, Divider, Grid, Icon, Menu, } from "semantic-ui-react";

import ReportForm from "./ReportForm";
import { AnonContractABI, AnonContractAddress } from '../../contracts/configs/AnonContractConfig';


class Dashboard extends React.Component {

  state = {
    dropdownMenuStyle: {
      display: "none"
    }
  };

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
    window.ethereum.enable();

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })

    const reportContract = new web3.eth.Contract(AnonContractABI, AnonContractAddress)
    console.log(reportContract)
    this.setState({ reportContract })

    const reports = await reportContract.methods.getUserReports(this.state.account).call()
    console.log("user reports", reports)
  }


  handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, this.state);
    if (newState.dropdownMenuStyle.display === "none") {
      newState.dropdownMenuStyle = { display: "flex" };
    } else {
      newState.dropdownMenuStyle = { display: "none" };
    }

    this.setState(newState);
  };

  render() {
    return (
      <div>
        <Grid padded>
          <Menu size="large" inverted borderless fluid fixed="top">
            <Menu.Item header as="a">
              ANON
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as="a">Report</Menu.Item>
              <Menu.Item as="a">History</Menu.Item>
              <Menu.Item as="a">Help</Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid>
        <Grid padded className="mobile only">
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header as="a">
              ANON
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  basic
                  inverted
                  icon
                  toggle
                  onClick={this.handleToggleDropdownMenu}
                >
                  <Icon name="content" />
                </Button>
              </Menu.Item>
            </Menu.Menu>
            <Menu
              borderless
              fluid
              inverted
              vertical
              style={this.state.dropdownMenuStyle}
            >
              <Menu.Item as="a">Report</Menu.Item>
              <Menu.Item as="a">History</Menu.Item>
              <Menu.Item as="a">Help</Menu.Item>
              <Divider fitted />
            </Menu>
          </Menu>
        </Grid>
        <Grid padded>
          <Grid.Column>
            <ReportForm />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;