import {Button} from "reactstrap";

const SectionTable = (props) => {
    const data = props.data;

    return (
        <div>
            <table className={"table mt-4"}>
                <thead>
                <tr>
                    {data.headers.map((head) => {
                        return (<th>head</th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {data.body.map((el, cnt) => {
                    return <tr key={el.id}>
                        {data.headers.map((head) => {
                            return (<td>el[head]</td>)
                        })}
                        {
                            (data.delete || data.edit || data.info) && <td>
                                {data.delete && <Button color="danger" onClick={() => deleteCourse(course.id)}>
                                    Delete
                                </Button>}
                                {data.edit &&
                                    <Button color="secondary" className="m-1" onClick={() => toggleUpdate(course.id)}>
                                        Update
                                    </Button>}
                                {data.info &&
                                    <Button color="secondary" className="m-1" onClick={() => toggleUpdate(course.id)}>
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