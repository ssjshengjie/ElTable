export interface ElTableColumnType {
  rendeHeadContent?: string;
  fixedColumn?: string | boolean;
  sortTable?: string | boolean;
  minWidth?: string;
  prop?: string;
  label: string;
  solt?: boolean;
  slotName?: string;
  width?: string;
  children?: Array<ElTableColumnType>;
  overflow?: boolean;
  align?: "center" | "left" | "right";
  headerAlign?: "center" | "left" | "right";
}
export interface soltType {
  $index: number | string;
  column: Object | Array<any>;
  row: Object | Array<any>;
}
export interface tableSortType {
  prop: string;
  order: "ascending" | "descending";
}
export interface tableSelectionType {
  show: boolean;
  width?: "";
}
export interface tableConfigType {
  stripe?: boolean;
  border?: boolean;
  fixedHeader?: undefined | string | number;
  fluidHeight?: undefined | string | number;
}
