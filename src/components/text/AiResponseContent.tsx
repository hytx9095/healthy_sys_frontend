import {Spin} from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 支持表格、删除线等语法

// 渲染消息内容的组件
export const AiResponseContent = ({
                                    content,
                                    loading,
                                  }: {
  content: string;
  loading?: boolean;
}) => {
  if (loading) {
    return <Spin size="small"/>;
  }

  return (
    <div className="message-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义渲染组件可以在这里添加
          h1: ({node, ...props}) => <h1 style={{fontSize: "1.5em"}} {...props} />,
          h2: ({node, ...props}) => <h2 style={{fontSize: "1.3em"}} {...props} />,
          h3: ({node, ...props}) => <h3 style={{fontSize: "1.1em"}} {...props} />,
          p: ({node, ...props}) => <p style={{margin: "8px 0", lineHeight: 1.6}} {...props} />,
          ul: ({node, ...props}) => <ul style={{margin: "8px 0", paddingLeft: "20px"}} {...props} />,
          ol: ({node, ...props}) => <ol style={{margin: "8px 0", paddingLeft: "20px"}} {...props} />,
          li: ({node, ...props}) => <li style={{margin: "4px 0"}} {...props} />,
          code: ({node, ...props}) => (
            <code
              style={{
                background: "#f0f0f0",
                padding: "2px 4px",
                borderRadius: "3px",
                fontFamily: "monospace",
              }}
              {...props}
            />
          ),
          pre: ({node, ...props}) => (
            <pre
              style={{
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "5px",
                overflow: "auto",
                margin: "10px 0",
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
