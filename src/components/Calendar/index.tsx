import { Calendar, message } from 'antd';
import moment, { Moment } from 'moment';
import React, {PureComponent} from 'react';
import './index.less';
import {EnvironmentOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {getSignInDatesUsingPost} from "@/services/healthy_sys/integralController";


export interface MarketingCalendarPageSettingStates {
  /**
   * 开始渲染日历（在改变updateLocale之后渲染，周日才会展示在前面）
   */
  isStartLoadingCalendar: boolean;
  /**
   * 目前的时间
   */
  value: Moment;

  signInDates: number[];
}

export class MarketingCalendarPageSetting extends PureComponent<
  any,
  MarketingCalendarPageSettingStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isStartLoadingCalendar: false,
      value: moment(),
      signInDates: []
    };
  }

  componentDidMount() {
    // moment.updateLocale('zh-cn', { week: { dow: 0 } });
    this.setState({
      isStartLoadingCalendar: true,
    });
  }

  componentWillUnmount() {
    // moment.updateLocale('zh-cn', { week: { dow: 1 } });
  }

  getListData = async (value: Moment) => {
    let listData;
    // let signInDates = [9, 19, 29];
    const signInDates = this.state.signInDates;
    // const res = await getSignInDatesUsingPost();
    this.setState({
      signInDates: [9, 19, 29]
    })
    for (let i = 0; i < signInDates?.length; i++) {
      switch (value.date()) {
        case signInDates[i]:
          listData = [
            {type: 'signIn', content: '已签到'},
            {type: 'reSignIn', content: '补签'},
          ];
          break;
        default:
      }
    }

    return listData || [];
  };

  onChangeDate = (date?: Moment) => {
    if (date) {
      message.success('改变后的时间' + date);
    }
  };

  headerRender = (value: Moment, onChange: any) => {
    let currentYear = value.format('YYYY年');
    let currentMonth = value.format('M月');
    const next = () => {
      let newMonth = moment(value).add(1, 'months');
      this.setState({
        value: newMonth,
      });
    };
    const prev = () => {
      let prevMonth = moment(value).subtract(1, 'months');
      this.setState({
        value: prevMonth,
      });
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40}}>
        <div onClick={prev}>
          <LeftOutlined />
        </div>
        <div className="title-text" style={{marginLeft: 15, marginRight: 15}}>
          <span>{currentYear} </span>
          <span>{currentMonth}</span>
        </div>
        <div onClick={next}>
          <RightOutlined />
        </div>
        <div style={{ marginLeft: '50px' }} onClick={this.toToday}>
          <EnvironmentOutlined />
        </div>
      </div>
    );
  };

  toToday = () => {
    this.setState({
      value: moment(),
    });
  };

  render() {
    const { isStartLoadingCalendar, value } = this.state;
    if (!isStartLoadingCalendar) {
      return null;
    }
    const dateCellRender = (value: Moment) => {
      const listData = this.getListData(value); //活动
      const month = value.month() + 1;
      return (
        <div className="marketing-calendar-page-setting__calendar-date">
          {listData.map((item: any) => {
            return <div key={item.content}>{item.content}</div>;
          })}
        </div>
      );
    };
    return (
      <div className="marketing-calendar-page-setting">
        <div className="marketing-calendar-page-setting__center">
          <div className="marketing-calendar-page-setting__center__left">
            <Calendar
              value={value}
              headerRender={({ value, onChange }) => this.headerRender(value, onChange)}
              // onPanelChange={(value)=>{
              //     if(value){
              //         this.onPanelChange(value);
              //     }
              // }}
              locale={moment}
              dateCellRender={dateCellRender}
              // onChange={this.onChangeDate}
            />
          </div>
          <div className="marketing-calendar-page-setting__center__right"></div>
        </div>
      </div>
    );
  }
}
