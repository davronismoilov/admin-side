import React, {useState} from 'react';
import { Tabs, Table, Radio, Divider, Switch, Button  } from 'antd';
const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

const SwitchButton = () => <Switch defaultUnChecked onChange={onChange} />;


const columns = [
    {
        title: 'Role',
        dataIndex: 'role',
    },
    {
        title: 'Panel visibility',
        dataIndex: 'visibility',
    },
    {
        title: 'Info btn',
        dataIndex: 'info',
    },
    {
        title: 'Edit btn',
        dataIndex: 'edit',
    },
    {
        title: 'Delete btn',
        dataIndex: 'delete',
    },
];
const data = [];

for (let i = 0; i < 46; i++) {
    data.push({
        role: `Edward King ${i}`,
        visibility: SwitchButton(),
        address: `London, Park Lane no. ${i}`,
    });
}

// const switch = () => <Switch defaultChecked onChange={onChange} />;


let DrawTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
        {/*        <div*/}
        {/*            style={{*/}
        {/*                marginBottom: 16,*/}
        {/*            }}>*/}
        {/*            <span*/}
        {/*                style={{*/}
        {/*                    marginLeft: 8,*/}
        {/*                }}*/}
        {/*            >*/}
        {/*  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}*/}
        {/*</span>*/}
        {/*        </div>*/}
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
}

const MainSettings = () => (
    <Tabs onChange={onChange} type="card">
        <TabPane tab="User panel" key="1">
            {DrawTable()};
        </TabPane>
        <TabPane tab="Course panel" key="2">
            {DrawTable()};
        </TabPane>
        <TabPane tab="Group panel" key="3">
            {DrawTable()};
        </TabPane>
    </Tabs>
);

export default MainSettings;