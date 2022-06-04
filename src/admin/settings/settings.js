import React from 'react';
import { Tabs, Table, Radio, Divider, Switch  } from 'antd';
const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

const columns = [
    {
        title: 'Panel visibility',
        dataIndex: 'panel',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

// const switch = () => <Switch defaultChecked onChange={onChange} />;

let drawTable = () => {
    const [selectionType, setSelectionType] = useState('switch');
    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
            </Radio.Group>

            <Divider />
        <div>

            <Divider />

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}

const MainSettings = () => (
    <Tabs onChange={onChange} type="card">
        <TabPane tab="User panel" key="1">
            {drawTable()};
        </TabPane>
        <TabPane tab="Course panel" key="2">
            {drawTable()};
        </TabPane>
        <TabPane tab="Group panel" key="3">
            {drawTable()};
        </TabPane>
    </Tabs>
);

export default MainSettings;