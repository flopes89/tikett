import React from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useFileBrowserState } from "../../state/fileBrowser";

type PathEntry = {
    name: string;
    path: string;
};

type CrumbItemProps = {
    name: string;
    path: string;
    isClickable: boolean;
    openFolder: (path: string) => void;
};

const CrumbItem: React.FC<CrumbItemProps> = (props) => {
    let inner: React.ReactNode = props.name;

    if (props.isClickable) {
        inner = (
            <a href="#" onClick={() => props.openFolder(props.path)}>
                {inner}
            </a>
        );
    }

    return (<BreadcrumbItem>{inner}</BreadcrumbItem>);
};

type CrumbsProps = {
    breadcrumbs: PathEntry[];
    openFolder: CrumbItemProps["openFolder"];
};

const Crumbs: React.FC<CrumbsProps> = (props) => (
    <Row>
        <Col>
            <Breadcrumb>
                {props.breadcrumbs.map((breadcrumb, index) => (
                    <CrumbItem
                        key={index}
                        name={breadcrumb.name}
                        path={breadcrumb.path}
                        isClickable={index < (props.breadcrumbs.length - 1)}
                        openFolder={props.openFolder}
                    />
                ))}
            </Breadcrumb>
        </Col>
    </Row>
);

export const Breadcrumbs: React.FC = () => {
    const { currentFolder, openFolder } = useFileBrowserState();
    const breadcrumbs: PathEntry[] = [];
    let breadcrumbPath = "/";

    currentFolder.split("/").forEach((crumb) => {
        if (!crumb) {
            return;
        }

        breadcrumbs.push({
            name: crumb,
            path: breadcrumbPath + crumb,
        });

        breadcrumbPath += crumb + "/";
    });

    breadcrumbs.unshift({
        name: "Home",
        path: "/",
    });

    return (<Crumbs breadcrumbs={breadcrumbs} openFolder={openFolder} />);
};
