export interface Condition {
  format?: string[];
  size?: number;
}

export type errorType = "size" | "format" | null;

export function beforeUploadCheck(file: File, condition: Condition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const validSize = size ? file.size / 1024 / 1024 <= size : true;
  let ErrorMessage = "";
  if (!isValidFormat) {
    ErrorMessage = "文件格式错误";
  }
  if (!validSize) {
    ErrorMessage = `文件大小不能超过${size}MB`;
  }
  return {
    isPassed: isValidFormat && validSize,
    ErrorMessage,
  };
}
