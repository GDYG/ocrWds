import { configure } from 'mobx';

// 修改store必须使用action
configure({
  enforceActions: 'always'
});

import OcrStore from './ocrStore'

class Store {
    ocrStore: OcrStore
    constructor() {
        this.ocrStore = new OcrStore(this)
    }
}

export default new Store()