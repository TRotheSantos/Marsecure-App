import React from "react";
import "./entrieslist.css";

class Entrieslist extends React.Component {
    constructor() {
        super();
        this.state = {
            total: 0,
            result: [],
            page: 0,
            numberByPage: 0,
            totalPages: 0,
            isFetched: false,
        };
    }

    componentDidMount() {
        fetch("/api/entries")
            .then((result) => result.json())
            .then((data) => {
                this.state = {
                    total: data.total,
                    result: data.result,
                    page: data.page,
                    numberByPage: data.numberByPage,
                    totalPages: data.totalPages,
                    isFetched: true,
                };
            });
    }

    render() {
        if (!this.state.isFetched) return null;
        return (
            <div className="entriesTable">
                <div className="entriesBody">
                    <div className="headerRow">
                        <div className="entry">Location</div>
                        <div className="entry">Subject</div>
                        <div className="entry">Date</div>
                        <div className="entry">Description</div>
                    </div>
                    {this.state.result.map((el) => {
                        <div className="entryRow">
                            <div className="entry">{[el.street, el.coord]}</div>
                            ;<div className="entry">{el.subject}</div>;
                            <div className="entry">{el.date}</div>;
                            <div className="entry">{el.description}</div>;
                        </div>;
                    })}
                </div>
            </div>
        );
    }
}

export default Entrieslist;
