export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  body: null
  type: string
  url: string
}

export interface PostData {
  body: string
  type: string
  url: string
}

export interface tableSorter {
  sortName: string
  sortOrder: string
}

export interface tablePage {
  pageNo: number
}

export interface tablePageSize {
  pageSize: number
}

export interface Pagination {
  current: number | string
  pageSize: number | string
  total?: number | string
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}
