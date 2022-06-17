import {Button, Col, Row} from "reactstrap";
import {useState} from "react";
import Search from "antd/es/input/Search";

const SectionTable = ({data, getSectionData, onSearch, toggleUpdate, deleteSectionItem, toggle, sectionName}) => {

    const [search, setSearch] = useState("")

    return (
        <div>
            <Row>
                <Col>
                    {data.edit && <Button color="success" onClick={() => toggle(sectionName)}>
                        + Add {sectionName}
                    </Button>}
                </Col>
                <Col sm={{size: 1, offset: 4}}>
                    {
                        search && <Button color="link" onClick={() => {
                            getSectionData(0);
                            setSearch("")
                        }}>Clear</Button>
                    }
                </Col>
                <Col sm={4}>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    {/*onChange={(e) => setSearch(e.target.value)}*/}
                </Col>
            </Row>
            <table className={"table mt-4"}>
                <thead>
                <tr>
                    {data.headers.map((head) => {
                        return (<th>{head}</th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {data.body.content.map((elm, cnt) => {
                    return <tr key={cnt}>
                        {data.headers.map(head => {
                            return (<td>{elm[head]}</td>)
                        })}
                        {
                            (data.delete || data.edit || data.info) && <td>
                                {data.delete && <Button color="danger" onClick={() => deleteSectionItem(data.elm.id)}>
                                    Delete
                                </Button>}
                                {data.edit &&
                                    <Button color="primary" className="m-1" onClick={() => toggleUpdate(elm.id)}>
                                        Update
                                    </Button>}
                                {data.info &&
                                    <Button color="secondary" className="m-1" onClick={() => toggleUpdate(elm.id)}>
                                        Info
                                    </Button>}
                            </td>
                        }
                    </tr>
                })}
                </tbody>
            </table>


        </div>
    );
}

export default SectionTable;