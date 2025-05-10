import {useModel} from '@@/exports';
import {Avatar, Button, Card, Form, List, message, Modal, Radio} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {
  getHealthyKnowledgeVoPageUsingPost, shareHealthyKnowledgeUsingPost
} from "@/services/healthy_sys/healthyKnowledgeController";
import {ProFormText} from "@ant-design/pro-components";
import {ProFormTextArea} from "@ant-design/pro-form/lib";

/**
 * 我的图表页面
 * @constructor
 */
const HealthyKnowledge: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [shareForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.HealthyKnowledgeQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [healthyKnowledgeList, setHealthyKnowledgeList] = useState<API.HealthyKnowledge[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [shareModel, setShareModel] = useState(false);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getHealthyKnowledgeVoPageUsingPost(searchParams);
      if (res.data) {
        setHealthyKnowledgeList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取健康知识失败');
      }
    } catch (e: any) {
      message.error('获取健康知识失败，' + e.message);
    }
    setLoading(false);
  };

  const openShareModal = () => {
    setShareModel(true);
  }

  const closeShareModal = () => {
    setShareModel(false);
    shareForm.resetFields()
  }

  const shareHealthyKnowledge = async () => {
    try {
      const res = await shareHealthyKnowledgeUsingPost({
        type: shareForm.getFieldValue('type'),
        content: shareForm.getFieldValue('content'),
        //集合
        tags: ["跑步"],
      });
      if (res.code === 0) {
        message.success('分享成功');
      } else {
        message.error('分享失败');
      }
    } catch (error) {
      message.error('分享失败');
    }
    setShareModel(false);
    shareForm.resetFields()
    loadData();
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入作者、标签、内容"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              name: value,
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openShareModal}>分享知识</Button>
        <Radio.Group defaultValue={"all"} style={{float: 'right'}}>
          <Radio value="all" onClick={() => {
            getHealthyKnowledgePage(2)
          }}>全部</Radio>
          <Radio value="examine" onClick={() => {
            getHealthyKnowledgePage(1)
          }}>收藏</Radio>
        </Radio.Group>
      </div>
      <div style={{marginTop: 20}}>

      </div>
      <div className="margin-16"/>
      <List
        split={false}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={healthyKnowledgeList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{width: '100%'}}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar}
                />}
                title={currentUser && currentUser.username}
                description={item.tags ? item.tags : undefined}
              />
              <>
                {item.status === 1 && (
                  <>
                    <div style={{marginBottom: 16}}/>
                    <p>{'内容：' + item.content}</p>
                  </>
                )}
              </>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="分享健康知识"
        open={shareModel}
        onOk={shareHealthyKnowledge}
        onCancel={closeShareModal}
      >
        <Card>
          <Form
            form={shareForm}>
            <ProFormText
              name={'type'}
              label={'类型'}
              placeholder={"请输入知识类型"}
            ></ProFormText>
            <ProFormText
              name={'tags'}
              label={'标签'}
              placeholder="请输入知识标签"
            ></ProFormText>
            <ProFormTextArea
              name="content"
              label="详细内容"
              placeholder="请输入知识详细内容（建议包含：背景说明、具体内容、参考文献等）"
              rules={[{ required: true, message: '请填写详细内容' }]}
              fieldProps={{
                autoSize: { minRows: 6, maxRows: 12 },
                showCount: true,
                maxLength: 2000,
                allowClear: true,
              }}
            />
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default HealthyKnowledge;
