import type { BasicColumn, BasicTableProps, CellFormat, GetColumnsParams } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import type { ComputedRef } from 'vue';

import { unref, Ref, computed, watch, ref, toRaw } from 'vue';
import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { Recordable } from '@/types/config';

const DEFAULT_ALIGN = 'center';
const PAGE_SIZE = 10;
const INDEX_COLUMN_FLAG = 'INDEX';
const ACTION_COLUMN_FLAG = 'ACTION';

function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { key, dataIndex } = item;
  item.align = item.align || DEFAULT_ALIGN;
  if (ellipsis) {
    if (!key) {
      item.key = dataIndex;
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis,
      });
    }
  }
}

function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  columns: BasicColumn[]
) {
  const { showIndexColumn, indexColumnProps } = unref(propsRef);

  let pushIndexColumns = false;
  columns.forEach(() => {
    const indIndex = columns.findIndex((column) => column.flag === INDEX_COLUMN_FLAG);
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1;
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1);
    }
  });

  if (!pushIndexColumns) return;

  const isFixedLeft = columns.some((item) => item.fixed === 'left');

  columns.unshift({
    flag: INDEX_COLUMN_FLAG,
    width: 50,
    title: '',
    align: 'center',
    customRender: ({ index }) => {
      const getPagination = unref(getPaginationRef);
      if (isBoolean(getPagination)) {
        return `${index + 1}`;
      }
      const { current = 1, rowsPerPage = PAGE_SIZE } = getPagination;
      return ((current < 1 ? 1 : current) - 1) * rowsPerPage + index + 1;
    },
    ...(isFixedLeft
      ? {
          fixed: 'left',
        }
      : {}),
    ...indexColumnProps,
  });
}

function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
  const { actionColumn } = unref(propsRef);
  if (!actionColumn) return;

  const hasIndex = columns.findIndex((column) => column.flag === ACTION_COLUMN_FLAG);
  if (hasIndex === -1) {
    columns.push({
      ...columns[hasIndex],
      fixed: 'right',
      ...actionColumn,
      flag: ACTION_COLUMN_FLAG,
    });
  }
}

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>
) {
  const columnsRef = (ref(unref(propsRef).columns) as unknown) as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = unref(columnsRef);

    handleIndexColumn(propsRef, getPaginationRef, columns);
    handleActionColumn(propsRef, columns);
    if (!columns) {
      return [];
    }
    const { ellipsis } = unref(propsRef);

    const cloneColumns = cloneDeep(columns);
    cloneColumns.forEach((item) => {
      const { customRender, slots } = item;

      handleItem(
        item,
        Reflect.has(item, 'ellipsis') ? !!item.ellipsis : !!ellipsis && !customRender && !slots
      );
    });
    return cloneColumns;
  });

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const columns = cloneDeep(viewColumns);
    columns.forEach((column) => {
      const { slots, dataIndex, customRender, format, edit, flag } = column;

      if (!slots || !slots?.title) {
        column.slots = { title: `header-${dataIndex}`, ...(slots || {}) };
        column.customTitle = column.title;
        Reflect.deleteProperty(column, 'title');
      }
      const isDefaultAction = [INDEX_COLUMN_FLAG, ACTION_COLUMN_FLAG].includes(flag!);
      if (!customRender && format && !edit && !isDefaultAction) {
        column.customRender = ({ text, record, index }) => {
          return formatCell(text, format, record, index);
        };
      }
    });
    return columns;
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns?.filter((item) => !item.flag) ?? [];
    }
  );
  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: Partial<BasicColumn>[] | string[]) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];

    const cacheKeys = cacheColumns.map((item) => item.dataIndex);

    if (!isString(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = columns as string[];
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        if (columnKeys.includes(item.dataIndex! || (item.key as string))) {
          newColumns.push({
            ...item,
            defaultHidden: false,
          });
        }
      });

      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(prev.dataIndex as string) -
            columnKeys.indexOf(next.dataIndex as string)
          );
        });
      }
      columnsRef.value = newColumns;
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG);
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG);
    }

    if (sort) {
      columns = sortFixedColumn(columns);
    }

    return columns;
  }

  return {
    getColumnsRef,
    getColumns,
    setColumns,
    getViewColumns,
  };
}

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = [];
  const fixedRightColumns: BasicColumn[] = [];
  const defColumns: BasicColumn[] = [];
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
      continue;
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column);
      continue;
    }
    defColumns.push(column);
  }
  const resultColumns = [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.defaultHidden
  );

  return resultColumns;
}

// format cell
export function formatCell(text: string, format: CellFormat, record: Recordable, index: number) {
  if (!format) {
    return text;
  }

  // custom function
  if (isFunction(format)) {
    return format(text, record, index);
  }

  try {
    // date type
    const DATE_FORMAT_PREFIX = 'date|';
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX)) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, '');

      if (!dateFormat) {
        return text;
      }
      return moment(text).format(dateFormat);
    }

    // enum
    if (isObject(format) && Reflect.has(format, 'size')) {
      return format.get(text);
    }
  } catch (error) {
    return text;
  }
}
