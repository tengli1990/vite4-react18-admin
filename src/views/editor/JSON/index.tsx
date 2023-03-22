import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import styles from './index.module.less'

import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import "jsoneditor/dist/jsoneditor.min.css"

const JSONPage: React.FC = () => {

  const [initialJson] = useState({
    "Array": [1, 2, 3],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": { "a": "b", "c": "d" },
    "String": "Hello World"
  })


  useEffect(() => {
    const container: HTMLElement = document.getElementById('jsoneditor') || document.createElement('div');
    const options: JSONEditorOptions = {
      mode:'code',
      name:'json 格式化',
      search: false,
      sortObjectKeys: false,
      escapeUnicode: false,
      limitDragging: false,
      enableSort: false,
      enableTransform: false,
      allowSchemaSuggestions: false,
      colorPicker: true,
      modes: ['text', 'code']
    }

    let editor = new JSONEditor(container, options)
    editor?.set(initialJson)

    return () => {
      editor.destroy()
    }
  }, [])

  return <>
    <PageHeader title="JSON编辑器" />
    <div className={styles['json-editor']}>
      <div id="jsoneditor" style={{ width: '100%', height: 'calc(100vh - 204px)' }}></div>
    </div>
  </>
}


export default JSONPage;