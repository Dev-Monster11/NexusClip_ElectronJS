import { convertHexToRGBA } from "./mixins";

const grayColors = {
  "gray-1": "#12143E",
  "gray-2": "#576988",
  "gray-3": "#69748F",
  "gray-4": "#989EAB",
  "gray-5": "#BEC2CB",
  "gray-6": "#DBDEE4",
  "gray-7": "#EFF1F4",
  "gray-8": "#f2f7ff",
  "gray-9": "#fafafb",
  primary: "#ffffff",
};

const fadedGrayColors = {
  "faded-gray-1": convertHexToRGBA(grayColors["gray-1"], 0.1),
  "faded-gray-2": convertHexToRGBA(grayColors["gray-2"], 0.1),
  "faded-gray-3": convertHexToRGBA(grayColors["gray-3"], 0.1),
  "faded-gray-4": convertHexToRGBA(grayColors["gray-4"], 0.1),
  "faded-gray-5": convertHexToRGBA(grayColors["gray-5"], 0.1),
  "faded-gray-6": convertHexToRGBA(grayColors["gray-6"], 0.1),
  "faded-gray-7": convertHexToRGBA(grayColors["gray-7"], 0.1),
  "faded-gray-8": convertHexToRGBA(grayColors["gray-8"], 0.1),
  "faded-gray-9": convertHexToRGBA(grayColors["gray-9"], 0.1),
};

export const variables = {
  ...grayColors,
  ...fadedGrayColors,
};
