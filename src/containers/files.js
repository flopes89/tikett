import React from "react";
import { Query } from "react-apollo";
import Files from "../components/files"
import queries from "../queries";
import { Loading, Error } from "./util";

class FilesContainer extends React.PureComponent {
    constructor(props_) {
        super(props_);

        this.toggleShowDescendants = this.toggleShowDescendants.bind(this);
        this.openFolder = this.openFolder.bind(this);

        this.state = {
            current: "/",
            showDescendants: false,
        };
    }

    openFolder(folder_) {
        console.log("open folder: " + folder_);
        let newCurrent = this.state.current;

        if (folder_.indexOf("/") === 0) {
            newCurrent = folder_;
        } else if (folder_ === "..") {
            if (newCurrent === "/") {
                newCurrent = "/";
            } else {
                const parts = newCurrent.split("/");
                console.log(parts);
                parts.splice(-2, 2);
                console.log(parts);
                newCurrent = parts.join("/") + "/";
            }
        } else {
            newCurrent += folder_ + "/";
        }

        console.log("new folder: " + newCurrent);
        this.setState({
            current: newCurrent,
        });
    }

    toggleShowDescendants() {
        this.setState({
            showDescendants: !this.state.showDescendants,
        });
    }

    render() {
        const {
            state: {
                current,
                showDescendants,
            }
        } = this;
        console.log("current: " + current);

        const breadcrumbs = [];
        let breadcrumbPath = "/";
        current.split("/").forEach((crumb_) => {
            if (!crumb_) {
                return;
            }

            breadcrumbs.push({
                name: crumb_,
                path: breadcrumbPath + crumb_,
            });

            breadcrumbPath += crumb_ + "/";
        });

        return (
            <Query
                query={queries.GET_FILES}
                variables={{
                    current,
                    showDescendants,
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error />;
                    return (
                        <Files
                            files={data.files}
                            breadcrumbs={breadcrumbs}
                            openFolder={this.openFolder}
                            showDescendants={showDescendants}
                            toggleShowDescendants={this.toggleShowDescendants}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default FilesContainer;
