import { Card, Button, Radio, Space, Divider, Progress, Typography, Tag, Alert, Result, List } from 'antd';
import { CheckOutlined, CloseOutlined, TrophyOutlined, BulbOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';

const { Title, Text } = Typography;

// 测验题目数据
const quizQuestions = [
  {
    id: 1,
    question: "成年人每天建议的睡眠时间是多久？",
    options: [
      "4-5小时",
      "6-7小时",
      "7-9小时",
      "10小时以上"
    ],
    answer: 2,
    explanation: "研究表明，成年人每天7-9小时的睡眠最有利于健康。睡眠不足或过多都可能对健康产生负面影响。"
  },
  {
    id: 2,
    question: "以下哪种食物富含健康的不饱和脂肪酸？",
    options: [
      "炸鸡",
      "牛油果",
      "黄油",
      "培根"
    ],
    answer: 1,
    explanation: "牛油果富含单不饱和脂肪酸，有助于降低坏胆固醇水平。而炸鸡、黄油和培根则含有较多饱和脂肪。"
  },
  {
    id: 3,
    question: "每周建议进行多少分钟的中等强度有氧运动？",
    options: [
      "30分钟",
      "75分钟",
      "150分钟",
      "300分钟"
    ],
    answer: 2,
    explanation: "世界卫生组织建议成年人每周至少进行150分钟中等强度有氧运动，或75分钟高强度有氧运动。"
  },
  {
    id: 4,
    question: "以下哪种行为最有助于减压？",
    options: [
      "长时间刷手机",
      "深呼吸练习",
      "熬夜工作",
      "暴饮暴食"
    ],
    answer: 1,
    explanation: "深呼吸练习可以激活副交感神经系统，帮助身体放松。而其他选项中的行为实际上可能增加压力。"
  },
  {
    id: 5,
    question: "每日建议饮水量大约是？",
    options: [
      "500ml",
      "1L",
      "1.5-2L",
      "口渴时再喝"
    ],
    answer: 2,
    explanation: "一般建议成年人每天饮用1.5-2L水，但实际需求会根据活动量、气候等因素变化。"
  }
];

// 根据得分生成建议
const generateRecommendations = (score: number, total: number) => {
  const percentage = (score / total) * 100;

  if (percentage >= 80) {
    return {
      level: '优秀',
      color: 'green',
      message: '您的健康知识非常丰富！继续保持良好的健康习惯。',
      suggestions: [
        '可以尝试学习更专业的健康知识',
        '分享您的健康知识给家人朋友',
        '关注最新的健康研究进展'
      ]
    };
  } else if (percentage >= 60) {
    return {
      level: '良好',
      color: 'blue',
      message: '您对健康知识有不错的了解，但还有提升空间。',
      suggestions: [
        '关注睡眠质量和规律作息',
        '学习更多关于均衡饮食的知识',
        '制定一个可行的运动计划'
      ]
    };
  } else {
    return {
      level: '需改进',
      color: 'orange',
      message: '您的健康知识有待提高，建议多关注健康相关信息。',
      suggestions: [
        '从基础的健康饮食知识开始学习',
        '了解适量运动的重要性',
        '培养规律的作息习惯',
        '关注权威健康科普平台'
      ]
    };
  }
};

const KnowledgeTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5分钟倒计时

  // 倒计时效果
  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      submitQuiz();
    }
  }, [timeLeft, quizCompleted]);

  // 处理选择答案
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  // 下一题
  const goToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 上一题
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 提交测验
  const submitQuiz = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizCompleted(true);
  };

  // 重新开始测验
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setTimeLeft(300);
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
        <BulbOutlined /> 健康知识测验
      </Title>

      {!quizCompleted ? (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Text strong>题目 {currentQuestion + 1}/{quizQuestions.length}</Text>
            <Tag color="red">剩余时间: {formatTime(timeLeft)}</Tag>
          </div>

          <Progress
            percent={((currentQuestion + 1) / quizQuestions.length) * 100}
            showInfo={false}
            strokeColor="#1890ff"
          />

          <Divider />

          <Title level={4} style={{ marginBottom: '24px' }}>
            {quizQuestions[currentQuestion].question}
          </Title>

          <Radio.Group
            onChange={(e) => handleAnswerSelect(e.target.value)}
            value={selectedAnswers[currentQuestion] ?? null}
          >
            <Space direction="vertical">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Radio key={index} value={index} style={{ fontSize: '16px' }}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>

          <Divider />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
            >
              上一题
            </Button>

            {currentQuestion < quizQuestions.length - 1 ? (
              <Button
                type="primary"
                onClick={goToNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                下一题
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={submitQuiz}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                提交测验
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Card>
          <Result
            icon={<TrophyOutlined />}
            title={`测验完成！您的得分: ${score}/${quizQuestions.length}`}
            extra={[
              <Button type="primary" key="restart" onClick={restartQuiz}>
                重新测验
              </Button>
            ]}
          />

          <Divider>详细分析</Divider>

          {generateRecommendations(score, quizQuestions.length).message && (
            <Alert
              message={generateRecommendations(score, quizQuestions.length).message}
              type={generateRecommendations(score, quizQuestions.length).color as any}
              showIcon
              style={{ marginBottom: '24px' }}
            />
          )}

          <Title level={5}>个性化建议：</Title>
          <List
            dataSource={generateRecommendations(score, quizQuestions.length).suggestions}
            renderItem={(item) => (
              <List.Item>
                <Text>- {item}</Text>
              </List.Item>
            )}
          />

          <Divider>题目解析</Divider>

          {quizQuestions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.answer;
            return (
              <div key={question.id} style={{ marginBottom: '24px' }}>
                <Text strong>
                  {index + 1}. {question.question}
                </Text>
                <div style={{ margin: '8px 0' }}>
                  {isCorrect ? (
                    <Tag icon={<CheckOutlined />} color="green">
                      回答正确
                    </Tag>
                  ) : (
                    <Tag icon={<CloseOutlined />} color="red">
                      回答错误
                    </Tag>
                  )}
                </div>
                <Text type="secondary">{question.explanation}</Text>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
};

export default KnowledgeTest;
