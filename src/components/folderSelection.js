import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button } from "reactstrap";
import { Query } from "react-apollo";
import queries from "../queries";
import { catchLoadingError } from "./util";

const FolderList = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <p><strong>Current selection</strong>: {props.current}</p>
                </Col>
                <Col>
                    <Button>Confirm</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonGroup vertical className="d-flex">
                        {props.folders.map((folder) => (
                            <Button key={folder} onClick={() => props.onSelect(folder)}>{folder}</Button>
                        ))}
                    </ButtonGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const FolderSelection = (props) => {
    const [current, setCurrent] = useState("/");

    return (
        <Query
            query={queries.GET_FOLDERS}
            variables={{ current }}
        >
            {(state) => catchLoadingError(state)(<FolderList {...props} current={current} folders={state.data.folders} onSelect={setCurrent} />)}
        </Query>
    );
};

export default FolderSelection;
