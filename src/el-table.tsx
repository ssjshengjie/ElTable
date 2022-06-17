import { ElTable, ElTableColumn, ElTooltip } from "element-plus";
import ElTableColumns from "./el-table-colum";
import { computed, defineComponent, h } from "vue";
import props from "./props";
import { ElTableColumnType, soltType } from "./type";
export default defineComponent({
  name: "ElTableFrom",
  props,
  setup(prop, { emit, slots }) {
    // 当表格的排序条件发生变化的时候会触发该事件
    function sortChange(v) {
      emit("sort-change", v);
    }
    //	当用户手动勾选数据行的 Checkbox 时触发的事件
    function selectChange(selection, row) {
      emit("select", selection, row);
    }
    // 当用户手动勾选全选 Checkbox 时触发的事件
    function selectAllChange(selection) {
      emit("select-all", selection);
    }
    // 当选择项发生变化时会触发该事件
    function selectionChange(selection) {
      emit("selection-change", selection);
    }
    function handleSizeChange(val) {
      emit("size-change", val);
    }
    function handleCurrentChange(val) {
      emit("current-change", val);
    }
    /**
     * computed
     */
    const getTableConfig = computed(() => {
      return Object.assign(
        {
          // 开启斑马线
          stripe: false,
          // 边框
          border: true,
          // 固定表头
          fixedHeader: undefined,
          //, 流体高度
          fluidHeight: undefined
        },
        prop.tableConfig
      );
    });
    const getTableSelection = computed(() => {
      return Object.assign(
        {
          show: false,
          width: ""
        },
        prop.tableConfig
      );
    });
    const renderTableSelection = () => {
      if (getTableSelection.value.show) {
        return (
          <ElTableColumn
            type="selection"
            width={getTableSelection.value.width}
          />
        );
      }
    };
    const renderElColumn = () => {
      return prop.tableColumn.map(
        (item: ElTableColumnType, index: number | string) => {
          if (item.solt) {
            return renderSoltColumn(item, index);
          } else {
            return renderColumn(item, index);
          }
        }
      );
    };
    const renderSoltColumn = (
      item: ElTableColumnType,
      index: number | string
    ) => {
      const solt = item.slotName;
      return (
        <ElTableColumn
          key={index}
          prop={item.prop}
          label={item.label}
          width={item.width}
          min-width={item.minWidth}
          fixed={item.fixedColumn}
          sortable={item.sortTable}
          show-overflow-tooltip={item.overflow}
          header-align={item.headerAlign || "center"}
          align={item.align || "center"}
          renderHeader={
            item.rendeHeadContent
              ? () =>
                  h(
                    "div",
                    {},
                    h(
                      ElTooltip,
                      {
                        class: "item",
                        placement: "top",
                        content: `${item.rendeHeadContent}`
                      },
                      `${item.label}`
                    )
                  )
              : null
          }
        >
          {{
            default: (scope: soltType) => {
              return (
                slots[solt] &&
                slots[solt]({
                  index: scope.$index,
                  column: scope.column,
                  row: scope.row
                } as unknown as soltType)
              );
            }
          }}
        </ElTableColumn>
      );
    };
    const renderColumn = (item: ElTableColumnType, index: number | string) => {
      return (
        <ElTableColumn
          key={index}
          prop={item.prop}
          label={item.label}
          width={item.width}
          min-width={item.minWidth}
          fixed={item.fixedColumn}
          sortable={item.sortTable}
          show-overflow-tooltip={item.overflow}
          header-align={item.headerAlign || "center"}
          align={item.align || "center"}
          renderHeader={
            item.rendeHeadContent
              ? () =>
                  h(
                    "div",
                    {},
                    h(
                      ElTooltip,
                      {
                        class: "item",
                        placement: "top",
                        content: `${item.rendeHeadContent}`
                      },
                      `${item.label}`
                    )
                  )
              : null
          }
        >
          {renderTableClumns(item)}
        </ElTableColumn>
      );
    };
    const renderTableClumns = (item: ElTableColumnType) => {
      if (!item.children) return;
      return item.children.map(
        (item: ElTableColumnType, index: number | string) => {
          return <ElTableColumns key={index} col={[item]} />;
        }
      );
    };
    return () => {
      return (
        <ElTable
          header-cell-style={prop.headerCellStyle}
          data={prop.tableData}
          stripe={getTableConfig.value.stripe}
          style={{ width: "100%" }}
          border={getTableConfig.value.border}
          height={getTableConfig.value.fixedHeader}
          max-height={getTableConfig.value.fluidHeight}
          default-sort={prop.tableSort}
          sort-change={sortChange}
          select={selectChange}
          select-all={selectAllChange}
          selection-change={selectionChange}
        >
          {renderTableSelection()}
          {renderElColumn()}
        </ElTable>
      );
    };
  }
});
