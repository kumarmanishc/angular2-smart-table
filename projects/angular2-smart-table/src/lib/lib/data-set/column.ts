import {ColumnFilterFunction, ColumnValuePrepareFunction, IColumn, IColumnType, ISortDirection} from '../settings';
import {DataSet} from './data-set';

export class Column implements IColumn {

  placeholder?: string;
  title: string = '';
  hide: boolean = false;
  type?: IColumnType = IColumnType.Text;
  class?: string = '';
  width?: string = '';
  isSortable?: boolean = true;
  isEditable?: boolean = true;
  isAddable?: boolean = true;
  isFilterable?: boolean = false;
  sortDirection: ISortDirection = 'asc';
  defaultSortDirection?: ISortDirection = undefined;
  editor?: { type: string, config: any, component: any } = {type: '', config: {}, component: null};
  filter?: { type: string, config: any, component: any } = {type: '', config: {}, component: null};
  renderComponent?: any = null;
  compareFunction?: Function;
  valuePrepareFunction?: ColumnValuePrepareFunction;
  filterFunction?: ColumnFilterFunction;
  onComponentInitFunction?: Function;

  constructor(public id: string, protected settings: any, protected dataSet: DataSet) {
    this.process();
  }

  getOnComponentInitFunction(): Function | undefined {
    return this.onComponentInitFunction;
  }

  getCompareFunction(): Function | undefined {
    return this.compareFunction;
  }

  getValuePrepareFunction(): Function | undefined {
    return this.valuePrepareFunction;
  }

  getFilterFunction(): Function | undefined {
    return this.filterFunction;
  }

  getConfig(): any {
    return this.editor && this.editor.config;
  }

  getFilterType(): any {
    return this.filter && this.filter.type;
  }

  getFilterConfig(): any {
    return this.filter && this.filter.config;
  }

  /**
   * Retrieves a setting by name.
   *
   * @param key the current key name
   * @param compatKeys key names for backwards compatibility
   * @private
   */
  private lookupSetting<T>(key: string, compatKeys: string[] = []): T | undefined {
    if (typeof this.settings[key] === undefined) {
      for (const k of compatKeys) {
        if (typeof this.settings[k] !== undefined) {
          return this.settings[k];
        }
      }
      return undefined;
    } else {
      return this.settings[key] as T;
    }
  }

  protected process() {
    // the pattern is "X = lookup(key) ?? X" - this keeps the default value in case the setting is undefined

    this.placeholder = this.lookupSetting('placeholder');
    this.title = this.lookupSetting('title') ?? this.title;
    this.class = this.lookupSetting('class') ?? this.class;
    this.width = this.lookupSetting('width') ?? this.width;
    this.hide = this.lookupSetting('hide') ?? this.hide;
    this.type = this.lookupSetting('type') ?? this.determineType();
    this.editor = this.lookupSetting('editor') ?? this.editor;
    this.filter = this.lookupSetting('filter') ?? this.filter;
    this.renderComponent = this.lookupSetting('renderComponent') ?? this.renderComponent;

    this.isFilterable = this.filter !== undefined && !!this.filter;
    this.isSortable = this.lookupSetting('isSortable', ['sort']) ?? this.isSortable;
    this.isEditable = this.lookupSetting('isEditable', ['editable']) ?? this.isEditable;
    this.isAddable = this.lookupSetting('isAddable') ?? this.isAddable;
    this.defaultSortDirection = this.lookupSetting('sortDirection') ?? this.defaultSortDirection;
    this.sortDirection = this.defaultSortDirection ?? this.sortDirection;

    this.compareFunction = this.lookupSetting('compareFunction');
    this.valuePrepareFunction = this.lookupSetting('valuePrepareFunction');
    this.filterFunction = this.lookupSetting('filterFunction');
    this.onComponentInitFunction = this.lookupSetting('onComponentInitFunction');
  }

  determineType(): IColumnType {
    // TODO: determine type by data
    return IColumnType.Text;
  }
}
