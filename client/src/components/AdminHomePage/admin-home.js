//@ts-check

import React from "react";
import AdminNavbar from "../Navbar/admin-navbar";
import "./admin-home.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IoBan } from "react-icons/io5";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#4e0d3a",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#4e0d3a",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray",
            border: "none",
            borderBottom: "2px solid #4e0d3a",
            borderRadius: "0px",
        },
        "&:hover fieldset": {
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            border: "none",
            borderBottom: "2px solid #4e0d3a",
            borderRadius: "0px",
        },
    },
});

const newIssues = [
    {
        type: "Platform issue",
        subject: "lorem ipsum dolor sit amet, consectetur adipisicing el",
        name: "Arvind",
        phone: "9876543210",
        timestamp: "Dec 2, 2015",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        type: "Other",
        subject: "lorem ipsum dolor sit amet",
        name: "Kenta Emilie",
        phone: "1234567890",
        timestamp: "Oct 12, 2015",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        type: "Platform issue issue issue issue issue issue issue",
        subject:
            "lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el",
        name: "Sebastián Abdul",
        phone: "1234567890",
        timestamp: "Oct 12, 2015",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
];

const manage = [
    {
        type: "Platform issue",
        subject: "lorem ipsum dolor sit amet, consectetur adipisicing el",
        name: "Arvind",
        phone: "9876543210",
        timestamp: "Dec 2, 2015",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
];

const resolvedIssues = [
    {
        type: "Other",
        subject: "lorem ipsum dolor sit amet",
        name: "Kenta Emilie",
        phone: "1234567890",
        timestamp: "Oct 12, 2015",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        type: "Platform issue issue issue issue issue issue issue",
        subject:
            "lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el lorem ipsum dolor sit amet, consectetur adipisicing el",
        name: "Sebastián Abdul",
        phone: "1234567890",
        timestamp: "Oct 12, 2015",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
];

const ApplicationCard = (props) => {
    return (
        <div className='admin-applications-card'>
            <div className='admin-applications-card-row1'>
                <div style={{ padding: "10px", textAlign: "center" }}>{props.app.type}</div>
                <div>{props.app.subject}</div>
            </div>
            <div className='admin-applications-card-rowx'>
                <div style={{ fontWeight: 600 }}>
                    {props.app.name} | {props.app.phone} | {props.app.timestamp}
                </div>
            </div>
            <div className='admin-applications-card-rowx'>
                <div>{props.app.body}</div>
            </div>
            <div className='admin-applications-card-row3'>
                {props.pageNo == 1 ? (
                    <div className='admin-applications-card-button' onClick={() => {}}>
                        MANAGE ISSUE
                    </div>
                ) : props.pageNo == 2 ? (
                    <div className='admin-applications-card-button' onClick={() => {}}>
                        MARK RESOLVED
                    </div>
                ) : null}
            </div>
        </div>
    );
};

class AdminHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            searchText: "",
            searchResultText: "",
        };
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
    }

    handleSearchTextChange(e) {
        this.setState({ searchText: e.target.value });
    }

    handleSubmitText(e) {
        if (e.keyCode === 13) {
            console.log(this.state.searchText);
            this.setState({ searchResultText: this.state.searchText });
            // submit this search text to Backend for Query
        }
    }

    render() {
        return (
            <div>
                <AdminNavbar />
                <div className='admin-main'>
                    <div className='admin-applications-leftbox'>
                        <div className='admin-applications-tab-switcher'>
                            <div
                                className='admin-applications-tab-button'
                                style={this.state.tab == 0 ? { border: "solid 3px red", opacity: 1 } : {}}
                                onClick={() => {
                                    this.setState({ tab: 0 });
                                }}
                            >
                                NEW ISSUES
                            </div>
                            <div
                                className='admin-applications-tab-button'
                                style={this.state.tab == 1 ? { border: "solid 3px red", opacity: 1 } : {}}
                                onClick={() => {
                                    this.setState({ tab: 1 });
                                }}
                            >
                                MANAGING
                            </div>
                            <div
                                className='admin-applications-tab-button'
                                style={this.state.tab == 2 ? { border: "solid 3px red", opacity: 1 } : {}}
                                onClick={() => {
                                    this.setState({ tab: 2 });
                                }}
                            >
                                RESOLVED ISSUES
                            </div>
                        </div>
                        <div
                            style={this.state.tab == 1 || this.state.tab == 2 ? { display: "none" } : {}}
                            className='admin-applications-applications'
                        >
                            {newIssues.map((item) => (
                                <ApplicationCard app={item} pageNo={1} />
                            ))}
                        </div>
                        <div
                            style={this.state.tab == 0 || this.state.tab == 2 ? { display: "none" } : {}}
                            className='admin-applications-applications'
                        >
                            {manage.map((item) => (
                                <ApplicationCard app={item} pageNo={2} />
                            ))}
                        </div>
                        <div
                            style={this.state.tab == 0 || this.state.tab == 1 ? { display: "none" } : {}}
                            className='admin-applications-applications'
                        >
                            {resolvedIssues.map((item) => (
                                <ApplicationCard app={item} pageNo={3} />
                            ))}
                        </div>
                    </div>
                    <div className='admin-applications-right-box'>
                        <CssTextField
                            id='outlined-basic'
                            label='🔍Search for User by Name or Phone Number'
                            variant='outlined'
                            value={this.state.searchText}
                            onChange={this.handleSearchTextChange}
                            onKeyUp={this.handleSubmitText}
                        />
                        <div className='admin-applications-search-results'>
                            <div>
                                {this.state.searchResultText != "" ? `Search results for \"${this.state.searchResultText}\"` : ""}
                            </div>
                            {/* {
                                openApp.map((user, i) => (
                                    <div
                                        className='admin-applications-search-results-card'
                                        style={{ background: i % 2 == 0 ? "#E8DEE5" : "#F9F6F8" }}
                                    >
                                        <div>
                                            <div>{user.name}</div>
                                            <div>{user.phone}</div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                this.handleBanUser(user);
                                            }}
                                        >
                                            BAN USER
                                            <IoBan style={{ color: "red", marginLeft: "1vw" }} />
                                        </div>
                                    </div>
                                ))
                            }{" "}
                            */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHomePage;
