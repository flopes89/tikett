import React from "react";
import { Query } from "react-apollo";
import Files from "../components/files"
import queries from "../queries";
import { Loading, Error } from "./util";

class FilesContainer extends React.PureComponent {
    constructor(props_) {
        super(props_);

        this.toggleShowAllChildren = this.toggleShowAllChildren.bind(this);
        this.openFolder = this.openFolder.bind(this);

        this.state = {
            current: "",
            showAllChildren: false,
        };
    }

    openFolder(folder_) {
        const parts = this.state.current.split("/");
        let newCurrent = this.state.current;

        if (folder_ === "..") {
            if (parts[parts.length] !== "") {
                newCurrent = parts[parts.length - 1];
            }
        } else {
            newCurrent += folder_ + "/";
        }

        this.setState({
            current: newCurrent,
        });
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
                            breadcrumbs={current.split("/")}
                            openFolder={this.openFolder}
                            showAllChildren={showAllChildren}
                            toggleShowAllChildren={this.toggleShowAllChildren}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default FilesContainer;
