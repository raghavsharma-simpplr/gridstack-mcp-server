// GridStack Types - Based on the official API documentation

export interface GridStackOptions {
  acceptWidgets?: boolean | string | ((element: Element) => boolean);
  alwaysShowResizeHandle?: boolean;
  animate?: boolean;
  auto?: boolean;
  cellHeight?: number | string;
  cellHeightThrottle?: number;
  cellHeightUnit?: string;
  children?: GridStackWidget[];
  class?: string;
  column?: number | "auto";
  columnOpts?: Responsive;
  disableDrag?: boolean;
  disableResize?: boolean;
  draggable?: DDDragOpt;
  engineClass?: any;
  float?: boolean;
  handle?: string;
  handleClass?: string;
  itemClass?: string;
  layout?: ColumnOptions;
  lazyLoad?: boolean;
  margin?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  marginUnit?: string;
  maxRow?: number;
  minRow?: number;
  nonce?: string;
  oneColumnModeDomSort?: boolean;
  placeholderClass?: string;
  placeholderText?: string;
  removable?: boolean | string;
  removeTimeout?: number;
  resizable?: DDResizableOpt;
  rtl?: boolean;
  staticGrid?: boolean;
  styleInHead?: boolean;
  subGrid?: GridStackOptions;
  subGridDynamic?: boolean;
  subGridOpts?: GridStackOptions;
}

export interface GridStackWidget {
  id?: string | number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  locked?: boolean;
  noResize?: boolean;
  noMove?: boolean;
  autoPosition?: boolean;
  resizeToContent?: boolean;
  content?: string;
  el?: HTMLElement;
  subGrid?: GridStackOptions;
  subGridOpts?: GridStackOptions;
}

export interface GridStackNode extends GridStackWidget {
  _id?: string | number;
  _dirty?: boolean;
  _moving?: boolean;
  _resizing?: boolean;
  _temporaryRemoved?: boolean;
  _origPos?: GridStackPosition;
  _lastTriedX?: number;
  _lastTriedY?: number;
  _lastTriedW?: number;
  _lastTriedH?: number;
  _prevYPix?: number;
  _skipDown?: boolean;
  _packY?: number;
  _removeDOM?: boolean;
}

export interface GridStackPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Responsive {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  breakpoints?: Breakpoint[];
}

export interface Breakpoint {
  w: number;
  c: number;
}

export interface DDDragOpt {
  handle?: string;
  appendTo?: string | HTMLElement;
  containment?: string | HTMLElement;
  cursor?: string;
  cursorAt?: { top?: number; left?: number };
  distance?: number;
  helper?: string | ((event: Event) => HTMLElement);
  opacity?: number;
  revert?: boolean | string;
  revertDuration?: number;
  scroll?: boolean;
  scrollParent?: HTMLElement;
  scrollSensitivity?: number;
  scrollSpeed?: number;
  snap?: boolean | string;
  snapMode?: string;
  snapTolerance?: number;
  start?: (event: Event, ui: any) => void;
  drag?: (event: Event, ui: any) => void;
  stop?: (event: Event, ui: any) => void;
}

export interface DDResizableOpt {
  autoHide?: boolean;
  handles?: string;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  start?: (event: Event, ui: any) => void;
  resize?: (event: Event, ui: any) => void;
  stop?: (event: Event, ui: any) => void;
}

export type ColumnOptions = "moveScale" | "move" | "scale" | "none" | "list";

export interface GridStackEvent {
  type: string;
  target: GridStackNode;
}

// Framework integration types
export interface ReactGridStackProps extends GridStackOptions {
  className?: string;
  style?: React.CSSProperties;
  onAdded?: (event: GridStackEvent) => void;
  onChange?: (event: GridStackEvent) => void;
  onDisable?: (event: GridStackEvent) => void;
  onDrag?: (event: GridStackEvent) => void;
  onDragStart?: (event: GridStackEvent) => void;
  onDragStop?: (event: GridStackEvent) => void;
  onDropped?: (event: GridStackEvent) => void;
  onEnable?: (event: GridStackEvent) => void;
  onRemoved?: (event: GridStackEvent) => void;
  onResize?: (event: GridStackEvent) => void;
  onResizeStart?: (event: GridStackEvent) => void;
  onResizeStop?: (event: GridStackEvent) => void;
}

export interface VueGridStackProps extends GridStackOptions {
  class?: string;
  style?: any;
}

// Tool parameter types
export interface InitGridParams {
  selector?: string;
  options?: GridStackOptions;
}

export interface AddWidgetParams {
  widget: GridStackWidget;
  triggerAddEvent?: boolean;
}

export interface RemoveWidgetParams {
  el: string | HTMLElement;
  removeDOM?: boolean;
  triggerEvent?: boolean;
}

export interface UpdateWidgetParams {
  el: string | HTMLElement;
  opts: Partial<GridStackWidget>;
}

export interface MoveWidgetParams {
  el: string | HTMLElement;
  x?: number;
  y?: number;
}

export interface ResizeWidgetParams {
  el: string | HTMLElement;
  width?: number;
  height?: number;
}

export interface SaveGridParams {
  saveContent?: boolean;
  saveGridOpt?: boolean;
}

export interface LoadGridParams {
  layout: GridStackWidget[] | string;
  addAndRemove?: boolean;
}

export interface BatchUpdateParams {
  flag?: boolean;
}

export interface CompactParams {
  layout?: ColumnOptions;
  doSort?: boolean;
}

export interface FloatParams {
  val?: boolean;
}

export interface ColumnParams {
  column: number | "auto";
  layout?: ColumnOptions;
}

export interface CellHeightParams {
  val?: number | string;
  update?: boolean;
}

export interface MarginParams {
  value: number | string;
  unit?: string;
}

export interface ResponsiveParams {
  breakpoints: Breakpoint[];
}

export interface EnableParams {
  doEnable?: boolean;
}

export interface DestroyParams {
  removeDOM?: boolean;
}

export interface GetGridItemsParams {
  onlyVisible?: boolean;
}
