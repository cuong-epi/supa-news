import { Button, DatePicker, Space, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from "react";
import { context } from "../../App";
import { JoinChannelData } from "./Model";
import moment from 'moment';
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import UserService from "../../services/UserService";

export default function ListJoinPublicChannelsByDay() {
  const {setLoading} = useContext(context)
  const [checkinData, setCheckInData] = useState<JoinChannelData[]>([])
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")
  
  const columns: ColumnsType<JoinChannelData> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, data: JoinChannelData) => (
        <Space size="middle">
           {moment(data.date).format('MMMM Do YYYY')}
        </Space>
      ),
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render: (_, data: JoinChannelData) => (
        <Space size="middle">
           {data.count}
        </Space>
      ),
    }
  ];
  
  const searchJoinChannelsData = async () => {
    setLoading(true)
    const service = new UserService();
    const res = await service.getTotalUsersRegisteredByDateRange(fromDate, toDate);
    setCheckInData(res.data ?? [])
    setLoading(false);
  }

  const onChangeFromDate = (
    _value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: string,
  ) => {
    setFromDate(dateString);
  };

  const onChangeToDate = (
    _value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: string,
  ) => {
    setToDate(dateString);
  };

  useEffect(() => {
    searchJoinChannelsData();
  }, []);

  return (
    <div className="list">
          <Space style={{ marginBottom: 16}}>
              <DatePicker placeholder="From date" onChange={onChangeFromDate} />
              <DatePicker placeholder="To date" onChange={onChangeToDate} />
              <Button type="primary" onClick={() => searchJoinChannelsData()}>Search</Button>
          </Space>
         <Table 
            rowKey="date"
            columns={columns} 
            dataSource={checkinData}
            pagination={false}
         />
    </div>
  );
}