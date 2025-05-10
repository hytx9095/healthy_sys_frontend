import React, { useState, useEffect, useRef } from "react";
// import { getTextByAudio } from "./api/audio";
import {Button, message} from "antd";
import {genVoiceUsingPOST} from "@/services/healthy_sys/chartController";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false); // 是否正在录音
  const audioData = useRef<MediaStream | null>(null); // 创建一个ref，存储媒体流数据
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // 创建一个ref，用于存储媒体记录器实例
  const chunksRef = useRef<Blob[]>([]); // 创建一个ref，用于存储音频数据块

  useEffect(() => {
    const init = async () => {
      try {
        // 获取用户媒体设备（麦克风）的媒体流
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // 将获取到的媒体流存储到audioData ref中
        audioData.current = stream;
      } catch (error) {
        console.error("Error accessing microphone:", error);
        // 如果获取媒体流失败，打印错误信息
        // 这里可以设置一个错误状态，用于显示给用户
      }
    };

    init();

    // 组件卸载时清理资源
    return () => {
      if (audioData.current) {
        audioData.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (audioData.current) {
      chunksRef.current = [];// 重置chunks数组，用于新的录音
      mediaRecorderRef.current = new MediaRecorder(audioData.current);// 创建一个新的MediaRecorder实例
      // 当有数据可用时触发的事件
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);// 将数据块添加到chunks数组中
        }
      };
      mediaRecorderRef.current.start();// 开始录音
      setRecording(true);// 更新录音状态为正在录音
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();// 停止录音
      setRecording(false);// 更新录音状态为未录音

      // 当录音停止时触发的事件
      mediaRecorderRef.current.onstop = async () => {
        // 将chunks数组中的数据合并成一个Blob对象
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });

        const formData = new FormData(); // 创建一个FormData对象，用于上传音频文件
        formData.append("file", blob, "pth3.wav");

        const res = await genVoiceUsingPOST(formData);
        if (res.code === 0) {
          console.log('成功!');
        }
        // getTextByAudio(formData)
        //   .then((res: any) => {
        //     console.log(res, 999);
        //   })
        //   .catch((error) => {
        //     console.error("Error converting audio to text:", error);
        //     // 这里可以设置一个错误状态，用于显示给用户
        //   });

        // 以下代码为下载录音
        // const url = URL.createObjectURL(blob);
        // console.log(url, 'y');
        // const a = document.createElement("a");
        // a.style.display = "none";
        // a.href = url;
        // a.download = "recording.wav";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <div>
      <Button
        onClick={recording ? stopRecording : startRecording}
        style={{ backgroundColor: recording ? "red" : "white" }}
      >
        {recording ? "停止录音" : "开始录音"}
      </Button>
    </div>
  );
};

export default AudioRecorder;

