import React from "react";
import { Query } from "react-apollo";
import Files from "../components/files"
import queries from "../queries";
import { Loading, Error } from "./util";

class FilesContainer extends React.PureComponent {
    constructor(props_) {
        super(props_);

        this.toggleShowAllChildren = this.toggleShowAllChildren.bind(this);

        this.state = {
            current: "./",
            showAllChildren: false,
        };
    }

    toggleShowAllChildren() {
        this.setState({
            showAllChildren: !this.state.showAllChildren,
        });
    }

    render() {
        const {
            state: {
                current,
                showAllChildren,
            }
        } = this;

        return (
            <div>
                <Query
                    query={queries.GET_FILES}
                    variables={{
                        current,
                        showAllChildren,
                    }}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <Loading />;
                        if (error) return <Error />;
                        return (
                            <Files
                                files={data.files}
                                showAllChildren={showAllChildren}
                                toggleShowAllChildren={this.toggleShowAllChildren}
                            />
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default FilesContainer;
