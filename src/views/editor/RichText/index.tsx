import React, { useRef } from 'react';
import { Button } from 'antd'
import PageHeader from '@/components/PageHeader';
import { Editor } from '@tinymce/tinymce-react'

import styles from './index.module.less'

import { localBaseUrl } from '@/config/env'
const RichText = () => {
  
  const editorRef: any  = useRef();
  const options = {
    language: 'zh_CN',
    height: 500,
    menubar: false,
    branding: false,
    plugins: [
      'advlist', ' autolink ', 'lists ', 'link ', 'image ', 'charmap ', ' preview ', 'anchor',
      'searchreplace', ' visualblocks ', 'code ', 'fullscreen', 'image', 'save',
      'insertdatetime', ' media ', 'table ', 'preview ', 'code', ' help', ' wordcount'
    ],
    // fullscreen_native: true,
    toolbar: 'code | undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter | ' +
      'alignright alignjustify | bullist numlist outdent indent | image media table | ' +
      'removeformat | fullscreen | preview',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  }
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
      alert(editorRef.current.getContent())
    }
  };
  return <>
    <PageHeader title="Rich Text" />
    <Editor
      onInit={(evt, editor) => editorRef.current = editor}
      tinymceScriptSrc={localBaseUrl + 'tinymce/tinymce.min.js'}
      initialValue="<p>This is the initial content of the editor.</p>"
      init={options}
    />

    <div className={styles['rich-button']}>
      <Button type="primary" onClick={log}>查看内容</Button>
    </div>
  </>
}

export default RichText