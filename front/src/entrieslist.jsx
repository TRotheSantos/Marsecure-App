import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./entrieslist.css";

function Entrieslist() {
    const [isFetched, setIsFetched] = useState(false);
    const [state, setState] = useState({});

    useEffect(() => {
        fetch("/api/entries")
            .then((result) => result.json())
            .then((data) => {
                if (!isFetched) {
                    setIsFetched(true);
                    setState(data);
                }
            });
    });

    const renderMap = () => {
        return (
            <div className="tableWrapper">
                <div className="entriesTable">
                    <div className="entriesBody">
                        <div className="headerRow">
                            <div className="entry">Location</div>
                            <div className="entry">Subject</div>
                            <div className="entry">Date</div>
                            <div className="entry">Description</div>
                        </div>
                        <br />
                        {state.result.map((el) => {
                            return (
                                <div className="entryRow" key={Math.random()}>
                                    <div className="entry" key={Math.random()}>
                                        {[el.street, Array.from(el.coord)]}
                                    </div>
                                    <div className="entry" key={Math.random()}>
                                        {el.subject}
                                    </div>
                                    <div className="entry" key={Math.random()}>
                                        {el.date}
                                    </div>
                                    <div className="entry" key={Math.random()}>
                                        {el.description}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return isFetched ? (
        renderMap()
    ) : (
        <ClipLoader
            loading={isFetched}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Entrieslist;
