import Message from "../components/errorMessage.vue";
import { createApp } from "vue";

export type MessageType =
  | "success"
  | "warning"
  | "info"
  | "secondary"
  | "danger"
  | "light"
  | "dark";

const createMessage = (
  message: string,
  type: MessageType,
  timeout: number,
  isShake: boolean
) => {
  const alertMessage = createApp(Message, {
    message,
    type,
    isShake,
  });
  // 新建一个dom节点
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);

  // 把组件挂载到行创建的这个节点上
  alertMessage.mount(mountNode);

  setTimeout(() => {
    alertMessage.unmount();
    document.body.removeChild(mountNode);
  }, timeout);
};

export default createMessage;
