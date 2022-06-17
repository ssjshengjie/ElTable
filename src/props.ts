import { CSSProperties } from "vue";
import {
  ElTableColumnType,
  tableConfigType,
  tableSelectionType,
  tableSortType
} from "./type";

const props = {
  headerCellStyle: {
    type: Object as PropType<CSSProperties>,
    default: (): CSSProperties => {
      return {};
    }
  },
  // 表格数据
  tableData: {
    type: Array as PropType<Array<Object>>,
    default: () => []
  },
  tableColumn: {
    type: Array as PropType<ElTableColumnType[]>,
    default: () => []
  },
  // 基础配置
  tableConfig: {
    type: Object as PropType<tableConfigType>,
    default: (): tableConfigType => {
      return {};
    }
  },
  // 排序
  tableSort: {
    type: Object as PropType<tableSortType>,
    default: (): tableSortType => {
      return {
        prop: "date",
        order: "ascending"
      };
    }
  },
  // tableSelection
  tableSelection: {
    type: Object as PropType<tableSelectionType>,
    default: (): tableSelectionType => {
      return {
        show: false,
        width: ""
      };
    }
  },
  // 分页
  pagination: {
    type: Boolean,
    default: true
  },
  PageSizes: {
    type: Array,
    default: () => {
      return [20, 50, 100];
    }
  },
  overflow: {
    type: Boolean,
    default: false
  },
  rendeHeadContent: {
    type: String,
    default: ""
  }

  // align: {
  //   type: String,
  //   default: "center"
  // },
  // headerAlign: {
  //   type: String,
  //   default: "center"
  // }
};
export default props;
