import { ElTableColumn } from "element-plus";
import { defineComponent } from "vue";
const props = {
  col: {
    type: Array as any,
    default: () => []
  },
  index: {
    type: Number
  }
};
export default defineComponent({
  name: "ElTableColumns",
  props,
  setup(prop) {
    const renderColumn = (item, key) => {
      return (
        <ElTableColumn
          key={key}
          prop={item[0].prop}
          label={item[0].label}
          width={item[0].width}
          min-width={item[0].minWidth}
        >
          {item[0].children
            ? item[0].children.map((items, index) =>
                renderColumn([items], `${index} + key`)
              )
            : null}
        </ElTableColumn>
      );
    };

    return () => {
      return renderColumn(prop.col, prop.index);
    };
  }
});
