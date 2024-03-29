import { saveAs } from 'file-saver'
import { Workbook } from 'exceljs'
import dayjs from 'dayjs'
import { TableColumnData, TableData } from '@arco-design/web-vue/es/table/interface.d'

/**
 * 延时执行
 * @param  {Number}   ms    等待时间
 */
export const sleep = (ms = 500) => {
  if (typeof ms !== 'number') {
    throw new Error('param must be a number')
  }
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * 四舍五入
 * @param  {Number}   value   原始值
 * @param  {Number}   bit     保留位数
 */
export const toFixed = (value: any, bit = 0) => {
  const times = 10 ** bit
  let result = value * times + 0.5
  result = parseInt(String(result), 10) / times
  return result
}

/**
 * 导出表格数据
 * @param  {Array}      columns      导出的列
 * @param  {Array}      data         导出的数据
 * @param  {String}     fileName     文件名字
 */
export const exportExcel = async (columns: any[], data: TableData[], fileName: string) => {
  const filterFields = ['operation']
  // 过滤掉不需要导出的列
  const exportColumns = columns.filter((item: TableColumnData) => {
    // @ts-ignore
    return !filterFields.includes(item.dataIndex)
  })
  // 表格的宽度
  const tableWidth = exportColumns.length * 20
  const headers = exportColumns.map((item: TableColumnData) => {
    // @ts-ignore
    const width = (parseInt(item.width, 10) / 100) * tableWidth
    return {
      header: item.title,
      key: item.dataIndex,
      width,
    }
  })
  // 创建工作簿
  const workbook = new Workbook()
  // 添加sheet
  const worksheet = workbook.addWorksheet('Sheet1')
  // 设置列
  // @ts-ignore
  worksheet.columns = headers
  // 给表头添加背景色
  const headerRow = worksheet.getRow(1)
  // headerRow.fill = {
  //   type: 'pattern',
  //   pattern: 'solid',
  //   fgColor: { argb: 'dff8ff' },
  // }
  // 精准设置表头样式
  headerRow.eachCell((cell, colNum) => {
    // 设置背景色
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'f2f3f5' },
    }
    // 设置字体
    cell.font = {
      // bold: true,
      size: 12,
      name: '微软雅黑',
      color: { argb: '1d2129' },
    }
  })
  // 添加行
  worksheet.addRows(data)
  // 导出excel
  const blobData = await workbook.xlsx.writeBuffer()
  const blob = new Blob([blobData], {
    type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `${fileName || dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}.xlsx`)
}
